# Solidity API

## IC2CProject

### TransferProcessed

```solidity
event TransferProcessed(address _tokenAddress, address _to, address _from, uint256 _amount)
```

_Emitted when a claim is processed._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenAddress | address | The address of the token. |
| _to | address | The address of the beneficiary. |
| _from | address | The address of the donor. |
| _amount | uint256 | The amount of tokens processed. |

### isDonor

```solidity
function isDonor(address _address) external returns (bool)
```

_Checks if the given address is a donor._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | The address to check. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | A boolean value indicating whether the address is a donor or not. |

### acceptToken

```solidity
function acceptToken(address _from, address _tokenAddress, uint256 _amount) external
```

_Allows the contract to accept tokens from a specified address._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _from | address | The address from which the tokens are being transferred. |
| _tokenAddress | address |  |
| _amount | uint256 | The amount of tokens being transferred. |

### withdrawToken

```solidity
function withdrawToken(address _tokenAddress, address _withdrawAddress) external
```

_Allows the user to withdraw tokens from the contract._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenAddress | address | The address of the token to be withdrawn. |
| _withdrawAddress | address |  |

### disburseProjectToken

```solidity
function disburseProjectToken(address _tokenAddress, address _beneficiary, uint256 _amount) external
```

_Processes a transfer of tokens to a beneficiary._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenAddress | address | The address of the token to be transferred. |
| _beneficiary | address | The address of the beneficiary. |
| _amount | uint256 | The amount of tokens to be transferred. |

