# Solidity API

## IRahatProject

_This interface defines the functions for managing a Rahat project, including
beneficiary management and token budget handling. It extends the IERC165 interface for interface detection._

### name

```solidity
function name() external view returns (string)
```

Returns the name of the project.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | string | The name of the project as a string. |

### addBeneficiary

```solidity
function addBeneficiary(address _address) external
```

Adds a new beneficiary to the project.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | The address of the beneficiary to add. |

### removeBeneficiary

```solidity
function removeBeneficiary(address _address) external
```

Removes an existing beneficiary from the project.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | The address of the beneficiary to remove. |

### isBeneficiary

```solidity
function isBeneficiary(address _address) external view returns (bool)
```

Checks if a given address is a beneficiary of the project.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | The address to check. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if the address is a beneficiary, false otherwise. |

### beneficiaryCount

```solidity
function beneficiaryCount() external view returns (uint256)
```

Returns the total number of beneficiaries in the project.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The count of beneficiaries. |

### tokenBudget

```solidity
function tokenBudget(address _tokenAddress) external view returns (uint256)
```

Returns the budget allocated for a specific token address.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenAddress | address | The address of the token to query. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The budget allocated for the specified token. |

