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

export class Executed extends ethereum.Event {
  get params(): Executed__Params {
    return new Executed__Params(this);
  }
}

export class Executed__Params {
  _event: Executed;

  constructor(event: Executed) {
    this._event = event;
  }

  get proposalType(): i32 {
    return this._event.parameters[0].value.toI32();
  }

  get executor(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get proposalId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Redeemed extends ethereum.Event {
  get params(): Redeemed__Params {
    return new Redeemed__Params(this);
  }
}

export class Redeemed__Params {
  _event: Redeemed;

  constructor(event: Redeemed) {
    this._event = event;
  }

  get sender(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get pollenAmount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
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

  get proposalType(): i32 {
    return this._event.parameters[0].value.toI32();
  }

  get assetTokenType(): i32 {
    return this._event.parameters[1].value.toI32();
  }

  get assetTokenAddress(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get assetTokenAmount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get pollenAmount(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get proposalId(): BigInt {
    return this._event.parameters[5].value.toBigInt();
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

  get proposalType(): i32 {
    return this._event.parameters[0].value.toI32();
  }

  get voter(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get proposalId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get vote(): boolean {
    return this._event.parameters[3].value.toBoolean();
  }
}

export class PollenDAO__getProposalResult {
  value0: i32;
  value1: i32;
  value2: Address;
  value3: BigInt;
  value4: BigInt;
  value5: Address;
  value6: BigInt;
  value7: BigInt;
  value8: BigInt;
  value9: BigInt;
  value10: BigInt;
  value11: i32;

  constructor(
    value0: i32,
    value1: i32,
    value2: Address,
    value3: BigInt,
    value4: BigInt,
    value5: Address,
    value6: BigInt,
    value7: BigInt,
    value8: BigInt,
    value9: BigInt,
    value10: BigInt,
    value11: i32
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
    this.value7 = value7;
    this.value8 = value8;
    this.value9 = value9;
    this.value10 = value10;
    this.value11 = value11;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set(
      "value0",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value0))
    );
    map.set(
      "value1",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value1))
    );
    map.set("value2", ethereum.Value.fromAddress(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    map.set("value5", ethereum.Value.fromAddress(this.value5));
    map.set("value6", ethereum.Value.fromUnsignedBigInt(this.value6));
    map.set("value7", ethereum.Value.fromUnsignedBigInt(this.value7));
    map.set("value8", ethereum.Value.fromUnsignedBigInt(this.value8));
    map.set("value9", ethereum.Value.fromUnsignedBigInt(this.value9));
    map.set("value10", ethereum.Value.fromUnsignedBigInt(this.value10));
    map.set(
      "value11",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value11))
    );
    return map;
  }
}

export class PollenDAO extends ethereum.SmartContract {
  static bind(address: Address): PollenDAO {
    return new PollenDAO("PollenDAO", address);
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

  getProposal(proposalId: BigInt): PollenDAO__getProposalResult {
    let result = super.call(
      "getProposal",
      "getProposal(uint256):(uint8,uint8,address,uint256,uint256,address,uint256,uint256,uint256,uint256,uint256,uint8)",
      [ethereum.Value.fromUnsignedBigInt(proposalId)]
    );

    return new PollenDAO__getProposalResult(
      result[0].toI32(),
      result[1].toI32(),
      result[2].toAddress(),
      result[3].toBigInt(),
      result[4].toBigInt(),
      result[5].toAddress(),
      result[6].toBigInt(),
      result[7].toBigInt(),
      result[8].toBigInt(),
      result[9].toBigInt(),
      result[10].toBigInt(),
      result[11].toI32()
    );
  }

  try_getProposal(
    proposalId: BigInt
  ): ethereum.CallResult<PollenDAO__getProposalResult> {
    let result = super.tryCall(
      "getProposal",
      "getProposal(uint256):(uint8,uint8,address,uint256,uint256,address,uint256,uint256,uint256,uint256,uint256,uint8)",
      [ethereum.Value.fromUnsignedBigInt(proposalId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PollenDAO__getProposalResult(
        value[0].toI32(),
        value[1].toI32(),
        value[2].toAddress(),
        value[3].toBigInt(),
        value[4].toBigInt(),
        value[5].toAddress(),
        value[6].toBigInt(),
        value[7].toBigInt(),
        value[8].toBigInt(),
        value[9].toBigInt(),
        value[10].toBigInt(),
        value[11].toI32()
      )
    );
  }

  getVoterState(proposalId: BigInt): i32 {
    let result = super.call("getVoterState", "getVoterState(uint256):(uint8)", [
      ethereum.Value.fromUnsignedBigInt(proposalId)
    ]);

    return result[0].toI32();
  }

  try_getVoterState(proposalId: BigInt): ethereum.CallResult<i32> {
    let result = super.tryCall(
      "getVoterState",
      "getVoterState(uint256):(uint8)",
      [ethereum.Value.fromUnsignedBigInt(proposalId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
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

  getVotingExpiryDelay(): BigInt {
    let result = super.call(
      "getVotingExpiryDelay",
      "getVotingExpiryDelay():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getVotingExpiryDelay(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getVotingExpiryDelay",
      "getVotingExpiryDelay():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getExecutionOpenDelay(): BigInt {
    let result = super.call(
      "getExecutionOpenDelay",
      "getExecutionOpenDelay():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getExecutionOpenDelay(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getExecutionOpenDelay",
      "getExecutionOpenDelay():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getExecutionExpiryDelay(): BigInt {
    let result = super.call(
      "getExecutionExpiryDelay",
      "getExecutionExpiryDelay():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getExecutionExpiryDelay(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getExecutionExpiryDelay",
      "getExecutionExpiryDelay():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getQuorum(): BigInt {
    let result = super.call("getQuorum", "getQuorum():(uint256)", []);

    return result[0].toBigInt();
  }

  try_getQuorum(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("getQuorum", "getQuorum():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get quorum(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get votingExpiryDelay(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get executionOpenDelay(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get executionExpiryDelay(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
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

  get assetTokenType(): i32 {
    return this._call.inputValues[1].value.toI32();
  }

  get assetTokenAddress(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get assetTokenAmount(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get pollenAmount(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
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

export class ExecuteCall extends ethereum.Call {
  get inputs(): ExecuteCall__Inputs {
    return new ExecuteCall__Inputs(this);
  }

  get outputs(): ExecuteCall__Outputs {
    return new ExecuteCall__Outputs(this);
  }
}

export class ExecuteCall__Inputs {
  _call: ExecuteCall;

  constructor(call: ExecuteCall) {
    this._call = call;
  }

  get proposalId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class ExecuteCall__Outputs {
  _call: ExecuteCall;

  constructor(call: ExecuteCall) {
    this._call = call;
  }
}

export class RedeemCall extends ethereum.Call {
  get inputs(): RedeemCall__Inputs {
    return new RedeemCall__Inputs(this);
  }

  get outputs(): RedeemCall__Outputs {
    return new RedeemCall__Outputs(this);
  }
}

export class RedeemCall__Inputs {
  _call: RedeemCall;

  constructor(call: RedeemCall) {
    this._call = call;
  }

  get pollenAmount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class RedeemCall__Outputs {
  _call: RedeemCall;

  constructor(call: RedeemCall) {
    this._call = call;
  }
}
