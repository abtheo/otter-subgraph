import { toDecimal } from './Decimals'
import { Address, BigDecimal, BigInt, log } from '@graphprotocol/graph-ts'
import { dayFromTimestamp } from './Dates'
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
  let ts = dayFromTimestamp(timestamp)

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
  log.debug('HarvestEvent, txid: {}', [harvest.id])
  let treasuryRevenue = loadOrCreateTreasuryRevenue(harvest.timestamp)
  //Aggregate over day with +=
  treasuryRevenue.qiLockerHarvestAmount = treasuryRevenue.qiLockerHarvestAmount.plus(harvest.amount)
  treasuryRevenue.qiLockerHarvestMarketValue = treasuryRevenue.qiLockerHarvestMarketValue.plus(
    getQiMarketValue(toDecimal(harvest.amount, 18)),
  )

  treasuryRevenue.save()
}
export function updateTreasuryRevenueTransfer(transfer: Transfer): void {
  log.debug('TransferEvent, txid: {}', [transfer.id])
  let treasuryRevenue = loadOrCreateTreasuryRevenue(transfer.timestamp)

  treasuryRevenue.qiDaoInvestmentHarvestAmount = treasuryRevenue.qiDaoInvestmentHarvestAmount.plus(transfer.value)
  treasuryRevenue.qiDaoInvestmentHarvestMarketValue = treasuryRevenue.qiDaoInvestmentHarvestMarketValue.plus(
    getQiMarketValue(toDecimal(transfer.value, 18)),
  )

  treasuryRevenue.save()
}

export function updateTreasuryRevenueBuyback(buyback: Buyback): void {
  log.debug('DeprecatedBuybackEvent, txid: {}, token: ', [buyback.id, buyback.token.toHexString()])
  let treasuryRevenue = loadOrCreateTreasuryRevenue(buyback.timestamp)

  treasuryRevenue.buybackClamAmount = treasuryRevenue.buybackClamAmount.plus(buyback.clamAmount)
  if (buyback.token.toHexString().toLowerCase() == QI_ERC20_CONTRACT.toLowerCase()) {
    treasuryRevenue.buybackMarketValue = treasuryRevenue.buybackMarketValue.plus(
      getQiMarketValue(toDecimal(buyback.tokenAmount, 18)),
    )
    log.debug('BuybackEvent using Qi, txid: {}', [buyback.id])
  }
  if (buyback.token.toHexString().toLowerCase() == MATIC_ERC20_CONTRACT.toLowerCase()) {
    treasuryRevenue.buybackMarketValue = treasuryRevenue.buybackMarketValue.plus(
      getwMATICMarketValue(toDecimal(buyback.tokenAmount, 18)),
    )
    log.debug('BuybackEvent using Qi, txid: {}', [buyback.id])
  }
  //stablecoins (18 decimals)
  if (
    buyback.token.toHexString().toLowerCase() == DAI_ERC20_CONTRACT.toLowerCase() ||
    buyback.token.toHexString().toLowerCase() == FRAX_ERC20_CONTRACT.toLowerCase() ||
    buyback.token.toHexString().toLowerCase() == MAI_ERC20_CONTRACT.toLowerCase()
  ) {
    treasuryRevenue.buybackMarketValue = treasuryRevenue.buybackMarketValue.plus(toDecimal(buyback.tokenAmount, 18))
    log.debug('BuybackEvent using Stablecoins, txid: {}', [buyback.id])
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
