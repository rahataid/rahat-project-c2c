# Solidity API

## IOwner

_This interface defines the functions for managing ownership in a contract.
It allows for adding and removing owners, checking ownership status, and listing all owners._

### addOwner

```solidity
function addOwner(address _account) external returns (bool)
```

Adds a new owner to the contract.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _account | address | The address of the account to be added as an owner. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if the operation was successful, false otherwise. |

### removeOwner

```solidity
function removeOwner(address _account) external returns (bool)
```

Removes an existing owner from the contract.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _account | address | The address of the account to be removed as an owner. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if the operation was successful, false otherwise. |

### ownerCount

```solidity
function ownerCount() external view returns (uint256)
```

Returns the total number of owners in the contract.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The count of owners. |

### isOwner

```solidity
function isOwner(address _address) external view returns (bool)
```

Checks if a given address is an owner.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | The address to check for ownership. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if the address is an owner, false otherwise. |

### listOwners

```solidity
function listOwners() external view returns (address[])
```

Lists all current owners of the contract.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address[] | An array of addresses representing the current owners. |

