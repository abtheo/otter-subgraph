import { Buyback as DeprecatedBuybackEvent } from '../generated/DeprecatedOtterBuybacker/DeprecatedOtterBuybacker'
import { Buyback as BuybackEvent } from '../generated/OtterBuybacker/OtterBuybacker'
import { Buyback, DeprecatedBuyback } from '../generated/schema'
import { updateTreasuryRevenueBuyback, updateTreasuryRevenueDeprecatedBuyback } from './utils/TreasuryRevenue'

import { loadOrCreateTransaction } from './utils/Transactions'

export function handleDeprecatedBuyback(event: DeprecatedBuybackEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  let entity = new DeprecatedBuyback(transaction.id)
  entity.token = event.params.token
  entity.tokenAmount = event.params.tokenAmount
  entity.clamAmount = event.params.clamAmount
  entity.timestamp = transaction.timestamp
  entity.transaction = transaction.id
  updateTreasuryRevenueDeprecatedBuyback(entity)
  entity.save()
}

export function handleBuyback(event: BuybackEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  let entity = new Buyback(transaction.id)
  entity.path.push(event.params.token)
  entity.timestamp = transaction.timestamp
  entity.transaction = transaction.id
  updateTreasuryRevenueBuyback(entity)
  entity.save()
}
