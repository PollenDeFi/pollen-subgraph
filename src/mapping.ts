import { BigInt, ipfs, Address, BigDecimal, log } from '@graphprotocol/graph-ts'
import {
  PollenDAO,
  AssetAdded,
  Executed,
  Redeemed,
  Submitted,
  VotedOn,
  PointsRewarded,
  RewardWithdrawal,
  VotingTermsSwitched,
} from '../generated/Pollen/PollenDAO'
import { PollenToken } from '../generated/Pollen/PollenToken'
import { StemToken } from '../generated/Pollen/StemToken'
import { GenericERC20 } from '../generated/Pollen/GenericERC20'
import {
  Proposal,
  AssetToken,
  Portfolio,
  Snapshot,
  CommunityRewards,
  EarnableReward,
  EarnedReward,
  Member,
  StemWithdrawal as StemWithdrawalItem,
  ProposalTerm,
  Voter,
} from '../generated/schema'
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
} from './helpers'

const constId = '0'

// TODO: Better management of network specific contracts

// Ropsten
const reservePool = '0xe67903512d7b24C187868edCE5886a4799311C0e'
const foundationWallet = '0x64662e7849A3cF25821777FF5e663755a4121C87'
const foundersWallet = '0xc45c40E871CAf671486517dEE4E05f9338cA1732'

// mainnet
// const reservePool = '0xf8617006b4CD2db7385c1cb613885f1292e51b2e'
// const foundationWallet = '0x30dDD235bEd94fdbCDc197513a638D6CAa261EC7'
// const foundersWallet = '0xd7Cc88bB603DceAFB5E8290d8188C8BF36fD742B'

let initComplete = false

function init(): void {
  initComplete = true

  let communityRewards = new CommunityRewards(constId)

  let earnableReward0 = new EarnableReward('0')
  earnableReward0.type = getRewardKind(0)
  earnableReward0.points = BigInt.fromI32(100)
  earnableReward0.save()
  let earnableReward1 = new EarnableReward('1')
  earnableReward1.type = getRewardKind(1)
  earnableReward1.points = BigInt.fromI32(300)
  earnableReward1.save()
  let earnableReward2 = new EarnableReward('2')
  earnableReward2.type = getRewardKind(2)
  earnableReward2.points = BigInt.fromI32(500)
  earnableReward2.save()
  let earnableReward3 = new EarnableReward('3')
  earnableReward3.type = getRewardKind(3)
  earnableReward3.points = BigInt.fromI32(100)
  earnableReward3.save()
  let earnableReward4 = new EarnableReward('4')
  earnableReward4.type = getRewardKind(4)
  earnableReward4.points = BigInt.fromI32(1)
  earnableReward4.save()

  communityRewards.earnableRewards = communityRewards.earnableRewards.concat([
    earnableReward0.id,
  ])
  communityRewards.earnableRewards = communityRewards.earnableRewards.concat([
    earnableReward1.id,
  ])
  communityRewards.earnableRewards = communityRewards.earnableRewards.concat([
    earnableReward2.id,
  ])
  communityRewards.earnableRewards = communityRewards.earnableRewards.concat([
    earnableReward3.id,
  ])
  communityRewards.earnableRewards = communityRewards.earnableRewards.concat([
    earnableReward4.id,
  ])

  communityRewards.save()
}

export function handleAssetAdded(event: AssetAdded): void {
  let assetToken = AssetToken.load(event.params.asset.toHexString())
  if (assetToken == null) {
    assetToken = new AssetToken(event.params.asset.toHexString())
  }
  let assetContract = GenericERC20.bind(Address.fromString(assetToken.id))
  assetToken.name = assetContract.name()
  assetToken.symbol = assetContract.symbol()
  // TODO: refactor types and include into addAsset event
  assetToken.type = TokenType.ERC20
  assetToken.daoBalance = convertEthToDecimal(
    // @ts-ignore
    assetContract.balanceOf(event.address)
  )
  assetToken.save()

  let portfolio = getOrCreatePortfolio()

  // @ts-ignore
  portfolio.contract = event.address
  if (!portfolio.assets.includes(assetToken.id)) {
    portfolio.assets = portfolio.assets.concat([assetToken.id])
  }
  portfolio.save()
}

