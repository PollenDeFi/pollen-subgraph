import { BigInt, BigDecimal, Address, log } from "@graphprotocol/graph-ts";

import { PollenToken } from "../generated/Pollen/PollenToken";

export let ZERO_BI = BigInt.fromI32(0);
export let ONE_BI = BigInt.fromI32(1);
export let BI_18 = BigInt.fromI32(18);

export function exponentToBigDecimal(decimals: BigInt): BigDecimal {
  let bd = BigDecimal.fromString("1");
  for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
    bd = bd.times(BigDecimal.fromString("10"));
  }
  return bd;
}

export function convertEthToDecimal(eth: BigInt): BigDecimal {
  return eth.toBigDecimal().div(exponentToBigDecimal(BI_18));
}

export function convertSolTimestampToJs(timestamp: BigInt): BigInt {
  return timestamp.times(BigInt.fromI32(1000));
}

export function calculateVoteQuota(
  supply: BigDecimal,
  quorum: BigDecimal
): BigDecimal {
  return supply.times(quorum).div(BigInt.fromI32(100).toBigDecimal());
}

export function tryBalanceOfAt(
  pollenToken: PollenToken,
  snapshotId: BigInt,
  address: string
): BigDecimal {
  let balRes = pollenToken.try_balanceOfAt(
    Address.fromString(address),
    snapshotId
  );
  if (balRes.reverted) {
    log.info("snapshot supply failed", [snapshotId.toString()]);
    return BigDecimal.fromString("0");
  } else {
    return convertEthToDecimal(balRes.value as BigInt);
  }
}

export class ProposalType {
  static Invest: string = "Invest";
  static Divest: string = "Divest";
}

export class OrderType {
  static Market: string = "Market";
  static Limit: string = "Limit";
}

export class BaseCcyType {
  static Asset: string = "Asset";
  static Pai: string = "Pai";
}

export class ProposalStatus {
  static Null: string = "Null";
  static Submitted: string = "Submitted";
  static Executed: string = "Executed";
  static Rejected: string = "Rejected";
  static Passed: string = "Passed";
  static Pended: string = "Pended";
  static Expired: string = "Expired";
}

export class VoterState {
  static Null: string = "Null";
  static VotedYes: string = "VotedYes";
  static VotedNo: string = "VotedNo";
}

export class TokenType {
  static ERC20: string = "ERC20";
}

export class RewardKind {
  static ForVoting: string = "ForVoting";
  static ForProposalPassed: string = "ForProposalPassed";
  static ForExecution: string = "ForExecution";
  static ForStateUpdate: string = "ForStateUpdate";
  static ForPlnHeld: string = "ForPlnHeld";
}

// @ts-ignore
export function getProposalType(i: u32): string {
  let res: string;
  switch (i) {
    case 0:
      res = ProposalType.Invest;
      break;
    case 1:
      res = ProposalType.Divest;
      break;
  }
  return res;
}

// @ts-ignore
export function getOrderType(i: u32): string {
  let res: string;
  switch (i) {
    case 0:
      res = OrderType.Market;
      break;
    case 1:
      res = OrderType.Limit;
      break;
  }
  return res;
}

// @ts-ignore
export function getBaseCcyType(i: u32): string {
  let res: string;
  switch (i) {
    case 0:
      res = BaseCcyType.Asset;
      break;
    case 1:
      res = BaseCcyType.Pai;
      break;
  }
  return res;
}

// @ts-ignore
export function getProposalStatus(i: u32): string {
  let res: string;
  switch (i) {
    case 0:
      res = ProposalStatus.Null;
      break;
    case 1:
      res = ProposalStatus.Submitted;
      break;
    case 2:
      res = ProposalStatus.Executed;
      break;
    case 3:
      res = ProposalStatus.Rejected;
      break;
    case 4:
      res = ProposalStatus.Passed;
      break;
    case 5:
      res = ProposalStatus.Pended;
      break;
    case 6:
      res = ProposalStatus.Expired;
      break;
  }
  return res;
}

// @ts-ignore
export function getVoterState(i: u32): string {
  let res: string;
  switch (i) {
    case 0:
      res = VoterState.Null;
      break;
    case 1:
      res = VoterState.VotedYes;
      break;
    case 2:
      res = VoterState.VotedNo;
      break;
  }
  return res;
}

// @ts-ignore
export function getTokenType(i: u32): string {
  let res: string;
  switch (i) {
    case 0:
      res = TokenType.ERC20;
      break;
  }
  return res;
}

// @ts-ignore
export function getRewardKind(i: u32): string {
  let res: string;
  switch (i) {
    case 0:
      res = RewardKind.ForVoting;
      break;
    case 1:
      res = RewardKind.ForProposalPassed;
      break;
    case 2:
      res = RewardKind.ForExecution;
      break;
    case 3:
      res = RewardKind.ForStateUpdate;
      break;
    case 4:
      res = RewardKind.ForPlnHeld;
      break;
  }
  return res;
}

export function getVoterId(proposalId: string, voterAddress: string): string {
  return proposalId + voterAddress;
}
