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

  get tokens(): Array<string> | null {
    let value = this.get("tokens");
    if (value === null) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set tokens(value: Array<string> | null) {
    if (value === null) {
      this.unset("tokens");
    } else {
      this.set("tokens", Value.fromStringArray(value as Array<string>));
    }
  }
}
