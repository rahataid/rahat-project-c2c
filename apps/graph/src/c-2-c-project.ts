import {
  BeneficiaryAdded as BeneficiaryAddedEvent,
  BeneficiaryRemoved as BeneficiaryRemovedEvent,
  ClaimAssigned as ClaimAssignedEvent,
  ClaimProcessed as ClaimProcessedEvent,
  ProjectLocked as ProjectLockedEvent,
  ProjectUnlocked as ProjectUnlockedEvent,
  TokenBudgetDecrease as TokenBudgetDecreaseEvent,
  TokenBudgetIncrease as TokenBudgetIncreaseEvent,
  TokenReceived as TokenReceivedEvent,
  TokenRegistered as TokenRegisteredEvent,
  TokenTransfer as TokenTransferEvent,
} from "../generated/C2CProject/C2CProject"
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
  TokenTransfer,
} from "../generated/schema"

export function handleBeneficiaryAdded(event: BeneficiaryAddedEvent): void {
  let entity = new BeneficiaryAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.param0 = event.params.param0

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBeneficiaryRemoved(event: BeneficiaryRemovedEvent): void {
  let entity = new BeneficiaryRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.param0 = event.params.param0

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleClaimAssigned(event: ClaimAssignedEvent): void {
  let entity = new ClaimAssigned(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity._beneficiary = event.params._beneficiary
  entity._amount = event.params._amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleClaimProcessed(event: ClaimProcessedEvent): void {
  let entity = new ClaimProcessed(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity._beneficiary = event.params._beneficiary
  entity._tokenAddress = event.params._tokenAddress
  entity._amount = event.params._amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProjectLocked(event: ProjectLockedEvent): void {
  let entity = new ProjectLocked(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProjectUnlocked(event: ProjectUnlockedEvent): void {
  let entity = new ProjectUnlocked(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenBudgetDecrease(
  event: TokenBudgetDecreaseEvent,
): void {
  let entity = new TokenBudgetDecrease(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.tokenAddress = event.params.tokenAddress
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenBudgetIncrease(
  event: TokenBudgetIncreaseEvent,
): void {
  let entity = new TokenBudgetIncrease(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.tokenAddress = event.params.tokenAddress
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenReceived(event: TokenReceivedEvent): void {
  let entity = new TokenReceived(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.token = event.params.token
  entity.from = event.params.from
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenRegistered(event: TokenRegisteredEvent): void {
  let entity = new TokenRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.tokenAddress = event.params.tokenAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenTransfer(event: TokenTransferEvent): void {
  let entity = new TokenTransfer(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.token = event.params.token
  entity.to = event.params.to
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
