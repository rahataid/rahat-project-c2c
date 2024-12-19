# Solidity API

## AbstractProject

_This abstract contract serves as a base for projects that manage beneficiaries and token budgets.
It implements the IRahatProject interface and extends the Multicall functionality.
The contract allows for adding/removing beneficiaries and managing budgets for registered tokens._

### BeneficiaryAdded

```solidity
event BeneficiaryAdded(address)
```

### BeneficiaryRemoved

```solidity
event BeneficiaryRemoved(address)
```

### TokenRegistered

```solidity
event TokenRegistered(address tokenAddress)
```

### TokenBudgetIncrease

```solidity
event TokenBudgetIncrease(address tokenAddress, uint256 amount)
```

### TokenBudgetDecrease

```solidity
event TokenBudgetDecrease(address tokenAddress, uint256 amount)
```

### TokenReceived

```solidity
event TokenReceived(address token, address from, uint256 amount)
```

### TokenTransfer

```solidity
event TokenTransfer(address token, address to, uint256 amount)
```

### name

```solidity
string name
```

Returns the name of the project.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |

### _beneficiaries

```solidity
struct EnumerableSet.AddressSet _beneficiaries
```

### constructor

```solidity
constructor(string _name) internal
```

### isBeneficiary

```solidity
function isBeneficiary(address _address) public view virtual returns (bool)
```

_Checks if an address is a beneficiary._

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
function beneficiaryCount() public view virtual returns (uint256)
```

_Returns the number of beneficiaries._

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The count of beneficiaries. |

### _addBeneficiary

```solidity
function _addBeneficiary(address _address) internal
```

_Adds a beneficiary address._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | The address to add as a beneficiary. |

### _removeBeneficiary

```solidity
function _removeBeneficiary(address _address) internal
```

_Removes a beneficiary address._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | The address to remove from beneficiaries. |

### tokenBudget

```solidity
function tokenBudget(address _tokenAddress) public view virtual returns (uint256)
```

_Returns the budget for a specific token address._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenAddress | address | The address of the token. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The budget allocated for the token. |

### _tokenBudgetIncrease

```solidity
function _tokenBudgetIncrease(address _tokenAddress, uint256 _amount) internal
```

_Increases the budget for a specific token address._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenAddress | address | The address of the token. |
| _amount | uint256 | The amount to increase the budget by. |

### _tokenBudgetDecrease

```solidity
function _tokenBudgetDecrease(address _tokenAddress, uint256 _amount) internal
```

_Decreases the budget for a specific token address._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenAddress | address | The address of the token. |
| _amount | uint256 | The amount to decrease the budget by. |

### _acceptToken

```solidity
function _acceptToken(address _tokenAddress, address _from, uint256 _amount) internal
```

_Accepts tokens from a specified address and updates the budget._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenAddress | address | The address of the token being accepted. |
| _from | address | The address from which the tokens are being transferred. |
| _amount | uint256 | The amount of tokens to accept. |

### _withdrawToken

```solidity
function _withdrawToken(address _tokenAddress, uint256 _amount, address _withdrawAddress) internal
```

_Withdraws tokens from the contract to a specified address._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenAddress | address | The address of the token to withdraw. |
| _amount | uint256 | The amount of tokens to withdraw. |
| _withdrawAddress | address | The address to which the tokens will be sent. |