export function handleSubmitted(event: Submitted): void {
  // @ts-ignore
  let contract = PollenDAO.bind(event.address)
  let pollenToken = PollenToken.bind(contract.getPollenAddress())
  let stemToken = StemToken.bind(contract.getStemAddress())
  let chainProposal = contract.getProposal(event.params.proposalId)
  let proposalState = contract.getProposalState(event.params.proposalId)

  let proposal = new Proposal(event.params.proposalId.toString())
  proposal.proposalType = getProposalType(chainProposal.value0.proposalType)

  let assetTokenType = getTokenType(chainProposal.value0.assetTokenType)
  let assetToken = AssetToken.load(
    chainProposal.value0.assetTokenAddress.toHexString()
  )
  if (assetToken == null) {
    assetToken = new AssetToken(
      chainProposal.value0.assetTokenAddress.toHexString()
    )
  }
  if (assetTokenType === TokenType.ERC20) {
    // TODO: update daoBalance on any ERC20 transfer event (separate mapping)
    let assetContract = GenericERC20.bind(
      chainProposal.value0.assetTokenAddress
    )
    assetToken.name = assetContract.name()
    assetToken.symbol = assetContract.symbol()
    assetToken.type = assetTokenType
    assetToken.daoBalance = convertEthToDecimal(
      // @ts-ignore
      assetContract.balanceOf(event.address)
    )
    assetToken.save()
  }
  proposal.assetToken = assetToken.id
  proposal.assetTokenAmount = convertEthToDecimal(
    chainProposal.value0.assetTokenAmount
  )
  proposal.orderType = getOrderType(chainProposal.value0.orderType)
  proposal.baseCurrency = getBaseCcyType(chainProposal.value0.baseCcyType)
  proposal.pollenAmount = convertEthToDecimal(chainProposal.value0.pollenAmount)
  proposal.description = ipfs.cat(chainProposal.value2).toString()
  proposal.submitter = chainProposal.value0.submitter

  let termsId = BigInt.fromI32(chainProposal.value0.votingTermsId)
  let terms = ProposalTerm.load(termsId.toString())
  proposal.terms = terms.id

  let snapshotId = chainProposal.value1.snapshotId
  let snapshot = Snapshot.load(snapshotId.toHexString())
  if (snapshot == null) {
    snapshot = new Snapshot(snapshotId.toHexString())
    let pollenSupplyRes = pollenToken.try_totalSupplyAt(snapshotId)
    if (pollenSupplyRes.reverted) {
      log.info('snapshot pollen supply failed', [
        proposal.id,
        snapshotId.toString(),
      ])
      snapshot.pollenSupply = BigDecimal.fromString('0')
    } else {
      snapshot.pollenSupply = convertEthToDecimal(
        pollenSupplyRes.value as BigInt
      )
    }

    let stemSupplyRes = stemToken.try_totalSupplyAt(snapshotId)
    if (stemSupplyRes.reverted) {
      log.info('snapshot stem supply failed', [
        proposal.id,
        snapshotId.toString(),
      ])
      snapshot.stemSupply = BigDecimal.fromString('0')
    } else {
      snapshot.stemSupply = convertEthToDecimal(stemSupplyRes.value as BigInt)
    }

    let reserveBalance = tryBalanceOfAt(stemToken, snapshotId, reservePool)
    let foundationBalance = tryBalanceOfAt(
      stemToken,
      snapshotId,
      foundationWallet
    )
    let foundersBalance = tryBalanceOfAt(stemToken, snapshotId, foundersWallet)

    let effectiveSupply = snapshot.stemSupply
      .minus(reserveBalance)
      .minus(foundationBalance)
      .minus(foundersBalance)

    snapshot.stemEffectiveVoteSupply = effectiveSupply

    snapshot.save()
  }
  proposal.snapshot = snapshot.id

  // Voter
  let id = getVoterId(proposal.id, event.params.submitter.toHexString())
  let senderVotes = tryBalanceOfAt(
    stemToken,
    snapshotId,
    event.params.submitter.toHexString()
  )

  let vote = new Voter(id)
  proposal.voters = [vote.id]

  vote.address = event.params.submitter
  vote.votes = senderVotes
  vote.inFavour = true

  vote.save()

  proposal.yesVotes = convertEthToDecimal(proposalState.yesVotes as BigInt)
  proposal.noVotes = convertEthToDecimal(proposalState.noVotes as BigInt)
  proposal.status = getProposalStatus(proposalState.status)
  proposal.passVotes = convertEthToDecimal(chainProposal.value1.passVotes)

  if (
    proposal.yesVotes > proposal.noVotes &&
    proposal.yesVotes > proposal.passVotes
  ) {
    proposal.votePassed = true
  } else {
    proposal.votePassed = false
  }

  proposal.votingExpiry = convertSolTimestampToJs(
    chainProposal.value1.votingExpiry
  )
  proposal.executionOpen = convertSolTimestampToJs(
    chainProposal.value1.executionOpen
  )
  proposal.executionExpiry = convertSolTimestampToJs(
    chainProposal.value1.executionExpiry
  )
  proposal.save()

  let portfolio = getOrCreatePortfolio()

  // @ts-ignore
  portfolio.contract = event.address
  if (!portfolio.assets.includes(assetToken.id)) {
    portfolio.assets = portfolio.assets.concat([assetToken.id])
  }
  portfolio.save()
}

