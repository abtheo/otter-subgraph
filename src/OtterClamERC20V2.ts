import { BigDecimal, ethereum } from '@graphprotocol/graph-ts'
import { Transfer as TransferEvent } from '../generated/StakedOtterClamERC20V2/StakedOtterClamERC20V2'
import { Transfer, TotalBurnedClam } from '../generated/schema'
import { log } from '@graphprotocol/graph-ts'
import { loadOrCreateTransaction } from './utils/Transactions'
import { getClamUsdRate } from './utils/Price'

export function handleTransfer(event: TransferEvent): void {
  if (event.params.to.toHexString() == '0x0000000000000000000000000000000000000000') {
    let transaction = loadOrCreateTransaction(event.transaction, event.block)
    let entity = new Transfer(transaction.id)
    entity.from = event.params.from
    entity.to = event.params.to
    entity.value = event.params.value
    entity.timestamp = transaction.timestamp
    entity.transaction = transaction.id
    entity.save()

    let burnedClam = event.params.value.divDecimal(BigDecimal.fromString('1e9'))
    log.debug('Burned CLAM {} at block {}', [burnedClam.toString(), event.block.number.toString()])

    //Cumulative total for burned CLAM
    let total = loadOrCreateTotalBurnedClamSingleton()
    total.burnedClam = total.burnedClam.plus(burnedClam)
    total.burnedValueUsd = total.burnedValueUsd.plus(getClamUsdRate().times(burnedClam))
    total.save()
  }
}

export function loadOrCreateTotalBurnedClamSingleton(): TotalBurnedClam {
  let total = TotalBurnedClam.load('1')
  if (total == null) {
    total = new TotalBurnedClam('1')
    total.burnedClam = BigDecimal.fromString('0')
    total.burnedValueUsd = BigDecimal.fromString('0')
  }
  return total
}
