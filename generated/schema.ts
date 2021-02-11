// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class ProposalTerm extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save ProposalTerm entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save ProposalTerm entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("ProposalTerm", id.toString(), this);
  }

  static load(id: string): ProposalTerm | null {
    return store.get("ProposalTerm", id) as ProposalTerm | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get executionExpiryDelay(): BigInt {
    let value = this.get("executionExpiryDelay");
    return value.toBigInt();
  }

  set executionExpiryDelay(value: BigInt) {
    this.set("executionExpiryDelay", Value.fromBigInt(value));
  }

  get executionOpenDelay(): BigInt {
    let value = this.get("executionOpenDelay");
    return value.toBigInt();
  }

  set executionOpenDelay(value: BigInt) {
    this.set("executionOpenDelay", Value.fromBigInt(value));
  }

  get isEnabled(): boolean {
    let value = this.get("isEnabled");
    return value.toBoolean();
  }

  set isEnabled(value: boolean) {
    this.set("isEnabled", Value.fromBoolean(value));
  }

  get isExclPools(): boolean {
    let value = this.get("isExclPools");
    return value.toBoolean();
  }

  set isExclPools(value: boolean) {
    this.set("isExclPools", Value.fromBoolean(value));
  }

  get quorum(): BigInt {
    let value = this.get("quorum");
    return value.toBigInt();
  }

  set quorum(value: BigInt) {
    this.set("quorum", Value.fromBigInt(value));
  }

  get votingExpiryDelay(): BigInt {
    let value = this.get("votingExpiryDelay");
    return value.toBigInt();
  }

  set votingExpiryDelay(value: BigInt) {
    this.set("votingExpiryDelay", Value.fromBigInt(value));
  }
}

export class Voter extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Voter entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Voter entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Voter", id.toString(), this);
  }

  static load(id: string): Voter | null {
    return store.get("Voter", id) as Voter | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get inFavour(): boolean {
    let value = this.get("inFavour");
    return value.toBoolean();
  }

  set inFavour(value: boolean) {
    this.set("inFavour", Value.fromBoolean(value));
  }

  get votes(): BigDecimal {
    let value = this.get("votes");
    return value.toBigDecimal();
  }

  set votes(value: BigDecimal) {
    this.set("votes", Value.fromBigDecimal(value));
  }
}

