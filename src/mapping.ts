import { BigInt, ipfs, Address, BigDecimal } from "@graphprotocol/graph-ts";
import {
  PollenDAO,
  AssetAdded,
  Executed,
  Redeemed,
  Submitted,
  VotedOn,
} from "../generated/Pollen/PollenDAO";
import { PollenToken } from "../generated/Pollen/PollenToken";
import { GenericERC20 } from "../generated/Pollen/GenericERC20";
import {
  Proposal,
  AssetToken,
  Portfolio,
  Snapshot,
  Governance,
  EarnableReward,
  EarnedReward,
  GovTokenHoldings,
} from "../generated/schema";
import {
  getProposalType,
  getTokenType,
  getProposalStatus,
  getRewardType,
  convertEthToDecimal,
  convertSolTimestampToJs,
  calculateVoteQuota,
  TokenType,
  ProposalStatus,
} from "./helpers";

const constId = "0";

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

  let portfolio = Portfolio.load(constId);
  if (portfolio == null) {
    portfolio = new Portfolio(constId);
  }
  // @ts-ignore
  portfolio.contract = event.address;
  if (!portfolio.assets.includes(assetToken.id)) {
    portfolio.assets = portfolio.assets.concat([assetToken.id]);
  }
  portfolio.save();
}

let init = false;

export function handleSubmitted(event: Submitted): void {
  // TODO: remove stubs
  // stub start
  if (!init) {
    init = true;
    let governance = new Governance(constId);

    let earnableReward0 = new EarnableReward("0");
    earnableReward0.type = getRewardType(0);
    earnableReward0.amount = BigDecimal.fromString("2");
    earnableReward0.save();
    let earnableReward1 = new EarnableReward("1");
    earnableReward1.type = getRewardType(1);
    earnableReward1.amount = BigDecimal.fromString("10");
    earnableReward1.save();
    let earnableReward2 = new EarnableReward("2");
    earnableReward2.type = getRewardType(2);
    earnableReward2.amount = BigDecimal.fromString("1");
    earnableReward2.save();

    let reward0 = new EarnedReward("0");
    reward0.receiver = Address.fromString('0x4E9f4fe37B5ddE44a80E30C5D2b4EBc386231506');
    reward0.amount = BigDecimal.fromString('10');
    reward0.distributed = true;
    reward0.type = getRewardType(1);
    reward0.earnedAt = BigInt.fromI32(1606558701);
    reward0.save();
    let reward1 = new EarnedReward("1");
    reward1.receiver = Address.fromString('0xF3cdb8Ff872c4c3151da9eC41C96FbD3E9C29746');
    reward1.amount = BigDecimal.fromString('1');
    reward1.type = getRewardType(2);
    reward1.earnedAt = BigInt.fromI32(1606558501);
    reward1.distributed = false;
    reward1.save();
    let reward2 = new EarnedReward("2");
    reward2.receiver = Address.fromString('0x4E9f4fe37B5ddE44a80E30C5D2b4EBc386231506');
    reward2.amount = BigDecimal.fromString('2');
    reward2.type = getRewardType(0);
    reward2.earnedAt = BigInt.fromI32(1606548701);
    reward2.distributed = true;
    reward2.save();
    let reward3 = new EarnedReward("3");
    reward3.receiver = Address.fromString('0x4E9f4fe37B5ddE44a80E30C5D2b4EBc386231506');
    reward3.amount = BigDecimal.fromString('10');
    reward3.type = getRewardType(1);
    reward3.earnedAt = BigInt.fromI32(1606548751);
    reward3.distributed = true;
    reward3.save();
    let reward4 = new EarnedReward("4");
    reward4.receiver = Address.fromString('0xF3cdb8Ff872c4c3151da9eC41C96FbD3E9C29746');
    reward4.amount = BigDecimal.fromString('1');
    reward4.type = getRewardType(2);
    reward4.earnedAt = BigInt.fromI32(1606548751);
    reward4.distributed = true;
    reward4.save();
    let reward5 = new EarnedReward("5");
    reward5.receiver = Address.fromString('0xF3cdb8Ff872c4c3151da9eC41C96FbD3E9C29746');
    reward5.amount = BigDecimal.fromString('2');
    reward5.type = getRewardType(0);
    reward5.earnedAt = BigInt.fromI32(1606548751);
    reward5.distributed = false;
    reward5.save();
    let reward6 = new EarnedReward("6");
    reward6.receiver = Address.fromString('0x4E9f4fe37B5ddE44a80E30C5D2b4EBc386231506');
    reward6.amount = BigDecimal.fromString('1');
    reward6.type = getRewardType(2);
    reward6.earnedAt = BigInt.fromI32(1606548751);
    reward6.distributed = true;
    reward6.save();

    let holding0 = new GovTokenHoldings(Address.fromString('0x4E9f4fe37B5ddE44a80E30C5D2b4EBc386231506').toHexString());
    holding0.awaitingDistribution = BigDecimal.fromString('40');
    holding0.totalDistributed = BigDecimal.fromString('8955');
    holding0.save();

    let holding1 = new GovTokenHoldings(Address.fromString('0xF3cdb8Ff872c4c3151da9eC41C96FbD3E9C29746').toHexString());
    holding1.awaitingDistribution = BigDecimal.fromString('590');
    holding1.totalDistributed = BigDecimal.fromString('6225');
    holding1.save();


    governance.earnableRewards = governance.earnableRewards.concat([earnableReward0.id]);
    governance.earnableRewards = governance.earnableRewards.concat([earnableReward1.id]);
    governance.earnableRewards = governance.earnableRewards.concat([earnableReward2.id]);

    governance.earnedRewards = governance.earnedRewards.concat([reward0.id]);
    governance.earnedRewards = governance.earnedRewards.concat([reward1.id]);
    governance.earnedRewards = governance.earnedRewards.concat([reward2.id]);
    governance.earnedRewards = governance.earnedRewards.concat([reward3.id]);
    governance.earnedRewards = governance.earnedRewards.concat([reward4.id]);
    governance.earnedRewards = governance.earnedRewards.concat([reward5.id]);
    governance.earnedRewards = governance.earnedRewards.concat([reward6.id]);

    governance.awaitingDistribution = BigDecimal.fromString('1504');
    governance.totalDistributed = BigDecimal.fromString('68845');

    governance.holdings = governance.holdings.concat([holding0.id]);
    governance.holdings = governance.holdings.concat([holding1.id]);
    
    governance.save();
  }
  // stub end

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
  let portfolio = Portfolio.load(constId);
  if (portfolio == null) {
    portfolio = new Portfolio(constId);
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
  let portfolio = Portfolio.load(constId);
  if (portfolio == null) {
    portfolio = new Portfolio(constId);
  }
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
