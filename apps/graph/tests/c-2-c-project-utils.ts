import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  BeneficiaryAdded,
  BeneficiaryRemoved,
  ClaimAssigned,
  ClaimProcessed,
  ProjectLocked,
  ProjectUnlocked,
  TokenBudgetDecrease,
  TokenBudgetIncrease,
  TokenReceived,
  TokenRegistered,
  TokenTransfer
} from "../generated/C2CProject/C2CProject"

export function createBeneficiaryAddedEvent(param0: Address): BeneficiaryAdded {
  let beneficiaryAddedEvent = changetype<BeneficiaryAdded>(newMockEvent())

  beneficiaryAddedEvent.parameters = new Array()

  beneficiaryAddedEvent.parameters.push(
    new ethereum.EventParam("param0", ethereum.Value.fromAddress(param0))
  )

  return beneficiaryAddedEvent
}

export function createBeneficiaryRemovedEvent(
  param0: Address
): BeneficiaryRemoved {
  let beneficiaryRemovedEvent = changetype<BeneficiaryRemoved>(newMockEvent())

  beneficiaryRemovedEvent.parameters = new Array()

  beneficiaryRemovedEvent.parameters.push(
    new ethereum.EventParam("param0", ethereum.Value.fromAddress(param0))
  )

  return beneficiaryRemovedEvent
}

export function createClaimAssignedEvent(
  _beneficiary: Address,
  _amount: BigInt
): ClaimAssigned {
  let claimAssignedEvent = changetype<ClaimAssigned>(newMockEvent())

  claimAssignedEvent.parameters = new Array()

  claimAssignedEvent.parameters.push(
    new ethereum.EventParam(
      "_beneficiary",
      ethereum.Value.fromAddress(_beneficiary)
    )
  )
  claimAssignedEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )

  return claimAssignedEvent
}

export function createClaimProcessedEvent(
  _beneficiary: Address,
  _tokenAddress: Address,
  _amount: BigInt
): ClaimProcessed {
  let claimProcessedEvent = changetype<ClaimProcessed>(newMockEvent())

  claimProcessedEvent.parameters = new Array()

  claimProcessedEvent.parameters.push(
    new ethereum.EventParam(
      "_beneficiary",
      ethereum.Value.fromAddress(_beneficiary)
    )
  )
  claimProcessedEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenAddress",
      ethereum.Value.fromAddress(_tokenAddress)
    )
  )
  claimProcessedEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )

  return claimProcessedEvent
}

export function createProjectLockedEvent(): ProjectLocked {
  let projectLockedEvent = changetype<ProjectLocked>(newMockEvent())

  projectLockedEvent.parameters = new Array()

  return projectLockedEvent
}

export function createProjectUnlockedEvent(): ProjectUnlocked {
  let projectUnlockedEvent = changetype<ProjectUnlocked>(newMockEvent())

  projectUnlockedEvent.parameters = new Array()

  return projectUnlockedEvent
}

export function createTokenBudgetDecreaseEvent(
  tokenAddress: Address,
  amount: BigInt
): TokenBudgetDecrease {
  let tokenBudgetDecreaseEvent = changetype<TokenBudgetDecrease>(newMockEvent())

  tokenBudgetDecreaseEvent.parameters = new Array()

  tokenBudgetDecreaseEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )
  tokenBudgetDecreaseEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return tokenBudgetDecreaseEvent
}

export function createTokenBudgetIncreaseEvent(
  tokenAddress: Address,
  amount: BigInt
): TokenBudgetIncrease {
  let tokenBudgetIncreaseEvent = changetype<TokenBudgetIncrease>(newMockEvent())

  tokenBudgetIncreaseEvent.parameters = new Array()

  tokenBudgetIncreaseEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )
  tokenBudgetIncreaseEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return tokenBudgetIncreaseEvent
}

export function createTokenReceivedEvent(
  token: Address,
  from: Address,
  amount: BigInt
): TokenReceived {
  let tokenReceivedEvent = changetype<TokenReceived>(newMockEvent())

  tokenReceivedEvent.parameters = new Array()

  tokenReceivedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  tokenReceivedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  tokenReceivedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return tokenReceivedEvent
}

export function createTokenRegisteredEvent(
  tokenAddress: Address
): TokenRegistered {
  let tokenRegisteredEvent = changetype<TokenRegistered>(newMockEvent())

  tokenRegisteredEvent.parameters = new Array()

  tokenRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )

  return tokenRegisteredEvent
}

export function createTokenTransferEvent(
  token: Address,
  to: Address,
  amount: BigInt
): TokenTransfer {
  let tokenTransferEvent = changetype<TokenTransfer>(newMockEvent())

  tokenTransferEvent.parameters = new Array()

  tokenTransferEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  tokenTransferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  tokenTransferEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return tokenTransferEvent
}