export class Proposal extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Proposal entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Proposal entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Proposal", id.toString(), this);
  }

  static load(id: string): Proposal | null {
    return store.get("Proposal", id) as Proposal | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get proposalType(): string {
    let value = this.get("proposalType");
    return value.toString();
  }

  set proposalType(value: string) {
    this.set("proposalType", Value.fromString(value));
  }

  get assetToken(): string {
    let value = this.get("assetToken");
    return value.toString();
  }

  set assetToken(value: string) {
    this.set("assetToken", Value.fromString(value));
  }

  get assetTokenAmount(): BigDecimal {
    let value = this.get("assetTokenAmount");
    return value.toBigDecimal();
  }

  set assetTokenAmount(value: BigDecimal) {
    this.set("assetTokenAmount", Value.fromBigDecimal(value));
  }

  get pollenAmount(): BigDecimal {
    let value = this.get("pollenAmount");
    return value.toBigDecimal();
  }

  set pollenAmount(value: BigDecimal) {
    this.set("pollenAmount", Value.fromBigDecimal(value));
  }

  get description(): string {
    let value = this.get("description");
    return value.toString();
  }

  set description(value: string) {
    this.set("description", Value.fromString(value));
  }

  get submitter(): Bytes {
    let value = this.get("submitter");
    return value.toBytes();
  }

  set submitter(value: Bytes) {
    this.set("submitter", Value.fromBytes(value));
  }

  get snapshot(): string {
    let value = this.get("snapshot");
    return value.toString();
  }

  set snapshot(value: string) {
    this.set("snapshot", Value.fromString(value));
  }

  get yesVotes(): BigDecimal {
    let value = this.get("yesVotes");
    return value.toBigDecimal();
  }

  set yesVotes(value: BigDecimal) {
    this.set("yesVotes", Value.fromBigDecimal(value));
  }

  get noVotes(): BigDecimal {
    let value = this.get("noVotes");
    return value.toBigDecimal();
  }

  set noVotes(value: BigDecimal) {
    this.set("noVotes", Value.fromBigDecimal(value));
  }

  get votingExpiry(): BigInt {
    let value = this.get("votingExpiry");
    return value.toBigInt();
  }

  set votingExpiry(value: BigInt) {
    this.set("votingExpiry", Value.fromBigInt(value));
  }

  get executionOpen(): BigInt {
    let value = this.get("executionOpen");
    return value.toBigInt();
  }

  set executionOpen(value: BigInt) {
    this.set("executionOpen", Value.fromBigInt(value));
  }

  get executionExpiry(): BigInt {
    let value = this.get("executionExpiry");
    return value.toBigInt();
  }

  set executionExpiry(value: BigInt) {
    this.set("executionExpiry", Value.fromBigInt(value));
  }

  get status(): string {
    let value = this.get("status");
    return value.toString();
  }

  set status(value: string) {
    this.set("status", Value.fromString(value));
  }

  get votePassed(): boolean {
    let value = this.get("votePassed");
    return value.toBoolean();
  }

  set votePassed(value: boolean) {
    this.set("votePassed", Value.fromBoolean(value));
  }

  get executedAt(): BigInt | null {
    let value = this.get("executedAt");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set executedAt(value: BigInt | null) {
    if (value === null) {
      this.unset("executedAt");
    } else {
      this.set("executedAt", Value.fromBigInt(value as BigInt));
    }
  }

  get passVotes(): BigDecimal {
    let value = this.get("passVotes");
    return value.toBigDecimal();
  }

  set passVotes(value: BigDecimal) {
    this.set("passVotes", Value.fromBigDecimal(value));
  }

  get baseCurrency(): string {
    let value = this.get("baseCurrency");
    return value.toString();
  }

  set baseCurrency(value: string) {
    this.set("baseCurrency", Value.fromString(value));
  }

  get terms(): string {
    let value = this.get("terms");
    return value.toString();
  }

  set terms(value: string) {
    this.set("terms", Value.fromString(value));
  }

  get orderType(): string {
    let value = this.get("orderType");
    return value.toString();
  }

  set orderType(value: string) {
    this.set("orderType", Value.fromString(value));
  }

  get voters(): Array<string> {
    let value = this.get("voters");
    return value.toStringArray();
  }

  set voters(value: Array<string>) {
    this.set("voters", Value.fromStringArray(value));
  }
}

export class Snapshot extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Snapshot entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Snapshot entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Snapshot", id.toString(), this);
  }

  static load(id: string): Snapshot | null {
    return store.get("Snapshot", id) as Snapshot | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pollenSupply(): BigDecimal {
    let value = this.get("pollenSupply");
    return value.toBigDecimal();
  }

  set pollenSupply(value: BigDecimal) {
    this.set("pollenSupply", Value.fromBigDecimal(value));
  }

  get stemSupply(): BigDecimal {
    let value = this.get("stemSupply");
    return value.toBigDecimal();
  }

  set stemSupply(value: BigDecimal) {
    this.set("stemSupply", Value.fromBigDecimal(value));
  }

  get stemEffectiveVoteSupply(): BigDecimal {
    let value = this.get("stemEffectiveVoteSupply");
    return value.toBigDecimal();
  }

  set stemEffectiveVoteSupply(value: BigDecimal) {
    this.set("stemEffectiveVoteSupply", Value.fromBigDecimal(value));
  }
}

export class CurrentSupply extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save CurrentSupply entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save CurrentSupply entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("CurrentSupply", id.toString(), this);
  }

  static load(id: string): CurrentSupply | null {
    return store.get("CurrentSupply", id) as CurrentSupply | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pollen(): BigDecimal {
    let value = this.get("pollen");
    return value.toBigDecimal();
  }

  set pollen(value: BigDecimal) {
    this.set("pollen", Value.fromBigDecimal(value));
  }

  get stem(): BigDecimal {
    let value = this.get("stem");
    return value.toBigDecimal();
  }

  set stem(value: BigDecimal) {
    this.set("stem", Value.fromBigDecimal(value));
  }

  get effectiveStem(): BigDecimal {
    let value = this.get("effectiveStem");
    return value.toBigDecimal();
  }

  set effectiveStem(value: BigDecimal) {
    this.set("effectiveStem", Value.fromBigDecimal(value));
  }
}

export class AssetToken extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save AssetToken entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save AssetToken entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("AssetToken", id.toString(), this);
  }

  static load(id: string): AssetToken | null {
    return store.get("AssetToken", id) as AssetToken | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get type(): string {
    let value = this.get("type");
    return value.toString();
  }

  set type(value: string) {
    this.set("type", Value.fromString(value));
  }

  get daoBalance(): BigDecimal {
    let value = this.get("daoBalance");
    return value.toBigDecimal();
  }

  set daoBalance(value: BigDecimal) {
    this.set("daoBalance", Value.fromBigDecimal(value));
  }
}

