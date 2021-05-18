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

export class PointsRewarded extends ethereum.Event {
  get params(): PointsRewarded__Params {
    return new PointsRewarded__Params(this);
  }
}

export class PointsRewarded__Params {
  _event: PointsRewarded;

  constructor(event: PointsRewarded) {
    this._event = event;
  }

  get member(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get kind(): i32 {
    return this._event.parameters[1].value.toI32();
  }

  get points(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class PollenAllocation extends ethereum.Event {
  get params(): PollenAllocation__Params {
    return new PollenAllocation__Params(this);
  }
}

export class PollenAllocation__Params {
  _event: PollenAllocation;

  constructor(event: PollenAllocation) {
    this._event = event;
  }

  get amount(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class RewardWithdrawal extends ethereum.Event {
  get params(): RewardWithdrawal__Params {
    return new RewardWithdrawal__Params(this);
  }
}

export class RewardWithdrawal__Params {
  _event: RewardWithdrawal;

  constructor(event: RewardWithdrawal) {
    this._event = event;
  }

  get member(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class PollenGrantor__getMemberRewardsResultValue0Struct extends ethereum.Tuple {
  get lastUpdateBlock(): BigInt {
    return this[0].toBigInt();
  }

  get points(): BigInt {
    return this[1].toBigInt();
  }

  get entitled(): BigInt {
    return this[2].toBigInt();
  }

  get adjustment(): BigInt {
    return this[3].toBigInt();
  }
}

export class PollenGrantor__getRewardTotalsResultValue0Struct extends ethereum.Tuple {
  get lastAccumBlock(): BigInt {
    return this[0].toBigInt();
  }

  get accPollenPerPoint(): BigInt {
    return this[1].toBigInt();
  }

  get totalPoints(): BigInt {
    return this[2].toBigInt();
  }
}

export class PollenGrantor extends ethereum.SmartContract {
  static bind(address: Address): PollenGrantor {
    return new PollenGrantor("PollenGrantor", address);
  }

  getMemberRewards(
    member: Address
  ): PollenGrantor__getMemberRewardsResultValue0Struct {
    let result = super.call(
      "getMemberRewards",
      "getMemberRewards(address):((uint32,uint64,uint64,uint96))",
      [ethereum.Value.fromAddress(member)]
    );

    return result[0].toTuple() as PollenGrantor__getMemberRewardsResultValue0Struct;
  }

  try_getMemberRewards(
    member: Address
  ): ethereum.CallResult<PollenGrantor__getMemberRewardsResultValue0Struct> {
    let result = super.tryCall(
      "getMemberRewards",
      "getMemberRewards(address):((uint32,uint64,uint64,uint96))",
      [ethereum.Value.fromAddress(member)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      value[0].toTuple() as PollenGrantor__getMemberRewardsResultValue0Struct
    );
  }

  getPendingPollen(member: Address): BigInt {
    let result = super.call(
      "getPendingPollen",
      "getPendingPollen(address):(uint256)",
      [ethereum.Value.fromAddress(member)]
    );

    return result[0].toBigInt();
  }

  try_getPendingPollen(member: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getPendingPollen",
      "getPendingPollen(address):(uint256)",
      [ethereum.Value.fromAddress(member)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getRewardTotals(): PollenGrantor__getRewardTotalsResultValue0Struct {
    let result = super.call(
      "getRewardTotals",
      "getRewardTotals():((uint32,uint112,uint112))",
      []
    );

    return result[0].toTuple() as PollenGrantor__getRewardTotalsResultValue0Struct;
  }

  try_getRewardTotals(): ethereum.CallResult<
    PollenGrantor__getRewardTotalsResultValue0Struct
  > {
    let result = super.tryCall(
      "getRewardTotals",
      "getRewardTotals():((uint32,uint112,uint112))",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      value[0].toTuple() as PollenGrantor__getRewardTotalsResultValue0Struct
    );
  }
}

export class RewardMemberCall extends ethereum.Call {
  get inputs(): RewardMemberCall__Inputs {
    return new RewardMemberCall__Inputs(this);
  }

  get outputs(): RewardMemberCall__Outputs {
    return new RewardMemberCall__Outputs(this);
  }
}

export class RewardMemberCall__Inputs {
  _call: RewardMemberCall;

  constructor(call: RewardMemberCall) {
    this._call = call;
  }

  get member(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get kind(): i32 {
    return this._call.inputValues[1].value.toI32();
  }

  get factor(): i32 {
    return this._call.inputValues[2].value.toI32();
  }
}

export class RewardMemberCall__Outputs {
  _call: RewardMemberCall;

  constructor(call: RewardMemberCall) {
    this._call = call;
  }
}

export class RewardMembersCall extends ethereum.Call {
  get inputs(): RewardMembersCall__Inputs {
    return new RewardMembersCall__Inputs(this);
  }

  get outputs(): RewardMembersCall__Outputs {
    return new RewardMembersCall__Outputs(this);
  }
}

export class RewardMembersCall__Inputs {
  _call: RewardMembersCall;

  constructor(call: RewardMembersCall) {
    this._call = call;
  }

  get members(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }

  get kinds(): Array<i32> {
    return this._call.inputValues[1].value.toI32Array();
  }

  get factors(): Array<i32> {
    return this._call.inputValues[2].value.toI32Array();
  }
}

export class RewardMembersCall__Outputs {
  _call: RewardMembersCall;

  constructor(call: RewardMembersCall) {
    this._call = call;
  }
}

export class WithdrawRewardsCall extends ethereum.Call {
  get inputs(): WithdrawRewardsCall__Inputs {
    return new WithdrawRewardsCall__Inputs(this);
  }

  get outputs(): WithdrawRewardsCall__Outputs {
    return new WithdrawRewardsCall__Outputs(this);
  }
}

export class WithdrawRewardsCall__Inputs {
  _call: WithdrawRewardsCall;

  constructor(call: WithdrawRewardsCall) {
    this._call = call;
  }

  get member(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class WithdrawRewardsCall__Outputs {
  _call: WithdrawRewardsCall;

  constructor(call: WithdrawRewardsCall) {
    this._call = call;
  }
}

export class UpdateRewardPoolCall extends ethereum.Call {
  get inputs(): UpdateRewardPoolCall__Inputs {
    return new UpdateRewardPoolCall__Inputs(this);
  }

  get outputs(): UpdateRewardPoolCall__Outputs {
    return new UpdateRewardPoolCall__Outputs(this);
  }
}

export class UpdateRewardPoolCall__Inputs {
  _call: UpdateRewardPoolCall;

  constructor(call: UpdateRewardPoolCall) {
    this._call = call;
  }
}

export class UpdateRewardPoolCall__Outputs {
  _call: UpdateRewardPoolCall;

  constructor(call: UpdateRewardPoolCall) {
    this._call = call;
  }
}

export class InitializeGrantorCall extends ethereum.Call {
  get inputs(): InitializeGrantorCall__Inputs {
    return new InitializeGrantorCall__Inputs(this);
  }

  get outputs(): InitializeGrantorCall__Outputs {
    return new InitializeGrantorCall__Outputs(this);
  }
}

export class InitializeGrantorCall__Inputs {
  _call: InitializeGrantorCall;

  constructor(call: InitializeGrantorCall) {
    this._call = call;
  }
}

export class InitializeGrantorCall__Outputs {
  _call: InitializeGrantorCall;

  constructor(call: InitializeGrantorCall) {
    this._call = call;
  }
}

export class UpdateRewardRatesCall extends ethereum.Call {
  get inputs(): UpdateRewardRatesCall__Inputs {
    return new UpdateRewardRatesCall__Inputs(this);
  }

  get outputs(): UpdateRewardRatesCall__Outputs {
    return new UpdateRewardRatesCall__Outputs(this);
  }
}

export class UpdateRewardRatesCall__Inputs {
  _call: UpdateRewardRatesCall;

  constructor(call: UpdateRewardRatesCall) {
    this._call = call;
  }

  get _rewardRates(): Array<i32> {
    return this._call.inputValues[0].value.toI32Array();
  }
}

export class UpdateRewardRatesCall__Outputs {
  _call: UpdateRewardRatesCall;

  constructor(call: UpdateRewardRatesCall) {
    this._call = call;
  }
}