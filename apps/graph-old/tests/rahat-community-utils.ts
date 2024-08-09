import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  BeneficiaryAdded,
  BeneficiaryRemoved,
  ProjectApprovalRequest,
  ProjectApproved,
  ProjectRevoked,
  Received,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked
} from "../generated/RahatCommunity/RahatCommunity"

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

export function createProjectApprovalRequestEvent(
  requestor: Address,
  project: Address
): ProjectApprovalRequest {
  let projectApprovalRequestEvent = changetype<ProjectApprovalRequest>(
    newMockEvent()
  )

  projectApprovalRequestEvent.parameters = new Array()

  projectApprovalRequestEvent.parameters.push(
    new ethereum.EventParam("requestor", ethereum.Value.fromAddress(requestor))
  )
  projectApprovalRequestEvent.parameters.push(
    new ethereum.EventParam("project", ethereum.Value.fromAddress(project))
  )

  return projectApprovalRequestEvent
}

export function createProjectApprovedEvent(param0: Address): ProjectApproved {
  let projectApprovedEvent = changetype<ProjectApproved>(newMockEvent())

  projectApprovedEvent.parameters = new Array()

  projectApprovedEvent.parameters.push(
    new ethereum.EventParam("param0", ethereum.Value.fromAddress(param0))
  )

  return projectApprovedEvent
}

export function createProjectRevokedEvent(param0: Address): ProjectRevoked {
  let projectRevokedEvent = changetype<ProjectRevoked>(newMockEvent())

  projectRevokedEvent.parameters = new Array()

  projectRevokedEvent.parameters.push(
    new ethereum.EventParam("param0", ethereum.Value.fromAddress(param0))
  )

  return projectRevokedEvent
}

export function createReceivedEvent(param0: Address, param1: BigInt): Received {
  let receivedEvent = changetype<Received>(newMockEvent())

  receivedEvent.parameters = new Array()

  receivedEvent.parameters.push(
    new ethereum.EventParam("param0", ethereum.Value.fromAddress(param0))
  )
  receivedEvent.parameters.push(
    new ethereum.EventParam("param1", ethereum.Value.fromUnsignedBigInt(param1))
  )

  return receivedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}
