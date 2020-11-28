import { BigInt, BigDecimal } from "@graphprotocol/graph-ts";

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

export class ProposalType {
  static Invest: string = "Invest";
  static Divest: string = "Divest";
}

export class RewardType {
  static ProposalSubmission: string = "ProposalSubmission";
  static ProposalExecution: string = "ProposalExecution";
  static CommunityDistribution: string = "CommunityDistribution";
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
export function getRewardType(i: u32): string {
  let res: string;
  switch (i) {
    case 0:
      res = RewardType.ProposalSubmission;
      break;
    case 1:
      res = RewardType.ProposalExecution;
      break;
    case 2:
      res = RewardType.CommunityDistribution;
      break;
  }
  return res;
}

export class TokenType {
  static ERC20: string = "ERC20";
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

export class ProposalStatus {
  static Null: string = "Null";
  static Submitted: string = "Submitted";
  static Executed: string = "Executed";
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
  }
  return res;
}
