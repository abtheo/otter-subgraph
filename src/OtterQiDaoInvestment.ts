// import {
//   Harvest as HarvestEvent,
//   HarvestStaking as HarvestStakingEvent,
// } from '../generated/OtterQiLocker/OtterQiLocker'

// import { Harvest } from '../generated/schema'

// import { loadOrCreateTransaction } from './utils/Transactions'

// export function handleHarvest(event: HarvestEvent): void {
//   let transaction = loadOrCreateTransaction(event.transaction, event.block)
//   let entity = new Harvest(transaction.id)
//   entity.transaction = transaction.id
//   entity.timestamp = transaction.timestamp
//   entity.amount = event.params.amount
//   entity.save()
// }
