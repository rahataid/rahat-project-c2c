# Solidity API

## IRahatDonor

_This interface defines the functions for managing Rahat tokens within the donor contract.
It extends the IERC165 interface for interface detection._

### createToken

```solidity
function createToken(string _name, string _symbol, uint8 decimals) external
```

Creates a new token with the specified name, symbol, and decimals.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _name | string | The name of the token to be created. |
| _symbol | string | The symbol of the token to be created. |
| decimals | uint8 | The number of decimals for the token. |

### mintToken

```solidity
function mintToken(address _token, uint256 _amount) external
```

Mints a specified amount of tokens to the donor contract.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _token | address | The address of the token to mint. |
| _amount | uint256 | The amount of tokens to mint. |

### mintTokenAndApprove

```solidity
function mintTokenAndApprove(address _token, address _approveAddress, uint256 _amount) external
```

Mints tokens and approves a specified address to spend them.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _token | address | The address of the token to mint. |
| _approveAddress | address | The address to approve for spending the minted tokens. |
| _amount | uint256 | The amount of tokens to mint and approve. |

### addTokenOwner

```solidity
function addTokenOwner(address _token, address _ownerAddress) external
```

Adds a new owner to the specified token.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _token | address | The address of the token. |
| _ownerAddress | address | The address of the new owner to add. |

