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

export class AssetAdded extends ethereum.Event {
  get params(): AssetAdded__Params {
    return new AssetAdded__Params(this);
  }
}

export class AssetAdded__Params {
  _event: AssetAdded;

  constructor(event: AssetAdded) {
    this._event = event;
  }

  get asset(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class AssetRemoved extends ethereum.Event {
  get params(): AssetRemoved__Params {
    return new AssetRemoved__Params(this);
  }
}

export class AssetRemoved__Params {
  _event: AssetRemoved;

  constructor(event: AssetRemoved) {
    this._event = event;
  }

  get asset(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Delegated extends ethereum.Event {
  get params(): Delegated__Params {
    return new Delegated__Params(this);
  }
}

export class Delegated__Params {
  _event: Delegated;

  constructor(event: Delegated) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class RewardParamsUpdated extends ethereum.Event {
  get params(): RewardParamsUpdated__Params {
    return new RewardParamsUpdated__Params(this);
  }
}

export class RewardParamsUpdated__Params {
  _event: RewardParamsUpdated;

  constructor(event: RewardParamsUpdated) {
    this._event = event;
  }
}

export class StatusChanged extends ethereum.Event {
  get params(): StatusChanged__Params {
    return new StatusChanged__Params(this);
  }
}

export class StatusChanged__Params {
  _event: StatusChanged;

  constructor(event: StatusChanged) {
    this._event = event;
  }

  get proposalId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get newStatus(): i32 {
    return this._event.parameters[1].value.toI32();
  }

  get oldStatus(): i32 {
    return this._event.parameters[2].value.toI32();
  }
}

export class Submitted extends ethereum.Event {
  get params(): Submitted__Params {
    return new Submitted__Params(this);
  }
}

export class Submitted__Params {
  _event: Submitted;

  constructor(event: Submitted) {
    this._event = event;
  }

  get proposalId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get proposalType(): i32 {
    return this._event.parameters[1].value.toI32();
  }

  get submitter(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get snapshotId(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class Undelegated extends ethereum.Event {
  get params(): Undelegated__Params {
    return new Undelegated__Params(this);
  }
}

export class Undelegated__Params {
  _event: Undelegated;

  constructor(event: Undelegated) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get from(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class VotedOn extends ethereum.Event {
  get params(): VotedOn__Params {
    return new VotedOn__Params(this);
  }
}

export class VotedOn__Params {
  _event: VotedOn;

  constructor(event: VotedOn) {
    this._event = event;
  }

  get proposalId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get voter(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get vote(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }

  get votes(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class VotingTermsSwitched extends ethereum.Event {
  get params(): VotingTermsSwitched__Params {
    return new VotingTermsSwitched__Params(this);
  }
}

export class VotingTermsSwitched__Params {
  _event: VotingTermsSwitched;

  constructor(event: VotingTermsSwitched) {
    this._event = event;
  }

  get termsId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get isEnabled(): boolean {
    return this._event.parameters[1].value.toBoolean();
  }
}

export class PollenDAO__getProposalResultTermsStruct extends ethereum.Tuple {
  get proposalType(): i32 {
    return this[0].toI32();
  }

  get orderType(): i32 {
    return this[1].toI32();
  }

  get baseCcyType(): i32 {
    return this[2].toI32();
  }

  get assetTokenType(): i32 {
    return this[3].toI32();
  }

  get votingTermsId(): i32 {
    return this[4].toI32();
  }

  get __reserved1(): BigInt {
    return this[5].toBigInt();
  }

  get submitter(): Address {
    return this[6].toAddress();
  }

  get executor(): Address {
    return this[7].toAddress();
  }

  get __reserved2(): BigInt {
    return this[8].toBigInt();
  }

  get assetTokenAddress(): Address {
    return this[9].toAddress();
  }

  get paiAmount(): BigInt {
    return this[10].toBigInt();
  }

  get assetTokenAmount(): BigInt {
    return this[11].toBigInt();
  }
}

export class PollenDAO__getProposalResultParamsStruct extends ethereum.Tuple {
  get votingOpen(): BigInt {
    return this[0].toBigInt();
  }

  get votingExpiry(): BigInt {
    return this[1].toBigInt();
  }

  get executionOpen(): BigInt {
    return this[2].toBigInt();
  }

  get executionExpiry(): BigInt {
    return this[3].toBigInt();
  }

  get snapshotId(): BigInt {
    return this[4].toBigInt();
  }

  get passVotes(): BigInt {
    return this[5].toBigInt();
  }

  get isExclPools(): boolean {
    return this[6].toBoolean();
  }
}

export class PollenDAO__getProposalResultStateStruct extends ethereum.Tuple {
  get status(): i32 {
    return this[0].toI32();
  }

  get yesVotes(): BigInt {
    return this[1].toBigInt();
  }

  get noVotes(): BigInt {
    return this[2].toBigInt();
  }
}

export class PollenDAO__getProposalResult {
  value0: PollenDAO__getProposalResultTermsStruct;
  value1: PollenDAO__getProposalResultParamsStruct;
  value2: PollenDAO__getProposalResultStateStruct;
  value3: string;

  constructor(
    value0: PollenDAO__getProposalResultTermsStruct,
    value1: PollenDAO__getProposalResultParamsStruct,
    value2: PollenDAO__getProposalResultStateStruct,
    value3: string
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromTuple(this.value0));
    map.set("value1", ethereum.Value.fromTuple(this.value1));
    map.set("value2", ethereum.Value.fromTuple(this.value2));
    map.set("value3", ethereum.Value.fromString(this.value3));
    return map;
  }
}

export class PollenDAO__getVoteDataResultValue0Struct extends ethereum.Tuple {
  get state(): i32 {
    return this[0].toI32();
  }

  get votesNum(): BigInt {
    return this[1].toBigInt();
  }

  get delegatee(): Address {
    return this[2].toAddress();
  }
}

export class PollenDAO__getVotingTermsResultValue0Struct extends ethereum.Tuple {
  get isEnabled(): boolean {
    return this[0].toBoolean();
  }

  get isExclPools(): boolean {
    return this[1].toBoolean();
  }

  get quorum(): i32 {
    return this[2].toI32();
  }

  get votingExpiryDelay(): BigInt {
    return this[3].toBigInt();
  }

  get executionOpenDelay(): BigInt {
    return this[4].toBigInt();
  }

  get executionExpiryDelay(): BigInt {
    return this[5].toBigInt();
  }
}

export class PollenDAO extends ethereum.SmartContract {
  static bind(address: Address): PollenDAO {
    return new PollenDAO("PollenDAO", address);
  }

  DOMAIN_SEPARATOR(): Bytes {
    let result = super.call(
      "DOMAIN_SEPARATOR",
      "DOMAIN_SEPARATOR():(bytes32)",
      []
    );

    return result[0].toBytes();
  }

  try_DOMAIN_SEPARATOR(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "DOMAIN_SEPARATOR",
      "DOMAIN_SEPARATOR():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  delegatedTo(param0: Address): Address {
    let result = super.call("delegatedTo", "delegatedTo(address):(address)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toAddress();
  }

  try_delegatedTo(param0: Address): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "delegatedTo",
      "delegatedTo(address):(address)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  nonces(param0: Address): BigInt {
    let result = super.call("nonces", "nonces(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBigInt();
  }

  try_nonces(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("nonces", "nonces(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  version(): string {
    let result = super.call("version", "version():(string)", []);

    return result[0].toString();
  }

  try_version(): ethereum.CallResult<string> {
    let result = super.tryCall("version", "version():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  getPollenAddress(): Address {
    let result = super.call(
      "getPollenAddress",
      "getPollenAddress():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_getPollenAddress(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getPollenAddress",
      "getPollenAddress():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getProposalCount(): BigInt {
    let result = super.call(
      "getProposalCount",
      "getProposalCount():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getProposalCount(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getProposalCount",
      "getProposalCount():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getProposal(proposalId: BigInt): PollenDAO__getProposalResult {
    let result = super.call(
      "getProposal",
      "getProposal(uint256):((uint8,uint8,uint8,uint8,uint8,uint56,address,address,uint96,address,uint96,uint256),(uint32,uint32,uint32,uint32,uint32,uint88,bool),(uint8,uint88,uint88),string)",
      [ethereum.Value.fromUnsignedBigInt(proposalId)]
    );

    return new PollenDAO__getProposalResult(
      result[0].toTuple() as PollenDAO__getProposalResultTermsStruct,
      result[1].toTuple() as PollenDAO__getProposalResultParamsStruct,
      result[2].toTuple() as PollenDAO__getProposalResultStateStruct,
      result[3].toString()
    ) as PollenDAO__getProposalResult;
  }

  try_getProposal(
    proposalId: BigInt
  ): ethereum.CallResult<PollenDAO__getProposalResult> {
    let result = super.tryCall(
      "getProposal",
      "getProposal(uint256):((uint8,uint8,uint8,uint8,uint8,uint56,address,address,uint96,address,uint96,uint256),(uint32,uint32,uint32,uint32,uint32,uint88,bool),(uint8,uint88,uint88),string)",
      [ethereum.Value.fromUnsignedBigInt(proposalId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PollenDAO__getProposalResult(
        value[0].toTuple() as PollenDAO__getProposalResultTermsStruct,
        value[1].toTuple() as PollenDAO__getProposalResultParamsStruct,
        value[2].toTuple() as PollenDAO__getProposalResultStateStruct,
        value[3].toString()
      ) as PollenDAO__getProposalResult
    );
  }

  getVoteData(
    voter: Address,
    proposalId: BigInt
  ): PollenDAO__getVoteDataResultValue0Struct {
    let result = super.call(
      "getVoteData",
      "getVoteData(address,uint256):((uint8,uint88,address))",
      [
        ethereum.Value.fromAddress(voter),
        ethereum.Value.fromUnsignedBigInt(proposalId)
      ]
    );

    return result[0].toTuple() as PollenDAO__getVoteDataResultValue0Struct;
  }

  try_getVoteData(
    voter: Address,
    proposalId: BigInt
  ): ethereum.CallResult<PollenDAO__getVoteDataResultValue0Struct> {
    let result = super.tryCall(
      "getVoteData",
      "getVoteData(address,uint256):((uint8,uint88,address))",
      [
        ethereum.Value.fromAddress(voter),
        ethereum.Value.fromUnsignedBigInt(proposalId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      value[0].toTuple() as PollenDAO__getVoteDataResultValue0Struct
    );
  }

  getAssets(): Array<Address> {
    let result = super.call("getAssets", "getAssets():(address[])", []);

    return result[0].toAddressArray();
  }

  try_getAssets(): ethereum.CallResult<Array<Address>> {
    let result = super.tryCall("getAssets", "getAssets():(address[])", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddressArray());
  }

  getVotingTerms(termsId: BigInt): PollenDAO__getVotingTermsResultValue0Struct {
    let result = super.call(
      "getVotingTerms",
      "getVotingTerms(uint256):((bool,bool,uint8,uint32,uint32,uint32))",
      [ethereum.Value.fromUnsignedBigInt(termsId)]
    );

    return result[0].toTuple() as PollenDAO__getVotingTermsResultValue0Struct;
  }

  try_getVotingTerms(
    termsId: BigInt
  ): ethereum.CallResult<PollenDAO__getVotingTermsResultValue0Struct> {
    let result = super.tryCall(
      "getVotingTerms",
      "getVotingTerms(uint256):((bool,bool,uint8,uint32,uint32,uint32))",
      [ethereum.Value.fromUnsignedBigInt(termsId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      value[0].toTuple() as PollenDAO__getVotingTermsResultValue0Struct
    );
  }

  verifyDelegateSigs(
    delegatee: Address,
    proposalId: BigInt,
    delegators: Array<Address>,
    vs: Array<i32>,
    rs: Array<Bytes>,
    ss: Array<Bytes>
  ): boolean {
    let result = super.call(
      "verifyDelegateSigs",
      "verifyDelegateSigs(address,uint256,address[],uint8[],bytes32[],bytes32[]):(bool)",
      [
        ethereum.Value.fromAddress(delegatee),
        ethereum.Value.fromUnsignedBigInt(proposalId),
        ethereum.Value.fromAddressArray(delegators),
        ethereum.Value.fromI32Array(vs),
        ethereum.Value.fromFixedBytesArray(rs),
        ethereum.Value.fromFixedBytesArray(ss)
      ]
    );

    return result[0].toBoolean();
  }

  try_verifyDelegateSigs(
    delegatee: Address,
    proposalId: BigInt,
    delegators: Array<Address>,
    vs: Array<i32>,
    rs: Array<Bytes>,
    ss: Array<Bytes>
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "verifyDelegateSigs",
      "verifyDelegateSigs(address,uint256,address[],uint8[],bytes32[],bytes32[]):(bool)",
      [
        ethereum.Value.fromAddress(delegatee),
        ethereum.Value.fromUnsignedBigInt(proposalId),
        ethereum.Value.fromAddressArray(delegators),
        ethereum.Value.fromI32Array(vs),
        ethereum.Value.fromFixedBytesArray(rs),
        ethereum.Value.fromFixedBytesArray(ss)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }
}

export class DefaultCall extends ethereum.Call {
  get inputs(): DefaultCall__Inputs {
    return new DefaultCall__Inputs(this);
  }

  get outputs(): DefaultCall__Outputs {
    return new DefaultCall__Outputs(this);
  }
}

export class DefaultCall__Inputs {
  _call: DefaultCall;

  constructor(call: DefaultCall) {
    this._call = call;
  }
}

export class DefaultCall__Outputs {
  _call: DefaultCall;

  constructor(call: DefaultCall) {
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
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class SubmitCall extends ethereum.Call {
  get inputs(): SubmitCall__Inputs {
    return new SubmitCall__Inputs(this);
  }

  get outputs(): SubmitCall__Outputs {
    return new SubmitCall__Outputs(this);
  }
}

export class SubmitCall__Inputs {
  _call: SubmitCall;

  constructor(call: SubmitCall) {
    this._call = call;
  }

  get proposalType(): i32 {
    return this._call.inputValues[0].value.toI32();
  }

  get orderType(): i32 {
    return this._call.inputValues[1].value.toI32();
  }

  get baseCcyType(): i32 {
    return this._call.inputValues[2].value.toI32();
  }

  get termsId(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get assetTokenType(): i32 {
    return this._call.inputValues[4].value.toI32();
  }

  get assetTokenAddress(): Address {
    return this._call.inputValues[5].value.toAddress();
  }

  get assetTokenAmount(): BigInt {
    return this._call.inputValues[6].value.toBigInt();
  }

  get paiAmount(): BigInt {
    return this._call.inputValues[7].value.toBigInt();
  }

  get executor(): Address {
    return this._call.inputValues[8].value.toAddress();
  }

  get descriptionCid(): string {
    return this._call.inputValues[9].value.toString();
  }
}

export class SubmitCall__Outputs {
  _call: SubmitCall;

  constructor(call: SubmitCall) {
    this._call = call;
  }
}

export class VoteOnCall extends ethereum.Call {
  get inputs(): VoteOnCall__Inputs {
    return new VoteOnCall__Inputs(this);
  }

  get outputs(): VoteOnCall__Outputs {
    return new VoteOnCall__Outputs(this);
  }
}

export class VoteOnCall__Inputs {
  _call: VoteOnCall;

  constructor(call: VoteOnCall) {
    this._call = call;
  }

  get proposalId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get vote(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class VoteOnCall__Outputs {
  _call: VoteOnCall;

  constructor(call: VoteOnCall) {
    this._call = call;
  }
}

export class VoteForCall extends ethereum.Call {
  get inputs(): VoteForCall__Inputs {
    return new VoteForCall__Inputs(this);
  }

  get outputs(): VoteForCall__Outputs {
    return new VoteForCall__Outputs(this);
  }
}

export class VoteForCall__Inputs {
  _call: VoteForCall;

  constructor(call: VoteForCall) {
    this._call = call;
  }

  get voter(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get proposalId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get vote(): boolean {
    return this._call.inputValues[2].value.toBoolean();
  }

  get fees(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get deadline(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get v(): i32 {
    return this._call.inputValues[5].value.toI32();
  }

  get r(): Bytes {
    return this._call.inputValues[6].value.toBytes();
  }

  get s(): Bytes {
    return this._call.inputValues[7].value.toBytes();
  }
}

export class VoteForCall__Outputs {
  _call: VoteForCall;

  constructor(call: VoteForCall) {
    this._call = call;
  }
}

export class VoteBySigsCall extends ethereum.Call {
  get inputs(): VoteBySigsCall__Inputs {
    return new VoteBySigsCall__Inputs(this);
  }

  get outputs(): VoteBySigsCall__Outputs {
    return new VoteBySigsCall__Outputs(this);
  }
}

export class VoteBySigsCall__Inputs {
  _call: VoteBySigsCall;

  constructor(call: VoteBySigsCall) {
    this._call = call;
  }

  get proposalId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get vote(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }

  get delegators(): Array<Address> {
    return this._call.inputValues[2].value.toAddressArray();
  }

  get vs(): Array<i32> {
    return this._call.inputValues[3].value.toI32Array();
  }

  get rs(): Array<Bytes> {
    return this._call.inputValues[4].value.toBytesArray();
  }

  get ss(): Array<Bytes> {
    return this._call.inputValues[5].value.toBytesArray();
  }
}

export class VoteBySigsCall__Outputs {
  _call: VoteBySigsCall;

  constructor(call: VoteBySigsCall) {
    this._call = call;
  }
}

export class DelegateCall extends ethereum.Call {
  get inputs(): DelegateCall__Inputs {
    return new DelegateCall__Inputs(this);
  }

  get outputs(): DelegateCall__Outputs {
    return new DelegateCall__Outputs(this);
  }
}

export class DelegateCall__Inputs {
  _call: DelegateCall;

  constructor(call: DelegateCall) {
    this._call = call;
  }

  get delegatee(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class DelegateCall__Outputs {
  _call: DelegateCall;

  constructor(call: DelegateCall) {
    this._call = call;
  }
}

export class DelegateForCall extends ethereum.Call {
  get inputs(): DelegateForCall__Inputs {
    return new DelegateForCall__Inputs(this);
  }

  get outputs(): DelegateForCall__Outputs {
    return new DelegateForCall__Outputs(this);
  }
}

export class DelegateForCall__Inputs {
  _call: DelegateForCall;

  constructor(call: DelegateForCall) {
    this._call = call;
  }

  get delegator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get delegatee(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get fees(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get deadline(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get v(): i32 {
    return this._call.inputValues[4].value.toI32();
  }

  get r(): Bytes {
    return this._call.inputValues[5].value.toBytes();
  }

  get s(): Bytes {
    return this._call.inputValues[6].value.toBytes();
  }
}

export class DelegateForCall__Outputs {
  _call: DelegateForCall;

  constructor(call: DelegateForCall) {
    this._call = call;
  }
}

export class UndelegateCall extends ethereum.Call {
  get inputs(): UndelegateCall__Inputs {
    return new UndelegateCall__Inputs(this);
  }

  get outputs(): UndelegateCall__Outputs {
    return new UndelegateCall__Outputs(this);
  }
}

export class UndelegateCall__Inputs {
  _call: UndelegateCall;

  constructor(call: UndelegateCall) {
    this._call = call;
  }
}

export class UndelegateCall__Outputs {
  _call: UndelegateCall;

  constructor(call: UndelegateCall) {
    this._call = call;
  }
}

export class CastDelegatedVoteCall extends ethereum.Call {
  get inputs(): CastDelegatedVoteCall__Inputs {
    return new CastDelegatedVoteCall__Inputs(this);
  }

  get outputs(): CastDelegatedVoteCall__Outputs {
    return new CastDelegatedVoteCall__Outputs(this);
  }
}

export class CastDelegatedVoteCall__Inputs {
  _call: CastDelegatedVoteCall;

  constructor(call: CastDelegatedVoteCall) {
    this._call = call;
  }

  get delegators(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }

  get proposalId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get vote(): boolean {
    return this._call.inputValues[2].value.toBoolean();
  }
}

export class CastDelegatedVoteCall__Outputs {
  _call: CastDelegatedVoteCall;

  constructor(call: CastDelegatedVoteCall) {
    this._call = call;
  }
}

export class OnExecutedCall extends ethereum.Call {
  get inputs(): OnExecutedCall__Inputs {
    return new OnExecutedCall__Inputs(this);
  }

  get outputs(): OnExecutedCall__Outputs {
    return new OnExecutedCall__Outputs(this);
  }
}

export class OnExecutedCall__Inputs {
  _call: OnExecutedCall;

  constructor(call: OnExecutedCall) {
    this._call = call;
  }

  get proposalId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class OnExecutedCall__Outputs {
  _call: OnExecutedCall;

  constructor(call: OnExecutedCall) {
    this._call = call;
  }
}

export class UpdateProposalStatusCall extends ethereum.Call {
  get inputs(): UpdateProposalStatusCall__Inputs {
    return new UpdateProposalStatusCall__Inputs(this);
  }

  get outputs(): UpdateProposalStatusCall__Outputs {
    return new UpdateProposalStatusCall__Outputs(this);
  }
}

export class UpdateProposalStatusCall__Inputs {
  _call: UpdateProposalStatusCall;

  constructor(call: UpdateProposalStatusCall) {
    this._call = call;
  }

  get proposalId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class UpdateProposalStatusCall__Outputs {
  _call: UpdateProposalStatusCall;

  constructor(call: UpdateProposalStatusCall) {
    this._call = call;
  }
}

export class PollenPermitCall extends ethereum.Call {
  get inputs(): PollenPermitCall__Inputs {
    return new PollenPermitCall__Inputs(this);
  }

  get outputs(): PollenPermitCall__Outputs {
    return new PollenPermitCall__Outputs(this);
  }
}

export class PollenPermitCall__Inputs {
  _call: PollenPermitCall;

  constructor(call: PollenPermitCall) {
    this._call = call;
  }

  get holder(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get permitCalldata(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }

  get fees(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get deadline(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get v(): i32 {
    return this._call.inputValues[4].value.toI32();
  }

  get r(): Bytes {
    return this._call.inputValues[5].value.toBytes();
  }

  get s(): Bytes {
    return this._call.inputValues[6].value.toBytes();
  }
}

export class PollenPermitCall__Outputs {
  _call: PollenPermitCall;

  constructor(call: PollenPermitCall) {
    this._call = call;
  }
}

export class AddAssetCall extends ethereum.Call {
  get inputs(): AddAssetCall__Inputs {
    return new AddAssetCall__Inputs(this);
  }

  get outputs(): AddAssetCall__Outputs {
    return new AddAssetCall__Outputs(this);
  }
}

export class AddAssetCall__Inputs {
  _call: AddAssetCall;

  constructor(call: AddAssetCall) {
    this._call = call;
  }

  get asset(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class AddAssetCall__Outputs {
  _call: AddAssetCall;

  constructor(call: AddAssetCall) {
    this._call = call;
  }
}

export class RemoveAssetCall extends ethereum.Call {
  get inputs(): RemoveAssetCall__Inputs {
    return new RemoveAssetCall__Inputs(this);
  }

  get outputs(): RemoveAssetCall__Outputs {
    return new RemoveAssetCall__Outputs(this);
  }
}

export class RemoveAssetCall__Inputs {
  _call: RemoveAssetCall;

  constructor(call: RemoveAssetCall) {
    this._call = call;
  }

  get asset(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class RemoveAssetCall__Outputs {
  _call: RemoveAssetCall;

  constructor(call: RemoveAssetCall) {
    this._call = call;
  }
}

export class AddVotingTermsCall extends ethereum.Call {
  get inputs(): AddVotingTermsCall__Inputs {
    return new AddVotingTermsCall__Inputs(this);
  }

  get outputs(): AddVotingTermsCall__Outputs {
    return new AddVotingTermsCall__Outputs(this);
  }
}

export class AddVotingTermsCall__Inputs {
  _call: AddVotingTermsCall;

  constructor(call: AddVotingTermsCall) {
    this._call = call;
  }

  get terms(): AddVotingTermsCallTermsStruct {
    return this._call.inputValues[0].value.toTuple() as AddVotingTermsCallTermsStruct;
  }
}

export class AddVotingTermsCall__Outputs {
  _call: AddVotingTermsCall;

  constructor(call: AddVotingTermsCall) {
    this._call = call;
  }
}

export class AddVotingTermsCallTermsStruct extends ethereum.Tuple {
  get isEnabled(): boolean {
    return this[0].toBoolean();
  }

  get isExclPools(): boolean {
    return this[1].toBoolean();
  }

  get quorum(): i32 {
    return this[2].toI32();
  }

  get votingExpiryDelay(): BigInt {
    return this[3].toBigInt();
  }

  get executionOpenDelay(): BigInt {
    return this[4].toBigInt();
  }

  get executionExpiryDelay(): BigInt {
    return this[5].toBigInt();
  }
}

export class SwitchVotingTermsCall extends ethereum.Call {
  get inputs(): SwitchVotingTermsCall__Inputs {
    return new SwitchVotingTermsCall__Inputs(this);
  }

  get outputs(): SwitchVotingTermsCall__Outputs {
    return new SwitchVotingTermsCall__Outputs(this);
  }
}

export class SwitchVotingTermsCall__Inputs {
  _call: SwitchVotingTermsCall;

  constructor(call: SwitchVotingTermsCall) {
    this._call = call;
  }

  get termsId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get isEnabled(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SwitchVotingTermsCall__Outputs {
  _call: SwitchVotingTermsCall;

  constructor(call: SwitchVotingTermsCall) {
    this._call = call;
  }
}
