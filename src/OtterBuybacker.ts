import { Buyback as DeprecatedBuybackEvent } from '../generated/DeprecatedOtterBuybacker/DeprecatedOtterBuybacker'
import { Buyback as BuybackEvent } from '../generated/OtterBuybacker/OtterBuybacker'
import { Buyback } from '../generated/schema'
import { updateTreasuryRevenueBuyback } from './utils/TreasuryRevenue'

import { loadOrCreateTransaction } from './utils/Transactions'

export function handleDeprecatedBuyback(event: DeprecatedBuybackEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  let entity = new Buyback(transaction.id)
  entity.token = event.params.token
  entity.tokenAmount = event.params.tokenAmount
  entity.clamAmount = event.params.clamAmount
  entity.timestamp = transaction.timestamp
  entity.transaction = transaction.id
  updateTreasuryRevenueBuyback(entity)
  entity.save()
}

export function handleBuyback(event: BuybackEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  let entity = new Buyback(transaction.id)
  entity.token = event.params.token
  entity.tokenAmount = event.params.tokenAmount
  entity.clamAmount = event.params.clamAmount
  entity.timestamp = transaction.timestamp
  entity.transaction = transaction.id
  updateTreasuryRevenueBuyback(entity)
  entity.save()
}
