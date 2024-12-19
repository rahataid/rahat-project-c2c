# Solidity API

## C2CProject

_This contract implements a project that allows for the acceptance and disbursement of tokens.
It inherits from the AbstractProject and implements the IC2CProject interface. The contract
manages donors and beneficiaries, allowing for token transfers and project management._

### constructor

```solidity
constructor(string _name) public
```

_Sets the project name during contract deployment._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _name | string | The name of the project. |

### IID_RAHAT_PROJECT

```solidity
bytes4 IID_RAHAT_PROJECT
```

### isDonor

```solidity
mapping(address => bool) isDonor
```

_Checks if the given address is a donor._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |

### acceptToken

```solidity
function acceptToken(address _from, address _tokenAddress, uint256 _amount) public
```

Accepts tokens from a specified address and marks them as a donor.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _from | address | The address from which the tokens are accepted. |
| _tokenAddress | address | The address of the token being accepted. |
| _amount | uint256 | The amount of tokens to accept. |

### withdrawToken

```solidity
function withdrawToken(address _tokenAddress, address _withdrawAddress) public
```

Withdraws all tokens of a specified type to a given address.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenAddress | address | The address of the token to withdraw. |
| _withdrawAddress | address | The address to which the tokens will be sent. |

### addBeneficiary

```solidity
function addBeneficiary(address _beneficiary) public
```

Adds a beneficiary to the project.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _beneficiary | address | The address of the beneficiary to add. |

### removeBeneficiary

```solidity
function removeBeneficiary(address _beneficiary) public
```

Removes a beneficiary from the project.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _beneficiary | address | The address of the beneficiary to remove. |

### disburseProjectToken

```solidity
function disburseProjectToken(address _tokenAddress, address _beneficiary, uint256 _amount) public
```

Disburses project tokens to a specified beneficiary.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenAddress | address | The address of the token to disburse. |
| _beneficiary | address | The address of the beneficiary to receive the tokens. |
| _amount | uint256 | The amount of tokens to disburse. |

### disburseOwnedToken

```solidity
function disburseOwnedToken(address _tokenAddress, address _beneficiary, uint256 _amount) public
```

Disburses owned tokens to a specified beneficiary.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenAddress | address | The address of the token to disburse. |
| _beneficiary | address | The address of the beneficiary to receive the tokens. |
| _amount | uint256 | The amount of tokens to disburse. |

### disburseExternalToken

```solidity
function disburseExternalToken(address _tokenAddress, address _beneficiary, address _tokenOwner, uint256 _amount) public
```

Disburses external tokens from a specified owner to a beneficiary.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenAddress | address | The address of the token to disburse. |
| _beneficiary | address | The address of the beneficiary to receive the tokens. |
| _tokenOwner | address | The address of the token owner from whom the tokens will be transferred. |
| _amount | uint256 | The amount of tokens to disburse. |

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view virtual returns (bool)
```

_Checks if the contract supports a specific interface._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId | bytes4 | The ID of the interface to check. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if the interface is supported, false otherwise. |

