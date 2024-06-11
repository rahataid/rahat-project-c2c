import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval,
  OwnerAdded,
  OwnerRemoved,
  Transfer
} from "../generated/RahatToken/RahatToken"

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return approvalEvent
}

export function createOwnerAddedEvent(param0: Address): OwnerAdded {
  let ownerAddedEvent = changetype<OwnerAdded>(newMockEvent())

  ownerAddedEvent.parameters = new Array()

  ownerAddedEvent.parameters.push(
    new ethereum.EventParam("param0", ethereum.Value.fromAddress(param0))
  )

  return ownerAddedEvent
}

export function createOwnerRemovedEvent(param0: Address): OwnerRemoved {
  let ownerRemovedEvent = changetype<OwnerRemoved>(newMockEvent())

  ownerRemovedEvent.parameters = new Array()

  ownerRemovedEvent.parameters.push(
    new ethereum.EventParam("param0", ethereum.Value.fromAddress(param0))
  )

  return ownerRemovedEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}
