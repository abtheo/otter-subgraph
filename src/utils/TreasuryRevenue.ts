import { toDecimal } from './Decimals'
import { Address, BigDecimal, BigInt, log } from '@graphprotocol/graph-ts'
import { hourFromTimestamp } from './Dates'
import { TreasuryRevenue, Transaction, Harvest } from '../../generated/schema'
import { getQiUsdRate } from './Price'

export function loadOrCreateTreasuryRevenue(timestamp: BigInt): TreasuryRevenue {
  //TODO: Still round?
  let hourTimestamp = hourFromTimestamp(timestamp)

  let treasuryRevenue = TreasuryRevenue.load(hourTimestamp)
  if (treasuryRevenue == null) {
    treasuryRevenue = new TreasuryRevenue(hourTimestamp)
    treasuryRevenue.timestamp = timestamp
    treasuryRevenue.qiLockerHarvestAmount = BigInt.fromString('0')
    treasuryRevenue.qiLockerHarvestMarketValue = BigDecimal.fromString('0')

    treasuryRevenue.save()
  }
  return treasuryRevenue as TreasuryRevenue
}

export function updateTreasuryRevenue(harvest: Harvest): void {
  let treasuryRevenue = loadOrCreateTreasuryRevenue(harvest.timestamp)

  treasuryRevenue.qiLockerHarvestAmount = harvest.amount
  treasuryRevenue.qiLockerHarvestMarketValue = getQiMarketValue(toDecimal(harvest.amount, 18))

  treasuryRevenue.save()
}

export function getQiMarketValue(balance: BigDecimal): BigDecimal {
  let usdPerQi = getQiUsdRate()
  log.debug('1 Qi = {} USD', [usdPerQi.toString()])

  let marketValue = balance.times(usdPerQi)
  log.debug('qi marketValue = {}', [marketValue.toString()])
  return marketValue
}
