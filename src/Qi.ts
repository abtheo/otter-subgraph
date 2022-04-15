import { Transfer as TransferEvent } from '../generated/Qi/Qi'
import { Address, BigDecimal, BigInt, log } from '@graphprotocol/graph-ts'

import { Transfer } from '../generated/schema'

import { loadOrCreateTransaction } from './utils/Transactions'

import { TREASURY_ADDRESS, UNI_MAI_USDC_QI_INVESTMENT_PAIR } from './utils/Constants'

/*
Handles the 'Harvest' transaction event from the OtterQiDaoInvestment contract.
Unfortunately, the 'Harvest' event itself only takes a pid as input and returns no outputs.
Therefore it cannot be used for tracking revenue.
So instead we have to track all Qi transfers, 
then filter out the specific transactions from the OtterQiDaoInvestment contract -> OtterTreasury
*/
export function handleQiDaoInvestmentHarvestTransfer(event: TransferEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  if (
    event.params.from == Address.fromString(UNI_MAI_USDC_QI_INVESTMENT_PAIR) &&
    event.params.to == Address.fromString(TREASURY_ADDRESS)
  ) {
    let entity = new Transfer(transaction.id)
    entity.transaction = transaction.id
    entity.timestamp = transaction.timestamp
    entity.value = transaction.value
    //Pass event to TreasuryRevenue

    entity.save()
  }
}
