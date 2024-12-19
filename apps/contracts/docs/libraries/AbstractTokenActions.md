# Solidity API

## AbstractTokenActions

_This abstract contract provides functions for token management actions such as transferring,
approving, claiming, and querying token allowances and balances. It inherits from AbstractOwner
to enforce ownership restrictions on these actions._

### transferToken

```solidity
function transferToken(address _token, address _to, uint256 _amount) public virtual
```

_Transfers tokens from the contract to a specified address._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _token | address | The address of the token to transfer. |
| _to | address | The address to which the tokens will be sent. |
| _amount | uint256 | The amount of tokens to transfer. Requirements: - The caller must be the owner. |

### approveToken

```solidity
function approveToken(address _token, address _spender, uint256 _amount) public virtual
```

_Approves a spender to spend a specified amount of tokens on behalf of the contract._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _token | address | The address of the token to approve. |
| _spender | address | The address that will be allowed to spend the tokens. |
| _amount | uint256 | The amount of tokens to approve for spending. Requirements: - The caller must be the owner. |

### claimToken

```solidity
function claimToken(address _token, address _from, uint256 _amount) public virtual
```

_Claims tokens from a specified address to the contract._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _token | address | The address of the token to claim. |
| _from | address | The address from which the tokens will be claimed. |
| _amount | uint256 | The amount of tokens to claim. Requirements: - The caller must be the owner. |

### transferFromToken

```solidity
function transferFromToken(address _token, address _from, address _to, uint256 _amount) public virtual
```

_Transfers tokens from one address to another._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _token | address | The address of the token to transfer. |
| _from | address | The address from which the tokens will be transferred. |
| _to | address | The address to which the tokens will be sent. |
| _amount | uint256 | The amount of tokens to transfer. Requirements: - The caller must be the owner. |

### getAllowanceAndBalance

```solidity
function getAllowanceAndBalance(address _token, address _from) public view virtual returns (uint256 allowance, uint256 balance)
```

_Gets the allowance and balance of the contract for a specific token._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _token | address | The address of the token to query. |
| _from | address | The address for which the allowance is being checked. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| allowance | uint256 | The amount of tokens that the contract is allowed to spend on behalf of `_from`. |
| balance | uint256 | The balance of the contract for the specified token. |

