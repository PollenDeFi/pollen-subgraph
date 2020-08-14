import { BigInt, ipfs } from "@graphprotocol/graph-ts";
import {
  PollenDAO,
  Executed,
  Redeemed,
  Submitted,
  VotedOn,
} from "../generated/Pollen/PollenDAO";
import { Proposal } from "../generated/schema";
import {
  getProposalType,
  getTokenType,
  getProposalStatus,
  convertEthToDecimal,
  convertSolTimestampToJs,
} from "./helpers";

export function handleSubmitted(event: Submitted): void {
  let proposal = new Proposal(event.params.proposalId.toString());
  // @ts-ignore
  let contract = PollenDAO.bind(event.address);
  let chainProposal = contract.getProposal(event.params.proposalId);
  proposal.proposalType = getProposalType(chainProposal.value0);
  proposal.assetTokenType = getTokenType(chainProposal.value1);
  proposal.assetTokenAddress = chainProposal.value2;
  proposal.assetTokenAmount = convertEthToDecimal(
    chainProposal.value3 as BigInt
  );
  proposal.pollenAmount = convertEthToDecimal(chainProposal.value4 as BigInt);
  proposal.description = ipfs
    .cat("QmUpbbXcmpcXvfnKGSLocCZGTh3Qr8vnHxW5o8heRG6wDC")
    .toString();
  proposal.submitter = chainProposal.value5;
  proposal.yesVotes = convertEthToDecimal(chainProposal.value6 as BigInt);
  proposal.noVotes = convertEthToDecimal(chainProposal.value7 as BigInt);
  proposal.votingExpiry = convertSolTimestampToJs(chainProposal.value8);
  proposal.executionOpen = convertSolTimestampToJs(chainProposal.value9);
  proposal.executionExpiry = convertSolTimestampToJs(chainProposal.value10);
  proposal.status = getProposalStatus(chainProposal.value11);
  proposal.save();
}

export function handleVotedOn(event: VotedOn): void {
  let proposal = Proposal.load(event.params.proposalId.toString());
  // @ts-ignore
  let contract = PollenDAO.bind(event.address);
  let chainProposal = contract.getProposal(event.params.proposalId);
  proposal.yesVotes = convertEthToDecimal(chainProposal.value6 as BigInt);
  proposal.noVotes = convertEthToDecimal(chainProposal.value7 as BigInt);
  proposal.save();
}

export function handleExecuted(event: Executed): void {
  let proposal = Proposal.load(event.params.proposalId.toString());
  proposal.status = "Executed";
  proposal.save();
}

export function handleRedeemed(event: Redeemed): void {}
