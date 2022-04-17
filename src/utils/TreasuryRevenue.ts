import { toDecimal } from './Decimals'
import { Address, BigDecimal, BigInt, log } from '@graphprotocol/graph-ts'
import { hourFromTimestamp } from './Dates'
import { TreasuryRevenue, Transaction, Harvest, Transfer, Buyback } from '../../generated/schema'
import { getQiMarketValue } from './ProtocolMetrics'
import {
  QI_ERC20_CONTRACT,
  DAI_ERC20_CONTRACT,
  MAI_ERC20_CONTRACT,
  FRAX_ERC20_CONTRACT,
  MATIC_ERC20_CONTRACT,
} from './Constants'
import { getwMaticUsdRate } from './Price'

export function loadOrCreateTreasuryRevenue(timestamp: BigInt): TreasuryRevenue {
  let ts = (timestamp.toI32() - 0).toString()

  let treasuryRevenue = TreasuryRevenue.load(ts)
  if (treasuryRevenue == null) {
    treasuryRevenue = new TreasuryRevenue(ts)
    treasuryRevenue.timestamp = timestamp
    treasuryRevenue.qiLockerHarvestAmount = BigInt.fromString('0')
    treasuryRevenue.qiLockerHarvestMarketValue = BigDecimal.fromString('0')
    treasuryRevenue.qiDaoInvestmentHarvestAmount = BigInt.fromString('0')
    treasuryRevenue.qiDaoInvestmentHarvestMarketValue = BigDecimal.fromString('0')
    treasuryRevenue.buybackClamAmount = BigInt.fromString('0')
    treasuryRevenue.buybackMarketValue = BigDecimal.fromString('0')

    treasuryRevenue.save()
  }
  return treasuryRevenue as TreasuryRevenue
}

export function updateTreasuryRevenueHarvest(harvest: Harvest): void {
  log.debug('HarvestEvent, txid: {}', [harvest.id.toString()])
  let treasuryRevenue = loadOrCreateTreasuryRevenue(harvest.timestamp)

  treasuryRevenue.qiLockerHarvestAmount = harvest.amount
  treasuryRevenue.qiLockerHarvestMarketValue = getQiMarketValue(toDecimal(harvest.amount, 18))

  treasuryRevenue.save()
}
export function updateTreasuryRevenueTransfer(transfer: Transfer): void {
  log.debug('TransferEvent, txid: {}', [transfer.id.toString()])
  let treasuryRevenue = loadOrCreateTreasuryRevenue(transfer.timestamp)

  treasuryRevenue.qiDaoInvestmentHarvestAmount = transfer.value
  treasuryRevenue.qiDaoInvestmentHarvestMarketValue = getQiMarketValue(toDecimal(transfer.value, 18))

  treasuryRevenue.save()
}
export function updateTreasuryRevenueBuyback(buyback: Buyback): void {
  log.debug('BuybackEvent, txid: {}', [buyback.id.toString()])
  let treasuryRevenue = loadOrCreateTreasuryRevenue(buyback.timestamp)

  log.debug('BuybackToken, txid: {}', [buyback.token.toString()])
  treasuryRevenue.buybackClamAmount = buyback.clamAmount
  if (buyback.token == Address.fromString(QI_ERC20_CONTRACT)) {
    treasuryRevenue.buybackMarketValue = getQiMarketValue(toDecimal(buyback.tokenAmount, 18))
    log.debug('BuybackEvent using Qi, txid: {}', [buyback.id.toString()])
  }
  if (buyback.token == Address.fromString(MATIC_ERC20_CONTRACT)) {
    treasuryRevenue.buybackMarketValue = getwMATICMarketValue(toDecimal(buyback.tokenAmount, 18))
    log.debug('BuybackEvent using Qi, txid: {}', [buyback.id.toString()])
  }
  //stablecoins (18 decimals)
  if (
    buyback.token == Address.fromString(DAI_ERC20_CONTRACT) ||
    buyback.token == Address.fromString(FRAX_ERC20_CONTRACT) ||
    buyback.token == Address.fromString(MAI_ERC20_CONTRACT)
  ) {
    treasuryRevenue.buybackMarketValue = toDecimal(buyback.tokenAmount, 18)
    log.debug('BuybackEvent using Stablecoins, txid: {}', [buyback.id.toString()])
  }

  treasuryRevenue.save()
}

export function getwMATICMarketValue(balance: BigDecimal): BigDecimal {
  let usdPerwMATIC = getwMaticUsdRate()
  log.debug('1 wMATIC = {} USD', [usdPerwMATIC.toString()])

  let marketValue = balance.times(usdPerwMATIC)
  log.debug('wMATIC marketValue = {}', [marketValue.toString()])
  return marketValue
}
