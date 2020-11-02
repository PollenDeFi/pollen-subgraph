import { BigInt, ipfs, Address, BigDecimal } from "@graphprotocol/graph-ts";
import {
  PollenDAO,
  assetAdded,
  Executed,
  Redeemed,
  Submitted,
  VotedOn,
} from "../generated/Pollen/PollenDAO";
import { PollenToken } from "../generated/Pollen/PollenToken";
import { GenericERC20 } from "../generated/Pollen/GenericERC20";
import { Proposal, AssetToken, Portfolio, Snapshot } from "../generated/schema";
import {
  getProposalType,
  getTokenType,
  getProposalStatus,
  convertEthToDecimal,
  convertSolTimestampToJs,
  calculateVoteQuota,
  TokenType,
  ProposalStatus,
} from "./helpers";

const portfolioId = "0";

export function handleAssetAdded(event: assetAdded): void {
  let assetToken = AssetToken.load(event.params.asset.toHexString());
  if (assetToken == null) {
    assetToken = new AssetToken(event.params.asset.toHexString());
  }
  let assetContract = GenericERC20.bind(Address.fromString(assetToken.id));
  assetToken.name = assetContract.name();
  assetToken.symbol = assetContract.symbol();
  // TODO: refactor types and include into addAsset event
  assetToken.type = TokenType.ERC20;
  assetToken.daoBalance = convertEthToDecimal(
    // @ts-ignore
    assetContract.balanceOf(event.address)
  );
  assetToken.save();

  let portfolio = Portfolio.load(portfolioId);
  if (portfolio == null) {
    portfolio = new Portfolio(portfolioId);
  }
  // @ts-ignore
  portfolio.contract = event.address;
  if (!portfolio.assets.includes(assetToken.id)) {
    portfolio.assets = portfolio.assets.concat([assetToken.id]);
  }
  portfolio.save();
}

export function handleSubmitted(event: Submitted): void {
  // @ts-ignore
  let contract = PollenDAO.bind(event.address);
  let pollenToken = PollenToken.bind(contract.getPollenAddress());
  let chainProposalData = contract.getProposalData(event.params.proposalId);
  let chainProposalTimeStamps = contract.getProposalTimestamps(
    event.params.proposalId
  );

  let proposal = new Proposal(event.params.proposalId.toString());
  proposal.proposalType = getProposalType(chainProposalData.value0);
  let assetTokenType = getTokenType(chainProposalData.value1);
  let assetToken = AssetToken.load(chainProposalData.value2.toHexString());
  if (assetToken == null) {
    assetToken = new AssetToken(chainProposalData.value2.toHexString());
  }
  if (assetTokenType === TokenType.ERC20) {
    // TODO: update daoBalance on any ERC20 transfer event (separate mapping)
    let assetContract = GenericERC20.bind(chainProposalData.value2);
    assetToken.name = assetContract.name();
    assetToken.symbol = assetContract.symbol();
    assetToken.type = assetTokenType;
    assetToken.daoBalance = convertEthToDecimal(
      // @ts-ignore
      assetContract.balanceOf(event.address)
    );
    assetToken.save();
  }
  proposal.assetToken = assetToken.id;
  proposal.assetTokenAmount = convertEthToDecimal(chainProposalData.value3);
  proposal.pollenAmount = convertEthToDecimal(chainProposalData.value4);
  proposal.description = ipfs.cat(chainProposalData.value5).toString();
  proposal.submitter = chainProposalData.value6;

  let snapshotId = chainProposalData.value7;
  let snapshot = Snapshot.load(snapshotId.toHexString());
  if (snapshot == null) {
    snapshot = new Snapshot(snapshotId.toHexString());
    snapshot.pollenSupply = convertEthToDecimal(
      pollenToken.totalSupplyAt(snapshotId)
    );
    snapshot.save();
  }
  proposal.snapshot = snapshot.id;
  proposal.yesVotes = convertEthToDecimal(chainProposalData.value8 as BigInt);
  proposal.noVotes = convertEthToDecimal(chainProposalData.value9 as BigInt);
  proposal.status = getProposalStatus(chainProposalData.value10);
  let voteQuota = calculateVoteQuota(
    snapshot.pollenSupply,
    contract.getQuorum().toBigDecimal()
  );
  if (
    proposal.yesVotes > proposal.noVotes &&
    proposal.yesVotes.plus(proposal.noVotes) > voteQuota
  ) {
    proposal.votePassed = true;
  } else {
    proposal.votePassed = false;
  }
  proposal.votingExpiry = convertSolTimestampToJs(
    chainProposalTimeStamps.value0
  );
  proposal.executionOpen = convertSolTimestampToJs(
    chainProposalTimeStamps.value1
  );
  proposal.executionExpiry = convertSolTimestampToJs(
    chainProposalTimeStamps.value2
  );
  proposal.save();
  // TODO: refactor adding to portfolio
  let portfolio = Portfolio.load(portfolioId);
  if (portfolio == null) {
    portfolio = new Portfolio(portfolioId);
  }
  // @ts-ignore
  portfolio.contract = event.address;
  if (!portfolio.assets.includes(assetToken.id)) {
    portfolio.assets = portfolio.assets.concat([assetToken.id]);
  }
  portfolio.save();
}

export function handleVotedOn(event: VotedOn): void {
  let proposal = Proposal.load(event.params.proposalId.toString());
  // @ts-ignore
  let contract = PollenDAO.bind(event.address);
  let snapshot = Snapshot.load(proposal.snapshot);
  let chainProposalData = contract.getProposalData(event.params.proposalId);
  proposal.yesVotes = convertEthToDecimal(chainProposalData.value8 as BigInt);
  proposal.noVotes = convertEthToDecimal(chainProposalData.value9 as BigInt);
  let voteQuota = calculateVoteQuota(
    snapshot.pollenSupply,
    contract.getQuorum().toBigDecimal()
  );
  if (
    proposal.yesVotes > proposal.noVotes &&
    proposal.yesVotes.plus(proposal.noVotes) > voteQuota
  ) {
    proposal.votePassed = true;
  } else {
    proposal.votePassed = false;
  }
  proposal.save();
}

export function handleExecuted(event: Executed): void {
  let proposal = Proposal.load(event.params.proposalId.toString());
  proposal.status = ProposalStatus.Executed;
  // @ts-ignore
  proposal.executedAt = convertSolTimestampToJs(event.block.timestamp);
  proposal.save();
  let assetToken = AssetToken.load(proposal.assetToken);
  let assetContract = GenericERC20.bind(Address.fromString(assetToken.id));
  assetToken.daoBalance = convertEthToDecimal(
    // @ts-ignore
    assetContract.balanceOf(event.address)
  );
  assetToken.save();
  let portfolio = Portfolio.load(portfolioId);
  if (portfolio == null) {
    portfolio = new Portfolio(portfolioId);
  }
  // @ts-ignore
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
