import { Transfer as TransferEvent } from '../generated/Qi/Qi'
import { Address, log } from '@graphprotocol/graph-ts'
import { Transfer } from '../generated/schema'
import { loadOrCreateTransaction } from './utils/Transactions'
import { updateTreasuryRevenueTransfer } from './utils/TreasuryRevenue'

import { TREASURY_ADDRESS, UNI_MAI_USDC_QI_INVESTMENT_PAIR, UNI_QI_WMATIC_INVESTMENT_PAIR } from './utils/Constants'

/*
Handles the 'Harvest' transaction event from the OtterQiDaoInvestment contract.
Unfortunately, the 'Harvest' event itself only takes a pid as input and returns no outputs.
Therefore it cannot be used for tracking revenue.
So instead we have to track all Qi transfers, 
then filter out the specific transactions from the OtterQiDaoInvestment contract -> OtterTreasury

ALSO includes revenue from the deprecated contract 0xC3356D852330e947144400d237563288c59F3539 
*/
export function handleQiDaoInvestmentHarvestTransfer(event: TransferEvent): void {
  if (
    (event.params.from.toHexString().toLowerCase() == UNI_MAI_USDC_QI_INVESTMENT_PAIR.toLowerCase() ||
      event.params.from.toHexString().toLowerCase() == UNI_QI_WMATIC_INVESTMENT_PAIR.toLowerCase()) &&
    event.params.to.toHexString().toLowerCase() == TREASURY_ADDRESS.toLowerCase()
  ) {
    log.debug('QiDaoInvestmentHarvestTransfer {}, from: {}, to: {}', [
      event.transaction.hash.toHexString(),
      event.params.from.toHexString(),
      event.params.to.toHexString(),
    ])
    let transaction = loadOrCreateTransaction(event.transaction, event.block)
    let entity = new Transfer(transaction.id)
    entity.transaction = transaction.id
    entity.timestamp = transaction.timestamp
    entity.from = event.params.from
    entity.to = event.params.to
    entity.value = event.params.value

    //Pass entity to TreasuryRevenue
    updateTreasuryRevenueTransfer(entity)
    entity.save()
  }
}
