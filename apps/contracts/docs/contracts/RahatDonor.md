# Solidity API

## RahatDonor

_This contract allows the management of Rahat tokens and projects. It provides functionality
for creating tokens, minting them, approving addresses, and registering projects. All actions
are restricted to the contract owner._

### TokenCreated

```solidity
event TokenCreated(address tokenAddress)
```

### TokenMintedAndApproved

```solidity
event TokenMintedAndApproved(address tokenAddress, address approveAddress, uint256 amount)
```

### IID_RAHAT_DONOR

```solidity
bytes4 IID_RAHAT_DONOR
```

All the supply is allocated to this contract

_Deploys AidToken and Rahat contract by sending supply to this contract_

### _registeredProject

```solidity
mapping(address => bool) _registeredProject
```

### constructor

```solidity
constructor(address _admin) public
```

_Sets the contract owner to the specified address._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _admin | address | The address of the admin who will be the owner of the contract. |

### createToken

```solidity
function createToken(string _name, string _symbol, uint8 decimals) public returns (address)
```

Creates a new Rahat token.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _name | string | The name of the token. |
| _symbol | string | The symbol of the token. |
| decimals | uint8 | The number of decimals for the token. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | The address of the newly created token. Requirements: - The caller must be the owner. |

### mintToken

```solidity
function mintToken(address _token, uint256 _amount) public
```

Mints a specified amount of tokens to the contract.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _token | address | The address of the token to mint. |
| _amount | uint256 | The amount of tokens to mint. Requirements: - The caller must be the owner. |

### mintTokenAndApprove

```solidity
function mintTokenAndApprove(address _token, address _approveAddress, uint256 _amount, address _projectAddress) public
```

Mints tokens and approves a specified address to spend them.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _token | address | The address of the token to mint. |
| _approveAddress | address | The address to approve for spending the minted tokens. |
| _amount | uint256 | The amount of tokens to mint and approve. |
| _projectAddress | address | The address of the project associated with the tokens. Requirements: - The caller must be the owner. - The token address, approve address, and project address must not be zero. - The project must be registered. - The amount must be greater than zero. |

### addTokenOwner

```solidity
function addTokenOwner(address _token, address _ownerAddress) public
```

Adds a new owner to the specified token.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _token | address | The address of the token. |
| _ownerAddress | address | The address of the new owner to add. Requirements: - The caller must be the owner. |

### registerProject

```solidity
function registerProject(address _projectAddress, bool status) public
```

Registers or unregisters a project.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _projectAddress | address | The address of the project to register. |
| status | bool | A boolean indicating whether to register (true) or unregister (false) the project. |

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

