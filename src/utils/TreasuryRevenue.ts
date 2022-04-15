import { toDecimal } from './Decimals'
import { Address, BigDecimal, BigInt, log } from '@graphprotocol/graph-ts'
import { dayFromTimestamp } from './Dates'
import { TreasuryRevenue, Transaction, Harvest, Transfer } from '../../generated/schema'
import { getQiMarketValue } from './ProtocolMetrics'

export function loadOrCreateTreasuryRevenue(timestamp: BigInt): TreasuryRevenue {
  let dayTimestamp = dayFromTimestamp(timestamp)

  let treasuryRevenue = TreasuryRevenue.load(dayTimestamp)
  if (treasuryRevenue == null) {
    treasuryRevenue = new TreasuryRevenue(dayTimestamp)
    treasuryRevenue.timestamp = timestamp
    treasuryRevenue.qiLockerHarvestAmount = BigInt.fromString('0')
    treasuryRevenue.qiLockerHarvestMarketValue = BigDecimal.fromString('0')
    treasuryRevenue.qiDaoInvestmentHarvestAmount = BigInt.fromString('0')
    treasuryRevenue.qiDaoInvestmentHarvestMarketValue = BigDecimal.fromString('0')

    treasuryRevenue.save()
  }
  return treasuryRevenue as TreasuryRevenue
}

export function updateTreasuryRevenueHarvest(harvest: Harvest): void {
  let treasuryRevenue = loadOrCreateTreasuryRevenue(harvest.timestamp)

  treasuryRevenue.qiLockerHarvestAmount = harvest.amount
  treasuryRevenue.qiLockerHarvestMarketValue = getQiMarketValue(toDecimal(harvest.amount, 18))

  treasuryRevenue.save()
}
export function updateTreasuryRevenueTransfer(transfer: Transfer): void {
  let treasuryRevenue = loadOrCreateTreasuryRevenue(transfer.timestamp)

  treasuryRevenue.qiDaoInvestmentHarvestAmount = transfer.value
  treasuryRevenue.qiDaoInvestmentHarvestMarketValue = getQiMarketValue(toDecimal(transfer.value, 18))

  treasuryRevenue.save()
}