export class Portfolio extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Portfolio entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Portfolio entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Portfolio", id.toString(), this);
  }

  static load(id: string): Portfolio | null {
    return store.get("Portfolio", id) as Portfolio | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get contract(): Bytes {
    let value = this.get("contract");
    return value.toBytes();
  }

  set contract(value: Bytes) {
    this.set("contract", Value.fromBytes(value));
  }

  get assets(): Array<string> | null {
    let value = this.get("assets");
    if (value === null) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set assets(value: Array<string> | null) {
    if (value === null) {
      this.unset("assets");
    } else {
      this.set("assets", Value.fromStringArray(value as Array<string>));
    }
  }
}

export class CommunityRewards extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save CommunityRewards entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save CommunityRewards entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("CommunityRewards", id.toString(), this);
  }

  static load(id: string): CommunityRewards | null {
    return store.get("CommunityRewards", id) as CommunityRewards | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get earnableRewards(): Array<string> | null {
    let value = this.get("earnableRewards");
    if (value === null) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set earnableRewards(value: Array<string> | null) {
    if (value === null) {
      this.unset("earnableRewards");
    } else {
      this.set(
        "earnableRewards",
        Value.fromStringArray(value as Array<string>)
      );
    }
  }
}

export class Member extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Member entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Member entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Member", id.toString(), this);
  }

  static load(id: string): Member | null {
    return store.get("Member", id) as Member | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get totalPoints(): BigInt {
    let value = this.get("totalPoints");
    return value.toBigInt();
  }

  set totalPoints(value: BigInt) {
    this.set("totalPoints", Value.fromBigInt(value));
  }

  get totalWithdrawn(): BigDecimal {
    let value = this.get("totalWithdrawn");
    return value.toBigDecimal();
  }

  set totalWithdrawn(value: BigDecimal) {
    this.set("totalWithdrawn", Value.fromBigDecimal(value));
  }

  get rewards(): Array<string> | null {
    let value = this.get("rewards");
    if (value === null) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set rewards(value: Array<string> | null) {
    if (value === null) {
      this.unset("rewards");
    } else {
      this.set("rewards", Value.fromStringArray(value as Array<string>));
    }
  }

  get withdrawals(): Array<string> | null {
    let value = this.get("withdrawals");
    if (value === null) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set withdrawals(value: Array<string> | null) {
    if (value === null) {
      this.unset("withdrawals");
    } else {
      this.set("withdrawals", Value.fromStringArray(value as Array<string>));
    }
  }
}

export class EarnedReward extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save EarnedReward entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save EarnedReward entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("EarnedReward", id.toString(), this);
  }

  static load(id: string): EarnedReward | null {
    return store.get("EarnedReward", id) as EarnedReward | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get points(): BigInt {
    let value = this.get("points");
    return value.toBigInt();
  }

  set points(value: BigInt) {
    this.set("points", Value.fromBigInt(value));
  }

  get type(): string {
    let value = this.get("type");
    return value.toString();
  }

  set type(value: string) {
    this.set("type", Value.fromString(value));
  }

  get earnedAt(): BigInt {
    let value = this.get("earnedAt");
    return value.toBigInt();
  }

  set earnedAt(value: BigInt) {
    this.set("earnedAt", Value.fromBigInt(value));
  }
}

export class EarnableReward extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save EarnableReward entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save EarnableReward entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("EarnableReward", id.toString(), this);
  }

  static load(id: string): EarnableReward | null {
    return store.get("EarnableReward", id) as EarnableReward | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get type(): string {
    let value = this.get("type");
    return value.toString();
  }

  set type(value: string) {
    this.set("type", Value.fromString(value));
  }

  get points(): BigInt {
    let value = this.get("points");
    return value.toBigInt();
  }

  set points(value: BigInt) {
    this.set("points", Value.fromBigInt(value));
  }
}

export class StemWithdrawal extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save StemWithdrawal entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save StemWithdrawal entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("StemWithdrawal", id.toString(), this);
  }

  static load(id: string): StemWithdrawal | null {
    return store.get("StemWithdrawal", id) as StemWithdrawal | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get recipient(): Bytes {
    let value = this.get("recipient");
    return value.toBytes();
  }

  set recipient(value: Bytes) {
    this.set("recipient", Value.fromBytes(value));
  }

  get amount(): BigDecimal {
    let value = this.get("amount");
    return value.toBigDecimal();
  }

  set amount(value: BigDecimal) {
    this.set("amount", Value.fromBigDecimal(value));
  }

  get date(): BigInt {
    let value = this.get("date");
    return value.toBigInt();
  }

  set date(value: BigInt) {
    this.set("date", Value.fromBigInt(value));
  }
}
