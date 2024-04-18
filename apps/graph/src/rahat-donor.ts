import {
  CloseStream as CloseStreamEvent,
  Deposit as DepositEvent,
  ExecuteTransaction as ExecuteTransactionEvent,
  OpenStream as OpenStreamEvent,
  Owner as OwnerEvent,
  Withdraw as WithdrawEvent
} from "../generated/RahatDonor/RahatDonor"
import {
  CloseStream,
  Deposit,
  ExecuteTransaction,
  OpenStream,
  Owner,
  Withdraw
} from "../generated/schema"

export function handleCloseStream(event: CloseStreamEvent): void {
  let entity = new CloseStream(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.to = event.params.to

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDeposit(event: DepositEvent): void {
  let entity = new Deposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.amount = event.params.amount
  entity.balance = event.params.balance

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleExecuteTransaction(event: ExecuteTransactionEvent): void {
  let entity = new ExecuteTransaction(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.to = event.params.to
  entity.value = event.params.value
  entity.data = event.params.data
  entity.nonce = event.params.nonce
  entity.hash = event.params.hash
  entity.result = event.params.result

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOpenStream(event: OpenStreamEvent): void {
  let entity = new OpenStream(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.to = event.params.to
  entity.amount = event.params.amount
  entity.frequency = event.params.frequency

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwner(event: OwnerEvent): void {
  let entity = new Owner(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.added = event.params.added

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdraw(event: WithdrawEvent): void {
  let entity = new Withdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.to = event.params.to
  entity.amount = event.params.amount
  entity.reason = event.params.reason

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
