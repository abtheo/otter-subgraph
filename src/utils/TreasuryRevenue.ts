import { toDecimal } from './Decimals'
import { Address, BigDecimal, BigInt, log } from '@graphprotocol/graph-ts'
import { hourFromTimestamp } from './Dates'
import { TreasuryRevenue, Transaction } from '../../generated/schema'

export function loadOrCreateTreasuryRevenue(timestamp: BigInt): TreasuryRevenue {
  //TODO: Still round?
  let hourTimestamp = hourFromTimestamp(timestamp)

  let treasuryRevenue = TreasuryRevenue.load(hourTimestamp)
  if (treasuryRevenue == null) {
    treasuryRevenue = new TreasuryRevenue(hourTimestamp)
    treasuryRevenue.timestamp = timestamp
    treasuryRevenue.qiLockerHarvestAmount = BigDecimal.fromString('0')

    treasuryRevenue.save()
  }
  return treasuryRevenue as TreasuryRevenue
}

export function updateTreasuryRevenue(transaction: Transaction): void {
  let tr = loadOrCreateTreasuryRevenue(transaction.timestamp)

  // tr.qiLockerHarvestAmount =
}
