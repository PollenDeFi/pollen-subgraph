import { BigInt, ipfs } from "@graphprotocol/graph-ts";
import {
  PollenDAO,
  Executed,
  Redeemed,
  Submitted,
  VotedOn,
} from "../generated/Pollen/PollenDAO";
import { GenericERC20 } from "../generated/Pollen/GenericERC20";
import { Proposal, AssetToken } from "../generated/schema";
import {
  getProposalType,
  getTokenType,
  getProposalStatus,
  convertEthToDecimal,
  convertSolTimestampToJs,
  TokenType,
  ProposalStatus,
} from "./helpers";

export function handleSubmitted(event: Submitted): void {
  let proposal = new Proposal(event.params.proposalId.toString());
  proposal.proposalType = getProposalType(event.params.proposalType);
  let assetToken = AssetToken.load(
    event.params.assetTokenAddress.toHexString()
  );
  if (assetToken == null) {
    assetToken = new AssetToken(event.params.assetTokenAddress.toHexString());
  }
  let assetTokenType = getTokenType(event.params.assetTokenType);
  if (assetTokenType === TokenType.ERC20) {
    let assetContract = GenericERC20.bind(event.params.assetTokenAddress);
    assetToken.name = assetContract.name();
    assetToken.symbol = assetContract.symbol();
    assetToken.type = assetTokenType;
    assetToken.save();
  }
  proposal.assetToken = assetToken.id;
  proposal.assetTokenAmount = convertEthToDecimal(
    event.params.assetTokenAmount
  );
  proposal.pollenAmount = convertEthToDecimal(event.params.pollenAmount);
  proposal.description = ipfs
    .cat("QmUpbbXcmpcXvfnKGSLocCZGTh3Qr8vnHxW5o8heRG6wDC")
    .toString();
  // TODO: use checksum addresses
  // @ts-ignore
  let contract = PollenDAO.bind(event.address);
  let chainProposal = contract.getProposal(event.params.proposalId);
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
  proposal.status = ProposalStatus.Executed;
  proposal.save();
}

export function handleRedeemed(event: Redeemed): void {}
