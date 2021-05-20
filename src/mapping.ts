import {
  BigInt,
  ipfs,
  Address,
  BigDecimal,
  log,
} from "@graphprotocol/graph-ts";
import {
  PollenDAO,
  AssetAdded,
  Submitted,
  VotedOn,
  VotingTermsSwitched,
  Executed,
  Redeemed,
  PointsRewarded,
  RewardWithdrawal,
  Delegated,
  Undelegated,
  AssetRemoved,
} from "../generated/Pollen/PollenDAO";
import { PaiToken } from "../generated/Pollen/PaiToken";
import { PollenToken } from "../generated/Pollen/PollenToken";
import { GenericERC20 } from "../generated/Pollen/GenericERC20";
import {
  Proposal,
  AssetToken,
  Portfolio,
  Snapshot,
  CommunityRewards,
  EarnableReward,
  EarnedReward,
  Member,
  PollenWithdrawal as PollenWithdrawalItem,
  ProposalTerm,
  Voter,
} from "../generated/schema";
import {
  getProposalType,
  getTokenType,
  getProposalStatus,
  getRewardKind,
  convertEthToDecimal,
  convertSolTimestampToJs,
  TokenType,
  ProposalStatus,
  tryBalanceOfAt,
  getBaseCcyType,
  BaseCcyType,
  getOrderType,
  getVoterId,
} from "./helpers";

const constId = "0";

// TODO: Better management of network specific contracts

// Ropsten
const reservePool = "0xe67903512d7b24C187868edCE5886a4799311C0e";
const foundationWallet = "0x64662e7849A3cF25821777FF5e663755a4121C87";
const foundersWallet = "0xc45c40E871CAf671486517dEE4E05f9338cA1732";

// mainnet
// const reservePool = '0xf8617006b4CD2db7385c1cb613885f1292e51b2e'
// const foundationWallet = '0x30dDD235bEd94fdbCDc197513a638D6CAa261EC7'
// const foundersWallet = '0xd7Cc88bB603DceAFB5E8290d8188C8BF36fD742B'

let initComplete = false;

function init(): void {
  initComplete = true;

  let communityRewards = new CommunityRewards(constId);

  let earnableReward0 = new EarnableReward("0");
  earnableReward0.type = getRewardKind(0);
  earnableReward0.points = BigInt.fromI32(100);
  earnableReward0.save();
  let earnableReward1 = new EarnableReward("1");
  earnableReward1.type = getRewardKind(1);
  earnableReward1.points = BigInt.fromI32(300);
  earnableReward1.save();
  let earnableReward2 = new EarnableReward("2");
  earnableReward2.type = getRewardKind(2);
  earnableReward2.points = BigInt.fromI32(500);
  earnableReward2.save();
  let earnableReward3 = new EarnableReward("3");
  earnableReward3.type = getRewardKind(3);
  earnableReward3.points = BigInt.fromI32(100);
  earnableReward3.save();
  let earnableReward4 = new EarnableReward("4");
  earnableReward4.type = getRewardKind(4);
  earnableReward4.points = BigInt.fromI32(1);
  earnableReward4.save();

  communityRewards.earnableRewards = communityRewards.earnableRewards.concat([
    earnableReward0.id,
  ]);
  communityRewards.earnableRewards = communityRewards.earnableRewards.concat([
    earnableReward1.id,
  ]);
  communityRewards.earnableRewards = communityRewards.earnableRewards.concat([
    earnableReward2.id,
  ]);
  communityRewards.earnableRewards = communityRewards.earnableRewards.concat([
    earnableReward3.id,
  ]);
  communityRewards.earnableRewards = communityRewards.earnableRewards.concat([
    earnableReward4.id,
  ]);

  communityRewards.save();
}

