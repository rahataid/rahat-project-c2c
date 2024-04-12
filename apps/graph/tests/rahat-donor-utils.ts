import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  CloseStream,
  Deposit,
  ExecuteTransaction,
  OpenStream,
  Owner,
  Withdraw
} from "../generated/RahatDonor/RahatDonor"

export function createCloseStreamEvent(to: Address): CloseStream {
  let closeStreamEvent = changetype<CloseStream>(newMockEvent())

  closeStreamEvent.parameters = new Array()

  closeStreamEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return closeStreamEvent
}

export function createDepositEvent(
  sender: Address,
  amount: BigInt,
  balance: BigInt
): Deposit {
  let depositEvent = changetype<Deposit>(newMockEvent())

  depositEvent.parameters = new Array()

  depositEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam(
      "balance",
      ethereum.Value.fromUnsignedBigInt(balance)
    )
  )

  return depositEvent
}

export function createExecuteTransactionEvent(
  owner: Address,
  to: Address,
  value: BigInt,
  data: Bytes,
  nonce: BigInt,
  hash: Bytes,
  result: Bytes
): ExecuteTransaction {
  let executeTransactionEvent = changetype<ExecuteTransaction>(newMockEvent())

  executeTransactionEvent.parameters = new Array()

  executeTransactionEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  executeTransactionEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  executeTransactionEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )
  executeTransactionEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )
  executeTransactionEvent.parameters.push(
    new ethereum.EventParam("nonce", ethereum.Value.fromUnsignedBigInt(nonce))
  )
  executeTransactionEvent.parameters.push(
    new ethereum.EventParam("hash", ethereum.Value.fromFixedBytes(hash))
  )
  executeTransactionEvent.parameters.push(
    new ethereum.EventParam("result", ethereum.Value.fromBytes(result))
  )

  return executeTransactionEvent
}

export function createOpenStreamEvent(
  to: Address,
  amount: BigInt,
  frequency: BigInt
): OpenStream {
  let openStreamEvent = changetype<OpenStream>(newMockEvent())

  openStreamEvent.parameters = new Array()

  openStreamEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  openStreamEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  openStreamEvent.parameters.push(
    new ethereum.EventParam(
      "frequency",
      ethereum.Value.fromUnsignedBigInt(frequency)
    )
  )

  return openStreamEvent
}

export function createOwnerEvent(owner: Address, added: boolean): Owner {
  let ownerEvent = changetype<Owner>(newMockEvent())

  ownerEvent.parameters = new Array()

  ownerEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  ownerEvent.parameters.push(
    new ethereum.EventParam("added", ethereum.Value.fromBoolean(added))
  )

  return ownerEvent
}

export function createWithdrawEvent(
  to: Address,
  amount: BigInt,
  reason: string
): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent())

  withdrawEvent.parameters = new Array()

  withdrawEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("reason", ethereum.Value.fromString(reason))
  )

  return withdrawEvent
}
