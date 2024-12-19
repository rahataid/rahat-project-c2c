# Solidity API

## RahatToken

The RahatToken contract allows for minting and burning of tokens, as well as ownership control.

_This contract implements an ERC20 token with burnable capabilities and ownership management._

### constructor

```solidity
constructor(string _name, string _symbol, address _admin, uint8 _decimals) public
```

_Initializes the ERC20 token with a name, symbol, admin address, and decimal points._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _name | string | The name of the token. |
| _symbol | string | The symbol of the token. |
| _admin | address | The address of the admin who will have ownership rights. |
| _decimals | uint8 | The number of decimal places the token can be divided into. |

### decimals

```solidity
function decimals() public view returns (uint8)
```

_returns the decimals of the tokens_

### mint

```solidity
function mint(address _address, uint256 _amount) public returns (uint256)
```

_Mint x amount of ERC20 token to given address_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | Address to which ERC20 token will be minted |
| _amount | uint256 | Amount of token to be minted |