export function handleAssetAdded(event: AssetAdded): void {
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

  let portfolio = getOrCreatePortfolio();

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
  // @ts-ignore
  let paiToken = PaiToken.bind(contract.getPaiAddress());
  let pollenToken = PollenToken.bind(contract.getPollenAddress());
  let chainProposal = contract.getProposal(event.params.proposalId);
  let proposalState = contract.getProposal(event.params.proposalId).value2;

  let proposal = new Proposal(event.params.proposalId.toString());
  proposal.proposalType = getProposalType(chainProposal.value0.proposalType);

  let assetTokenType = getTokenType(chainProposal.value0.assetTokenType);
  let assetToken = AssetToken.load(
    chainProposal.value0.assetTokenAddress.toHexString()
  );
  if (assetToken == null) {
    assetToken = new AssetToken(
      chainProposal.value0.assetTokenAddress.toHexString()
    );
  }
  if (assetTokenType === TokenType.ERC20) {
    // TODO: update daoBalance on any ERC20 transfer event (separate mapping)
    let assetContract = GenericERC20.bind(
      chainProposal.value0.assetTokenAddress
    );
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
  proposal.assetTokenAmount = convertEthToDecimal(
    chainProposal.value0.assetTokenAmount
  );
  proposal.orderType = getOrderType(chainProposal.value0.orderType);
  proposal.baseCurrency = getBaseCcyType(chainProposal.value0.baseCcyType);
  proposal.paiAmount = convertEthToDecimal(chainProposal.value0.paiAmount);
  proposal.description = ipfs.cat(chainProposal.value3).toString();
  proposal.submitter = chainProposal.value0.submitter;
  proposal.delegateVotes = [];

  let termsId = BigInt.fromI32(chainProposal.value0.votingTermsId);
  let terms = ProposalTerm.load(termsId.toString());
  proposal.terms = terms.id;

  let snapshotId = chainProposal.value1.snapshotId;
  let snapshot = Snapshot.load(snapshotId.toHexString());
  if (snapshot == null) {
    snapshot = new Snapshot(snapshotId.toHexString());
    let paiSupplyRes = paiToken.try_totalSupplyAt(snapshotId);
    if (paiSupplyRes.reverted) {
      log.info("snapshot pai supply failed", [
        proposal.id,
        snapshotId.toString(),
      ]);
      snapshot.paiSupply = BigDecimal.fromString("0");
    } else {
      snapshot.paiSupply = convertEthToDecimal(paiSupplyRes.value as BigInt);
    }

    let pollenSupplyRes = pollenToken.try_totalSupplyAt(snapshotId);
    if (pollenSupplyRes.reverted) {
      log.info("snapshot pollen supply failed", [
        proposal.id,
        snapshotId.toString(),
      ]);
      snapshot.pollenSupply = BigDecimal.fromString("0");
    } else {
      snapshot.pollenSupply = convertEthToDecimal(
        pollenSupplyRes.value as BigInt
      );
    }

    let reserveBalance = tryBalanceOfAt(pollenToken, snapshotId, reservePool);
    let foundationBalance = tryBalanceOfAt(
      pollenToken,
      snapshotId,
      foundationWallet
    );
    let foundersBalance = tryBalanceOfAt(
      pollenToken,
      snapshotId,
      foundersWallet
    );

    let effectiveSupply = snapshot.pollenSupply
      .minus(reserveBalance)
      .minus(foundationBalance)
      .minus(foundersBalance);

    snapshot.pollenEffectiveVoteSupply = effectiveSupply;

    snapshot.save();
  }
  proposal.snapshot = snapshot.id;

  // Voter
  let id = getVoterId(proposal.id, event.params.submitter.toHexString());
  let senderVotes = tryBalanceOfAt(
    pollenToken,
    snapshotId,
    event.params.submitter.toHexString()
  );

  let vote = new Voter(id);
  proposal.voters = [vote.id];

  vote.address = event.params.submitter;
  vote.votes = senderVotes;
  vote.inFavour = true;

  vote.save();

  proposal.yesVotes = convertEthToDecimal(proposalState.yesVotes as BigInt);
  proposal.noVotes = convertEthToDecimal(proposalState.noVotes as BigInt);
  proposal.status = getProposalStatus(proposalState.status);
  proposal.passVotes = convertEthToDecimal(chainProposal.value1.passVotes);

  if (
    proposal.yesVotes > proposal.noVotes &&
    proposal.yesVotes > proposal.passVotes
  ) {
    proposal.votePassed = true;
  } else {
    proposal.votePassed = false;
  }

  proposal.votingExpiry = convertSolTimestampToJs(
    chainProposal.value1.votingExpiry
  );
  proposal.executionOpen = convertSolTimestampToJs(
    chainProposal.value1.executionOpen
  );
  proposal.executionExpiry = convertSolTimestampToJs(
    chainProposal.value1.executionExpiry
  );
  proposal.save();

  let portfolio = getOrCreatePortfolio();

  // @ts-ignore
  portfolio.contract = event.address;
  if (!portfolio.assets.includes(assetToken.id)) {
    portfolio.assets = portfolio.assets.concat([assetToken.id]);
  }
  portfolio.save();
}

export function handleVotedOn(event: VotedOn): void {
  let proposal = Proposal.load(event.params.proposalId.toString());
  if (proposal != null) {
    // @ts-ignore
    let contract = PollenDAO.bind(event.address);
    let proposalState = contract.getProposal(event.params.proposalId).value2;
    proposal.yesVotes = convertEthToDecimal(proposalState.yesVotes as BigInt);
    proposal.noVotes = convertEthToDecimal(proposalState.noVotes as BigInt);
    proposal.status = getProposalStatus(proposalState.status);
    let id = getVoterId(proposal.id, event.params.voter.toHexString());

    let voter = Voter.load(id);
    if (voter == null) {
      voter = new Voter(id);
      proposal.voters = proposal.voters.concat([voter.id]);
    }
    voter.address = event.params.voter;
    voter.votes = convertEthToDecimal(event.params.votes);
    voter.inFavour = event.params.vote;

    voter.save();
    proposal.save();
  }
}

export function handleExecuted(event: Executed): void {
  let proposal = Proposal.load(event.params.proposalId.toString());
  proposal.status = ProposalStatus.Executed;
  let convertedAmount = convertEthToDecimal(event.params.amount);
  if (proposal.baseCurrency == BaseCcyType.Asset) {
    proposal.paiAmount = convertedAmount;
  } else {
    proposal.assetTokenAmount = convertedAmount;
  }
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
  let portfolio = getOrCreatePortfolio();
  // @ts-ignore
  portfolio.contract = event.address;
  if (!portfolio.assets.includes(assetToken.id)) {
    portfolio.assets = portfolio.assets.concat([assetToken.id]);
  }
  portfolio.save();
}

export function handleRedeemed(event: Redeemed): void {
  Portfolio.load(constId).assets.forEach((tokenId) => {
    let assetToken = AssetToken.load(tokenId);
    let assetContract = GenericERC20.bind(Address.fromString(assetToken.id));
    let contractStr = Portfolio.load(constId).contract.toHexString();
    assetToken.daoBalance = convertEthToDecimal(
      assetContract.balanceOf(Address.fromString(contractStr))
    );
    assetToken.save();
  });
}

export function handlePointsRewarded(event: PointsRewarded): void {
  if (!initComplete) {
    init();
  }
  let member = getOrCreateMember(event.params.member.toHexString());
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();
  let reward = new EarnedReward(id);
  let newTotal = event.params.points.plus(member.reputation);
  reward.points = event.params.points;
  reward.type = getRewardKind(event.params.kind);
  reward.earnedAt = convertSolTimestampToJs(event.block.timestamp);
  reward.save();

  member.reputation = newTotal;
  member.rewards = member.rewards.concat([reward.id]);
  member.save();
}

export function handlePollenWithdrawal(event: RewardWithdrawal): void {
  let member = getOrCreateMember(event.params.member.toHexString());
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();
  let withdrawal = new PollenWithdrawalItem(id);
  let decimalAmount = convertEthToDecimal(event.params.amount);
  let newTotal = decimalAmount.plus(member.totalWithdrawn);
  member.totalWithdrawn = newTotal;
  withdrawal.date = convertSolTimestampToJs(event.block.timestamp);
  withdrawal.amount = decimalAmount;
  member.withdrawals = member.withdrawals.concat([withdrawal.id]);
  member.save();
}

export function handleTermsSwitched(event: VotingTermsSwitched): void {
  let proposalTerms = ProposalTerm.load(event.params.termsId.toString());
  if (proposalTerms == null) {
    proposalTerms = new ProposalTerm(event.params.termsId.toString());
    let contract = PollenDAO.bind(event.address);
    let terms = contract.getVotingTerms(event.params.termsId);
    proposalTerms.isEnabled = terms.isEnabled;
    proposalTerms.isExclPools = terms.isEnabled;
    proposalTerms.votingExpiryDelay = terms.votingExpiryDelay;
    proposalTerms.quorum = BigInt.fromI32(terms.quorum);
    proposalTerms.executionExpiryDelay = terms.executionExpiryDelay;
    proposalTerms.executionOpenDelay = terms.executionOpenDelay;
    proposalTerms.save();
  }
}

export function handleDelegated(event: Delegated): void {
  let delegator = getOrCreateMember(event.params.account.toHexString());
  let delegatee = getOrCreateMember(event.params.to.toHexString());
  if (!delegatee.delegators.includes(delegator.id)) {
    delegatee.delegators = delegatee.delegators.concat([delegator.id]);
  }
  delegator.delegatingTo = event.params.to;
  delegator.save();
  delegatee.save();
}

export function handleUndelegated(event: Undelegated): void {
  let delegator = getOrCreateMember(event.params.account.toHexString());
  let delegatee = getOrCreateMember(event.params.from.toHexString());
  let index = delegatee.delegators.indexOf(delegator.id);
  if (index !== -1) {
    let delegators = delegatee.delegators;
    delegators.splice(index, 1);
    delegatee.delegators = delegators;
  }
  delegator.delegatingTo = null;
  delegatee.save();
  delegator.save();
}

export function handleAssetRemoved(event: AssetRemoved): void {
  let assetToken = AssetToken.load(event.params.asset.toHexString());

  if (assetToken != null) {
    let portfolio = Portfolio.load(constId);
    if (portfolio != null) {
      let portfolioIndex = portfolio.assets.indexOf(assetToken.id);
      if (portfolioIndex !== -1) {
        let assets = portfolio.assets;
        assets.splice(portfolioIndex, 1);
        portfolio.assets = assets;
      }
      portfolio.save();
    }
  }
}

function getOrCreateMember(address: string): Member {
  let member = Member.load(address);
  if (member == null) {
    member = new Member(address);
    member.reputation = BigInt.fromI32(0);
    member.totalWithdrawn = BigDecimal.fromString("0");
    member.delegators = [];
  }
  return member as Member;
}

function getOrCreatePortfolio(): Portfolio {
  let portfolio = Portfolio.load(constId);
  if (portfolio == null) {
    portfolio = new Portfolio(constId);
  }
  return portfolio as Portfolio;
}
