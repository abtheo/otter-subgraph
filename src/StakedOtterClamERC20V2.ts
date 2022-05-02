import { BigDecimal, BigInt, ethereum } from '@graphprotocol/graph-ts'
import {
  Approval as ApprovalEvent,
  LogRebase as LogRebaseEvent,
  LogStakingContractUpdated as LogStakingContractUpdatedEvent,
  LogSupply as LogSupplyEvent,
  Transfer as TransferEvent,
} from '../generated/StakedOtterClamERC20V2/StakedOtterClamERC20V2'
import {
  Approval,
  APY,
  LogRebase,
  LogStakingContractUpdated,
  LogSupply,
  ProtocolMetric,
  Transfer,
  TreasuryRevenue,
} from '../generated/schema'
import { log } from '@graphprotocol/graph-ts'
import { loadOrCreateTransaction } from './utils/Transactions'
import { updateProtocolMetrics } from './utils/ProtocolMetrics'

// export function handleApproval(event: ApprovalEvent): void {
//   let transaction = loadOrCreateTransaction(event.transaction, event.block)
//   let entity = new Approval(transaction.id)
//   entity.owner = event.params.owner
//   entity.spender = event.params.spender
//   entity.value = event.params.value
//   entity.timestamp = transaction.timestamp
//   entity.transaction = transaction.id
//   entity.save()
// }

export function handleLogRebase(event: LogRebaseEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  let entity = new LogRebase(transaction.id)
  entity.epoch = event.params.epoch
  entity.rebase = event.params.rebase
  entity.index = event.params.index
  entity.timestamp = transaction.timestamp
  entity.transaction = transaction.id
  entity.save()
  calculateApy(transaction.timestamp)
}

export function handleLogStakingContractUpdated(event: LogStakingContractUpdatedEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  let entity = new LogStakingContractUpdated(transaction.id)
  entity.stakingContract = event.params.stakingContract
  entity.timestamp = transaction.timestamp
  entity.transaction = transaction.id
  entity.save()
}

export function handleLogSupply(event: LogSupplyEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  let entity = new LogSupply(transaction.id)
  entity.epoch = event.params.epoch
  entity.timestamp = event.params.timestamp
  entity.totalSupply = event.params.totalSupply
  entity.transaction = transaction.id
  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  let entity = new Transfer(transaction.id)
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value
  entity.timestamp = transaction.timestamp
  entity.transaction = transaction.id
  updateProtocolMetrics(transaction)
  entity.save()
}

/*
(d^p * R) / sCLAM
Where:
d= delta (price difference)
p= power (constant)
R= revenue (clam) 
*/
export function calculateApy(timestamp: BigInt): void {
  let day = timestamp.toI32() - (timestamp.toI32() % 86400)
  log.debug('Calculating APY @ {}', [timestamp.toString()])
  let maxLookback = day - 86400 * 14 //look max 14 days in past

  //only track after block 24088468 == 24-01-2022 UTC
  if (day < 1642978799) {
    return
  }
  //get last valid day of protocol metrics
  let lastMetrics = ProtocolMetric.load(day.toString())
  let dayCounter = day
  while (lastMetrics == null && dayCounter > maxLookback) {
    dayCounter = dayCounter - 86400 //-1day
    lastMetrics = ProtocolMetric.load(dayCounter.toString())
  }
  if (lastMetrics == null) {
    log.warning('Calculating APY @ {}, no past ProtocolMetric could be found', [timestamp.toString()])
    return
  }

  //fetch last N=3 days of revenue and take average
  //does not include today (avoid calculating before all revenue is collected)
  dayCounter = day
  let pastRevenues = [] as BigDecimal[]
  while (pastRevenues.length < 3 && dayCounter > maxLookback) {
    dayCounter = dayCounter - 86400 //-1day
    let revenue = TreasuryRevenue.load(dayCounter.toString())
    if (revenue != null) {
      let shit = revenue.totalRevenueClamAmount.divDecimal(BigDecimal.fromString('1e9'))
      pastRevenues.push(shit)
    }
  }
  if (pastRevenues.length == 0) {
    log.warning('Calculating APY @ {}, no past Treasury Revenues could be found', [timestamp.toString()])
    return
  }

  //in CLAMS
  let rebase_revenue = pastRevenues
    .reduce((x, y) => x.plus(y), BigDecimal.fromString('0'))
    .div(
      BigInt.fromI32(pastRevenues.length)
        .times(BigInt.fromString('3'))
        .toBigDecimal(),
    )

  //d = price / backing
  let delta_price = lastMetrics.clamPrice.div(lastMetrics.treasuryMarketValue.div(lastMetrics.sClamCirculatingSupply))
  //p=3 for now

  //(d^p * R) / sCLAM
  let apy = delta_price
    .times(delta_price)
    .times(delta_price)
    .times(rebase_revenue)
    .div(lastMetrics.sClamCirculatingSupply)

  log.debug(
    'Calculating APY @ {}, lastMetrics timestamp: {}, num revenue days: {}, avg rebase revenue CLAMs: {}, clam price: {}, price delta: {}, sCLAM supply: {}, APY: {}',
    [
      timestamp.toString(),
      lastMetrics.timestamp.toString(),
      pastRevenues.length.toString(),
      rebase_revenue.toString(),
      lastMetrics.clamPrice.toString(),
      delta_price.toString(),
      lastMetrics.sClamCirculatingSupply.toString(),
      apy.toString(),
    ],
  )
  let apyEntity = new APY(timestamp.toString())
  apyEntity.timestamp = timestamp
  apyEntity.apy = apy
  apyEntity.save()
}
