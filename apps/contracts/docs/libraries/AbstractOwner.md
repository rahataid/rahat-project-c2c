# Solidity API

## AbstractOwner

_This abstract contract manages ownership of the contract. It allows for adding and removing
owners, and provides modifiers to restrict access to certain functions to only owners._

### OwnerAdded

```solidity
event OwnerAdded(address)
```

### OwnerRemoved

```solidity
event OwnerRemoved(address)
```

### maxOwners

```solidity
uint256 maxOwners
```

### owners

```solidity
struct EnumerableSet.AddressSet owners
```

### OnlyOwner

```solidity
modifier OnlyOwner()
```

_Modifier that checks if the caller is an owner.
Requirements:
- The caller must be an owner._

### _addOwner

```solidity
function _addOwner(address _address) internal returns (bool success)
```

Adds an account to the owner role.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | The address of the new owner. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| success | bool | A boolean indicating if the operation was successful. Requirements: - The number of owners must not exceed the maximum limit. |

### addOwner

```solidity
function addOwner(address _address) public virtual returns (bool success)
```

Adds an account to the owner role.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | The address of the new owner. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| success | bool | A boolean indicating if the operation was successful. Requirements: - The caller must be an owner. |

### removeOwner

```solidity
function removeOwner(address _address) public virtual returns (bool success)
```

Removes an account from the owner role.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | The address of the existing owner to remove. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| success | bool | A boolean indicating if the operation was successful. Requirements: - The caller must be an owner. |

### ownerCount

```solidity
function ownerCount() public view returns (uint256)
```

_Returns the count of current owners._

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The number of owners. |

### isOwner

```solidity
function isOwner(address _address) public view returns (bool)
```

_Checks if a given address is an owner._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | The address to check. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if the address is an owner, false otherwise. |

### listOwners

```solidity
function listOwners() public view returns (address[])
```

_Lists all current owners._

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address[] | An array of addresses representing the current owners. |

