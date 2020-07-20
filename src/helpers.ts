import { BigInt, BigDecimal } from '@graphprotocol/graph-ts';

export let ZERO_BI = BigInt.fromI32(0);
export let ONE_BI = BigInt.fromI32(1);
export let BI_18 = BigInt.fromI32(18);

export function exponentToBigDecimal(decimals: BigInt): BigDecimal {
  let bd = BigDecimal.fromString('1');
  for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
    bd = bd.times(BigDecimal.fromString('10'));
  }
  return bd;
}

export function convertEthToDecimal(eth: BigInt): BigDecimal {
  return eth.toBigDecimal().div(exponentToBigDecimal(BI_18));
}

export function convertSolTimestampToJs(timestamp: BigInt): BigInt {
  return timestamp.times(BigInt.fromI32(1000));
}

export function getProposalType(i: u32): string {
  let res: string;
  switch (i) {
    case 0:
      res = 'Invest';
      break;
    case 1:
      res = 'Divest';
      break;
    default:
      res = 'Last';
      break;
  }
  return res;
}

export function getTokenType(i: u32): string {
  let res: string;
  switch (i) {
    case 0:
      res = 'ERC20';
      break;
    default:
      res = 'Last';
      break;
  }
  return res;
}

export function getProposalStatus(i: u32): string {
  let res: string;
  switch (i) {
    case 0:
      res = 'Null';
      break;
    case 1:
      res = 'Submitted';
      break;
    case 2:
      res = 'Executed';
      break;
    default:
      res = 'Last';
      break;
  }
  return res;
}
