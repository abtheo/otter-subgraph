import { Address, BigInt } from '@graphprotocol/graph-ts'
import { Otto as OttoContract, Transfer as TransferEvent } from '../generated/Otto/Otto'
import { Otto } from '../generated/schema'
import { OTTO } from './utils/Constants'

export function handleTransfer(event: TransferEvent): void {
  let tokenId = event.params.tokenId
  let ottoContract = OttoContract.bind(Address.fromString(OTTO))
  let entity = new Otto(event.address.toHexString() + '-' + tokenId.toString())
  entity.tokenId = tokenId
  entity.owner = event.params.to
  entity.tokenURI = ottoContract.tokenURI(tokenId)
  entity.portalStatus = 'UNOPENED'
  entity.canOpenAt = BigInt.fromU64(1648990800)
  entity.summonAt = BigInt.fromI32(0)
  entity.mintAt = BigInt.fromI32(0)
  entity.updateAt = event.block.timestamp
  entity.save()
}