export function handleVotedOn(event: VotedOn): void {
  let proposal = Proposal.load(event.params.proposalId.toString())
  if (proposal != null) {
    // @ts-ignore
    let contract = PollenDAO.bind(event.address)
    let proposalState = contract.getProposalState(event.params.proposalId)
    proposal.yesVotes = convertEthToDecimal(proposalState.yesVotes as BigInt)
    proposal.noVotes = convertEthToDecimal(proposalState.noVotes as BigInt)
    proposal.status = getProposalStatus(proposalState.status)
    let id = getVoterId(proposal.id, event.params.voter.toHexString())

    let voter = Voter.load(id)
    if (voter == null) {
      voter = new Voter(id)
      proposal.voters = proposal.voters.concat([voter.id])
    }
    voter.address = event.params.voter
    voter.votes = convertEthToDecimal(event.params.votes)
    voter.inFavour = event.params.vote

    voter.save()
    proposal.save()
  }
}

export function handleExecuted(event: Executed): void {
  let proposal = Proposal.load(event.params.proposalId.toString())
  proposal.status = ProposalStatus.Executed
  let convertedAmount = convertEthToDecimal(event.params.amount)
  if (proposal.baseCurrency == BaseCcyType.Asset) {
    proposal.pollenAmount = convertedAmount
  } else {
    proposal.assetTokenAmount = convertedAmount
  }
  // @ts-ignore
  proposal.executedAt = convertSolTimestampToJs(event.block.timestamp)
  proposal.save()
  let assetToken = AssetToken.load(proposal.assetToken)
  let assetContract = GenericERC20.bind(Address.fromString(assetToken.id))
  assetToken.daoBalance = convertEthToDecimal(
    // @ts-ignore
    assetContract.balanceOf(event.address)
  )
  assetToken.save()
  let portfolio = getOrCreatePortfolio()
  // @ts-ignore
  portfolio.contract = event.address
  if (!portfolio.assets.includes(assetToken.id)) {
    portfolio.assets = portfolio.assets.concat([assetToken.id])
  }
  portfolio.save()
}

export function handleRedeemed(event: Redeemed): void {
  Portfolio.load(constId).assets.forEach((tokenId) => {
    let assetToken = AssetToken.load(tokenId)
    let assetContract = GenericERC20.bind(Address.fromString(assetToken.id))
    let contractStr = Portfolio.load(constId).contract.toHexString()
    assetToken.daoBalance = convertEthToDecimal(
      assetContract.balanceOf(Address.fromString(contractStr))
    )
    assetToken.save()
  })
}

export function handlePointsRewarded(event: PointsRewarded): void {
  if (!initComplete) {
    init()
  }
  let memberRewards = Member.load(event.params.member.toHexString())
  if (memberRewards == null) {
    memberRewards = new Member(event.params.member.toHexString())
    memberRewards.totalPoints = BigInt.fromI32(0)
    memberRewards.totalWithdrawn = BigDecimal.fromString('0')
  }
  let id = event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  let reward = new EarnedReward(id)
  let newTotal = event.params.points.plus(memberRewards.totalPoints)
  reward.points = event.params.points
  reward.type = getRewardKind(event.params.kind)
  reward.earnedAt = convertSolTimestampToJs(event.block.timestamp)
  reward.save()

  memberRewards.totalPoints = newTotal
  memberRewards.rewards = memberRewards.rewards.concat([reward.id])
  memberRewards.save()
}

export function handleStemWithdrawal(event: RewardWithdrawal): void {
  let memberRewards = Member.load(event.params.member.toHexString())
  if (memberRewards == null) {
    memberRewards = new Member(event.params.member.toHexString())
    memberRewards.totalPoints = BigInt.fromI32(0)
    memberRewards.totalWithdrawn = BigDecimal.fromString('0')
  }
  let id = event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  let withdrawal = new StemWithdrawalItem(id)
  let decimalAmount = convertEthToDecimal(event.params.amount)
  let newTotal = decimalAmount.plus(memberRewards.totalWithdrawn)
  memberRewards.totalWithdrawn = newTotal
  withdrawal.date = convertSolTimestampToJs(event.block.timestamp)
  withdrawal.amount = decimalAmount
  memberRewards.withdrawals = memberRewards.withdrawals.concat([withdrawal.id])
  memberRewards.save()
}

export function handleTermsSwitched(event: VotingTermsSwitched): void {
  let proposalTerms = ProposalTerm.load(event.params.termsId.toString())
  if (proposalTerms == null) {
    proposalTerms = new ProposalTerm(event.params.termsId.toString())
    let contract = PollenDAO.bind(event.address)
    let terms = contract.getVotingTerms(event.params.termsId)
    proposalTerms.isEnabled = terms.isEnabled
    proposalTerms.isExclPools = terms.isEnabled
    proposalTerms.votingExpiryDelay = terms.votingExpiryDelay
    proposalTerms.quorum = BigInt.fromI32(terms.quorum)
    proposalTerms.executionExpiryDelay = terms.executionExpiryDelay
    proposalTerms.executionOpenDelay = terms.executionOpenDelay
    proposalTerms.save()
  }
}

function getOrCreatePortfolio(): Portfolio {
  let portfolio = Portfolio.load(constId)
  if (portfolio == null) {
    portfolio = new Portfolio(constId)
  }
  return portfolio as Portfolio
}
