import { Buyback as BuybackEvent } from '../generated/OtterTreasury/OtterBuybacker'
import { Buyback } from '../generated/schema'

import { loadOrCreateTransaction } from './utils/Transactions'

export function handleBuyback(event: BuybackEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  let entity = new Buyback(transaction.id)
  entity.token = event.params.token
  entity.tokenAmount = event.params.tokenAmount
  entity.clamAccount = event.params.clamAmount
  entity.timestamp = transaction.timestamp
  entity.transaction = transaction.id
  entity.save()

  //TODO: updateProtocolMetrics with Buyback amount ??
}
