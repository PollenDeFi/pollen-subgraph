import { BigInt } from "@graphprotocol/graph-ts"
import {
  PollenDAO,
  Executed,
  Redeemed,
  Submitted,
  VotedOn
} from "../generated/Pollen/PollenDAO"
import { Proposal } from "../generated/schema"

export function handleSubmitted(event: Submitted): void {
  let proposal = Proposal.load(event.params.proposalId.toHex());
  // @ts-ignore
  // let contract = Contract.bind(event.address);
  // let proposalResult = contract.try_getProposal(event.params.proposalId)
  // if (proposalResult.reverted) {
  //   log.info("getGravatar reverted", [])
  // } else {
  //   let owner = proposalResult.value
  // }
  // proposal.proposalType = event.params.proposalType;
  // proposal.assetTokenType = event.params.assetTokenType;
  // proposal.assetTokenAddress = event.params.assetTokenAddress;
  // proposal.assetTokenAmount = event.params.assetTokenAmount;
  // proposal.pollenAmount = event.params.pollenAmount;
  // proposal.submitter = event.address;
  // proposal.yesVotes = ;
  // proposal.noVotes = BigInt.fromI32(0);
  proposal.status = "Submitted";
  proposal.save();
}

export function handleVotedOn(event: VotedOn): void {
  let proposal = Proposal.load(event.params.proposalId.toHex());

  proposal.status = "VotedOn";
  proposal.save();
}

export function handleExecuted(event: Executed): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let proposal = Proposal.load(event.params.proposalId.toHex());

  proposal.status = "Executed";
  proposal.save();

  // // Entities only exist after they have been saved to the store;
  // // `null` checks allow to create entities on demand
  // if (entity == null) {
  //   entity = new ExampleEntity(event.transaction.from.toHex())

  //   // Entity fields can be set using simple assignments
  //   entity.count = BigInt.fromI32(0)
  // }

  // // BigInt and BigDecimal math are supported
  // entity.count = entity.count + BigInt.fromI32(1)

  // // Entity fields can be set based on event parameters
  // entity.proposalType = event.params.proposalType
  // entity.executor = event.params.executor

  // // Entities can be written to the store with `.save()`
  // entity.save()

  // // Note: If a handler doesn't require existing field values, it is faster
  // // _not_ to load the entity from the store. Instead, create it fresh with
  // // `new Entity(...)`, set the fields that should be updated and save the
  // // entity back to the store. Fields that were not set or unset remain
  // // unchanged, allowing for partial updates to be applied.

  // // It is also possible to access smart contracts from mappings. For
  // // example, the contract that has emitted the event can be connected to
  // // with:
  // //
  // // let contract = Contract.bind(event.address)
  // //
  // // The following functions can then be called on this contract to access
  // // state variables and other data:
  // //
  // // - contract.getPollenAddress(...)
  // // - contract.getProposal(...)
  // // - contract.getVoterState(...)
  // // - contract.getProposalCount(...)
  // // - contract.getAssets(...)
  // // - contract.getVotingExpiryDelay(...)
  // // - contract.getExecutionOpenDelay(...)
  // // - contract.getExecutionExpiryDelay(...)
  // // - contract.getQuorum(...)
}

export function handleRedeemed(event: Redeemed): void {}

