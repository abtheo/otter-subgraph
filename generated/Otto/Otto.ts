// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AdminChanged extends ethereum.Event {
  get params(): AdminChanged__Params {
    return new AdminChanged__Params(this);
  }
}

export class AdminChanged__Params {
  _event: AdminChanged;

  constructor(event: AdminChanged) {
    this._event = event;
  }

  get previousAdmin(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newAdmin(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Approval extends ethereum.Event {
  get params(): Approval__Params {
    return new Approval__Params(this);
  }
}

export class Approval__Params {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get approved(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ApprovalForAll extends ethereum.Event {
  get params(): ApprovalForAll__Params {
    return new ApprovalForAll__Params(this);
  }
}

export class ApprovalForAll__Params {
  _event: ApprovalForAll;

  constructor(event: ApprovalForAll) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get operator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get approved(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class BeaconUpgraded extends ethereum.Event {
  get params(): BeaconUpgraded__Params {
    return new BeaconUpgraded__Params(this);
  }
}

export class BeaconUpgraded__Params {
  _event: BeaconUpgraded;

  constructor(event: BeaconUpgraded) {
    this._event = event;
  }

  get beacon(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class RoleAdminChanged extends ethereum.Event {
  get params(): RoleAdminChanged__Params {
    return new RoleAdminChanged__Params(this);
  }
}

export class RoleAdminChanged__Params {
  _event: RoleAdminChanged;

  constructor(event: RoleAdminChanged) {
    this._event = event;
  }

  get role(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get previousAdminRole(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get newAdminRole(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }
}

export class RoleGranted extends ethereum.Event {
  get params(): RoleGranted__Params {
    return new RoleGranted__Params(this);
  }
}

export class RoleGranted__Params {
  _event: RoleGranted;

  constructor(event: RoleGranted) {
    this._event = event;
  }

  get role(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get account(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get sender(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class RoleRevoked extends ethereum.Event {
  get params(): RoleRevoked__Params {
    return new RoleRevoked__Params(this);
  }
}

export class RoleRevoked__Params {
  _event: RoleRevoked;

  constructor(event: RoleRevoked) {
    this._event = event;
  }

  get role(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get account(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get sender(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class Transfer extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Upgraded extends ethereum.Event {
  get params(): Upgraded__Params {
    return new Upgraded__Params(this);
  }
}

export class Upgraded__Params {
  _event: Upgraded;

  constructor(event: Upgraded) {
    this._event = event;
  }

  get implementation(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Otto__infosResult {
  value0: string;
  value1: string;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;
  value5: BigInt;
  value6: BigInt;
  value7: BigInt;

  constructor(
    value0: string,
    value1: string,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt,
    value5: BigInt,
    value6: BigInt,
    value7: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
    this.value7 = value7;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromString(this.value0));
    map.set("value1", ethereum.Value.fromString(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    map.set("value5", ethereum.Value.fromUnsignedBigInt(this.value5));
    map.set("value6", ethereum.Value.fromUnsignedBigInt(this.value6));
    map.set("value7", ethereum.Value.fromUnsignedBigInt(this.value7));
    return map;
  }
}

export class Otto extends ethereum.SmartContract {
  static bind(address: Address): Otto {
    return new Otto("Otto", address);
  }

  DEFAULT_ADMIN_ROLE(): Bytes {
    let result = super.call(
      "DEFAULT_ADMIN_ROLE",
      "DEFAULT_ADMIN_ROLE():(bytes32)",
      []
    );

    return result[0].toBytes();
  }

  try_DEFAULT_ADMIN_ROLE(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "DEFAULT_ADMIN_ROLE",
      "DEFAULT_ADMIN_ROLE():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  MANAGER_ROLE(): Bytes {
    let result = super.call("MANAGER_ROLE", "MANAGER_ROLE():(bytes32)", []);

    return result[0].toBytes();
  }

  try_MANAGER_ROLE(): ethereum.CallResult<Bytes> {
    let result = super.tryCall("MANAGER_ROLE", "MANAGER_ROLE():(bytes32)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  MINTER_ROLE(): Bytes {
    let result = super.call("MINTER_ROLE", "MINTER_ROLE():(bytes32)", []);

    return result[0].toBytes();
  }

  try_MINTER_ROLE(): ethereum.CallResult<Bytes> {
    let result = super.tryCall("MINTER_ROLE", "MINTER_ROLE():(bytes32)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  U256toU8(traits_: BigInt): Array<i32> {
    let result = super.call("U256toU8", "U256toU8(uint256):(uint8[32])", [
      ethereum.Value.fromUnsignedBigInt(traits_)
    ]);

    return result[0].toI32Array();
  }

  try_U256toU8(traits_: BigInt): ethereum.CallResult<Array<i32>> {
    let result = super.tryCall("U256toU8", "U256toU8(uint256):(uint8[32])", [
      ethereum.Value.fromUnsignedBigInt(traits_)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32Array());
  }

  U8toU256(arr_: Array<i32>): BigInt {
    let result = super.call("U8toU256", "U8toU256(uint8[32]):(uint256)", [
      ethereum.Value.fromI32Array(arr_)
    ]);

    return result[0].toBigInt();
  }

  try_U8toU256(arr_: Array<i32>): ethereum.CallResult<BigInt> {
    let result = super.tryCall("U8toU256", "U8toU256(uint8[32]):(uint256)", [
      ethereum.Value.fromI32Array(arr_)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  balanceOf(owner: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(owner: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getApproved(tokenId: BigInt): Address {
    let result = super.call("getApproved", "getApproved(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_getApproved(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getApproved",
      "getApproved(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getRoleAdmin(role: Bytes): Bytes {
    let result = super.call("getRoleAdmin", "getRoleAdmin(bytes32):(bytes32)", [
      ethereum.Value.fromFixedBytes(role)
    ]);

    return result[0].toBytes();
  }

  try_getRoleAdmin(role: Bytes): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "getRoleAdmin",
      "getRoleAdmin(bytes32):(bytes32)",
      [ethereum.Value.fromFixedBytes(role)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  hasRole(role: Bytes, account: Address): boolean {
    let result = super.call("hasRole", "hasRole(bytes32,address):(bool)", [
      ethereum.Value.fromFixedBytes(role),
      ethereum.Value.fromAddress(account)
    ]);

    return result[0].toBoolean();
  }

  try_hasRole(role: Bytes, account: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("hasRole", "hasRole(bytes32,address):(bool)", [
      ethereum.Value.fromFixedBytes(role),
      ethereum.Value.fromAddress(account)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  infos(param0: BigInt): Otto__infosResult {
    let result = super.call(
      "infos",
      "infos(uint256):(string,string,uint256,uint256,uint256,uint256,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new Otto__infosResult(
      result[0].toString(),
      result[1].toString(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt(),
      result[5].toBigInt(),
      result[6].toBigInt(),
      result[7].toBigInt()
    );
  }

  try_infos(param0: BigInt): ethereum.CallResult<Otto__infosResult> {
    let result = super.tryCall(
      "infos",
      "infos(uint256):(string,string,uint256,uint256,uint256,uint256,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Otto__infosResult(
        value[0].toString(),
        value[1].toString(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toBigInt(),
        value[5].toBigInt(),
        value[6].toBigInt(),
        value[7].toBigInt()
      )
    );
  }

  isApprovedForAll(owner: Address, operator: Address): boolean {
    let result = super.call(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );

    return result[0].toBoolean();
  }

  try_isApprovedForAll(
    owner: Address,
    operator: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  maxBatch(): BigInt {
    let result = super.call("maxBatch", "maxBatch():(uint256)", []);

    return result[0].toBigInt();
  }

  try_maxBatch(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("maxBatch", "maxBatch():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  nextOwnerToExplicitlySet(): BigInt {
    let result = super.call(
      "nextOwnerToExplicitlySet",
      "nextOwnerToExplicitlySet():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_nextOwnerToExplicitlySet(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "nextOwnerToExplicitlySet",
      "nextOwnerToExplicitlySet():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  ownerOf(tokenId: BigInt): Address {
    let result = super.call("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_ownerOf(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  proxiableUUID(): Bytes {
    let result = super.call("proxiableUUID", "proxiableUUID():(bytes32)", []);

    return result[0].toBytes();
  }

  try_proxiableUUID(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "proxiableUUID",
      "proxiableUUID():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  supportsInterface(interfaceId: Bytes): boolean {
    let result = super.call(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );

    return result[0].toBoolean();
  }

  try_supportsInterface(interfaceId: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  tokenByIndex(index: BigInt): BigInt {
    let result = super.call("tokenByIndex", "tokenByIndex(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(index)
    ]);

    return result[0].toBigInt();
  }

  try_tokenByIndex(index: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "tokenByIndex",
      "tokenByIndex(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(index)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tokenOfOwnerByIndex(owner: Address, index: BigInt): BigInt {
    let result = super.call(
      "tokenOfOwnerByIndex",
      "tokenOfOwnerByIndex(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(owner),
        ethereum.Value.fromUnsignedBigInt(index)
      ]
    );

    return result[0].toBigInt();
  }

  try_tokenOfOwnerByIndex(
    owner: Address,
    index: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "tokenOfOwnerByIndex",
      "tokenOfOwnerByIndex(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(owner),
        ethereum.Value.fromUnsignedBigInt(index)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tokenURI(tokenId: BigInt): string {
    let result = super.call("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toString();
  }

  try_tokenURI(tokenId: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  totalMintable(): BigInt {
    let result = super.call("totalMintable", "totalMintable():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalMintable(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "totalMintable",
      "totalMintable():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  totalSupply(): BigInt {
    let result = super.call("totalSupply", "totalSupply():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalSupply(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalSupply", "totalSupply():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ApproveCall extends ethereum.Call {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }
}

export class GrantManagerCall extends ethereum.Call {
  get inputs(): GrantManagerCall__Inputs {
    return new GrantManagerCall__Inputs(this);
  }

  get outputs(): GrantManagerCall__Outputs {
    return new GrantManagerCall__Outputs(this);
  }
}

export class GrantManagerCall__Inputs {
  _call: GrantManagerCall;

  constructor(call: GrantManagerCall) {
    this._call = call;
  }

  get manager_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class GrantManagerCall__Outputs {
  _call: GrantManagerCall;

  constructor(call: GrantManagerCall) {
    this._call = call;
  }
}

export class GrantMinterCall extends ethereum.Call {
  get inputs(): GrantMinterCall__Inputs {
    return new GrantMinterCall__Inputs(this);
  }

  get outputs(): GrantMinterCall__Outputs {
    return new GrantMinterCall__Outputs(this);
  }
}

export class GrantMinterCall__Inputs {
  _call: GrantMinterCall;

  constructor(call: GrantMinterCall) {
    this._call = call;
  }

  get minter_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class GrantMinterCall__Outputs {
  _call: GrantMinterCall;

  constructor(call: GrantMinterCall) {
    this._call = call;
  }
}

export class GrantRoleCall extends ethereum.Call {
  get inputs(): GrantRoleCall__Inputs {
    return new GrantRoleCall__Inputs(this);
  }

  get outputs(): GrantRoleCall__Outputs {
    return new GrantRoleCall__Outputs(this);
  }
}

export class GrantRoleCall__Inputs {
  _call: GrantRoleCall;

  constructor(call: GrantRoleCall) {
    this._call = call;
  }

  get role(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get account(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class GrantRoleCall__Outputs {
  _call: GrantRoleCall;

  constructor(call: GrantRoleCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get name_(): string {
    return this._call.inputValues[0].value.toString();
  }

  get symbol_(): string {
    return this._call.inputValues[1].value.toString();
  }

  get maxBatchSize_(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get collectionSize_(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class MintCall extends ethereum.Call {
  get inputs(): MintCall__Inputs {
    return new MintCall__Inputs(this);
  }

  get outputs(): MintCall__Outputs {
    return new MintCall__Outputs(this);
  }
}

export class MintCall__Inputs {
  _call: MintCall;

  constructor(call: MintCall) {
    this._call = call;
  }

  get to_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get quantity_(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class MintCall__Outputs {
  _call: MintCall;

  constructor(call: MintCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceRoleCall extends ethereum.Call {
  get inputs(): RenounceRoleCall__Inputs {
    return new RenounceRoleCall__Inputs(this);
  }

  get outputs(): RenounceRoleCall__Outputs {
    return new RenounceRoleCall__Outputs(this);
  }
}

export class RenounceRoleCall__Inputs {
  _call: RenounceRoleCall;

  constructor(call: RenounceRoleCall) {
    this._call = call;
  }

  get role(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get account(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class RenounceRoleCall__Outputs {
  _call: RenounceRoleCall;

  constructor(call: RenounceRoleCall) {
    this._call = call;
  }
}

export class RevokeManagerCall extends ethereum.Call {
  get inputs(): RevokeManagerCall__Inputs {
    return new RevokeManagerCall__Inputs(this);
  }

  get outputs(): RevokeManagerCall__Outputs {
    return new RevokeManagerCall__Outputs(this);
  }
}

export class RevokeManagerCall__Inputs {
  _call: RevokeManagerCall;

  constructor(call: RevokeManagerCall) {
    this._call = call;
  }

  get manager_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class RevokeManagerCall__Outputs {
  _call: RevokeManagerCall;

  constructor(call: RevokeManagerCall) {
    this._call = call;
  }
}

export class RevokeMinterCall extends ethereum.Call {
  get inputs(): RevokeMinterCall__Inputs {
    return new RevokeMinterCall__Inputs(this);
  }

  get outputs(): RevokeMinterCall__Outputs {
    return new RevokeMinterCall__Outputs(this);
  }
}

export class RevokeMinterCall__Inputs {
  _call: RevokeMinterCall;

  constructor(call: RevokeMinterCall) {
    this._call = call;
  }

  get minter_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class RevokeMinterCall__Outputs {
  _call: RevokeMinterCall;

  constructor(call: RevokeMinterCall) {
    this._call = call;
  }
}

export class RevokeRoleCall extends ethereum.Call {
  get inputs(): RevokeRoleCall__Inputs {
    return new RevokeRoleCall__Inputs(this);
  }

  get outputs(): RevokeRoleCall__Outputs {
    return new RevokeRoleCall__Outputs(this);
  }
}

export class RevokeRoleCall__Inputs {
  _call: RevokeRoleCall;

  constructor(call: RevokeRoleCall) {
    this._call = call;
  }

  get role(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get account(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class RevokeRoleCall__Outputs {
  _call: RevokeRoleCall;

  constructor(call: RevokeRoleCall) {
    this._call = call;
  }
}

export class SafeTransferFromCall extends ethereum.Call {
  get inputs(): SafeTransferFromCall__Inputs {
    return new SafeTransferFromCall__Inputs(this);
  }

  get outputs(): SafeTransferFromCall__Outputs {
    return new SafeTransferFromCall__Outputs(this);
  }
}

export class SafeTransferFromCall__Inputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class SafeTransferFromCall__Outputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }
}

export class SafeTransferFrom1Call extends ethereum.Call {
  get inputs(): SafeTransferFrom1Call__Inputs {
    return new SafeTransferFrom1Call__Inputs(this);
  }

  get outputs(): SafeTransferFrom1Call__Outputs {
    return new SafeTransferFrom1Call__Outputs(this);
  }
}

export class SafeTransferFrom1Call__Inputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _data(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class SafeTransferFrom1Call__Outputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }
}

export class SetCall extends ethereum.Call {
  get inputs(): SetCall__Inputs {
    return new SetCall__Inputs(this);
  }

  get outputs(): SetCall__Outputs {
    return new SetCall__Outputs(this);
  }
}

export class SetCall__Inputs {
  _call: SetCall;

  constructor(call: SetCall) {
    this._call = call;
  }

  get name_(): string {
    return this._call.inputValues[0].value.toString();
  }

  get description_(): string {
    return this._call.inputValues[1].value.toString();
  }

  get tokenId_(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get birthday_(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get traits_(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get values_(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }

  get attributes_(): BigInt {
    return this._call.inputValues[6].value.toBigInt();
  }

  get attributeBonuses_(): BigInt {
    return this._call.inputValues[7].value.toBigInt();
  }

  get flags_(): BigInt {
    return this._call.inputValues[8].value.toBigInt();
  }
}

export class SetCall__Outputs {
  _call: SetCall;

  constructor(call: SetCall) {
    this._call = call;
  }
}

export class SetApprovalForAllCall extends ethereum.Call {
  get inputs(): SetApprovalForAllCall__Inputs {
    return new SetApprovalForAllCall__Inputs(this);
  }

  get outputs(): SetApprovalForAllCall__Outputs {
    return new SetApprovalForAllCall__Outputs(this);
  }
}

export class SetApprovalForAllCall__Inputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }

  get operator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get approved(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetApprovalForAllCall__Outputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }
}

export class SetBaseURICall extends ethereum.Call {
  get inputs(): SetBaseURICall__Inputs {
    return new SetBaseURICall__Inputs(this);
  }

  get outputs(): SetBaseURICall__Outputs {
    return new SetBaseURICall__Outputs(this);
  }
}

export class SetBaseURICall__Inputs {
  _call: SetBaseURICall;

  constructor(call: SetBaseURICall) {
    this._call = call;
  }

  get baseURI(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class SetBaseURICall__Outputs {
  _call: SetBaseURICall;

  constructor(call: SetBaseURICall) {
    this._call = call;
  }
}

export class TransferFromCall extends ethereum.Call {
  get inputs(): TransferFromCall__Inputs {
    return new TransferFromCall__Inputs(this);
  }

  get outputs(): TransferFromCall__Outputs {
    return new TransferFromCall__Outputs(this);
  }
}

export class TransferFromCall__Inputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromCall__Outputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class UpgradeToCall extends ethereum.Call {
  get inputs(): UpgradeToCall__Inputs {
    return new UpgradeToCall__Inputs(this);
  }

  get outputs(): UpgradeToCall__Outputs {
    return new UpgradeToCall__Outputs(this);
  }
}

export class UpgradeToCall__Inputs {
  _call: UpgradeToCall;

  constructor(call: UpgradeToCall) {
    this._call = call;
  }

  get newImplementation(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpgradeToCall__Outputs {
  _call: UpgradeToCall;

  constructor(call: UpgradeToCall) {
    this._call = call;
  }
}

export class UpgradeToAndCallCall extends ethereum.Call {
  get inputs(): UpgradeToAndCallCall__Inputs {
    return new UpgradeToAndCallCall__Inputs(this);
  }

  get outputs(): UpgradeToAndCallCall__Outputs {
    return new UpgradeToAndCallCall__Outputs(this);
  }
}

export class UpgradeToAndCallCall__Inputs {
  _call: UpgradeToAndCallCall;

  constructor(call: UpgradeToAndCallCall) {
    this._call = call;
  }

  get newImplementation(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get data(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class UpgradeToAndCallCall__Outputs {
  _call: UpgradeToAndCallCall;

  constructor(call: UpgradeToAndCallCall) {
    this._call = call;
  }
}
