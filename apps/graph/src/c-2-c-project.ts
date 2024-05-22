import {
  BeneficiaryAdded as BeneficiaryAddedEvent,
  BeneficiaryRemoved as BeneficiaryRemovedEvent,
  ProjectLocked as ProjectLockedEvent,
  ProjectUnlocked as ProjectUnlockedEvent,
  TokenBudgetDecrease as TokenBudgetDecreaseEvent,
  TokenBudgetIncrease as TokenBudgetIncreaseEvent,
  TokenReceived as TokenReceivedEvent,
  TokenRegistered as TokenRegisteredEvent,
  TokenTransfer as TokenTransferEvent,
  TransferProcessed as TransferProcessedEvent,
} from "../generated/C2CProject/C2CProject"
import {
  BeneficiaryAdded,
  BeneficiaryRemoved,
  ProjectLocked,
  ProjectUnlocked,
  TokenBudgetDecrease,
  TokenBudgetIncrease,
  TokenReceived,
  TokenRegistered,
  TokenTransfer,
  TransferProcessed,
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

export function handleTransferProcessed(event: TransferProcessedEvent): void {
  let entity = new TransferProcessed(
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
