import { BigInt, ipfs, Address } from "@graphprotocol/graph-ts";
import {
  PollenDAO,
  Executed,
  Redeemed,
  Submitted,
  VotedOn,
} from "../generated/Pollen/PollenDAO";
import { GenericERC20 } from "../generated/Pollen/GenericERC20";
import { Proposal, AssetToken, Portfolio } from "../generated/schema";
import {
  getProposalType,
  getTokenType,
  getProposalStatus,
  convertEthToDecimal,
  convertSolTimestampToJs,
  TokenType,
  ProposalStatus,
} from "./helpers";

const portfolioId = "0";

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
    // TODO: update daoBalance on any ERC20 transfer event (separate mapping)
    let assetContract = GenericERC20.bind(event.params.assetTokenAddress);
    assetToken.name = assetContract.name();
    assetToken.symbol = assetContract.symbol();
    assetToken.type = assetTokenType;
    assetToken.daoBalance = convertEthToDecimal(
      assetContract.balanceOf(event.address)
    );
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
  let assetToken = AssetToken.load(proposal.assetToken);
  let assetContract = GenericERC20.bind(Address.fromString(assetToken.id));
  assetToken.daoBalance = convertEthToDecimal(
    assetContract.balanceOf(event.address)
  );
  assetToken.save();
  let portfolio = Portfolio.load(portfolioId);
  if (portfolio == null) {
    portfolio = new Portfolio(portfolioId);
  }
  portfolio.contract = event.address;
  if (!portfolio.assets.includes(assetToken.id)) {
    portfolio.assets = portfolio.assets.concat([assetToken.id]);
  }
  portfolio.save();
}

export function handleRedeemed(event: Redeemed): void {
  Portfolio.load(portfolioId).assets.forEach((tokenId) => {
    let assetToken = AssetToken.load(tokenId);
    let assetContract = GenericERC20.bind(Address.fromString(assetToken.id));
    let contractStr = Portfolio.load(portfolioId).contract.toHexString();
    assetToken.daoBalance = convertEthToDecimal(
      assetContract.balanceOf(Address.fromString(contractStr))
    );
    assetToken.save();
  });
}
