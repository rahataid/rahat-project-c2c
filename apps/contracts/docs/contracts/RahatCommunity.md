# Solidity API

## RahatCommunity

### ProjectApprovalRequest

```solidity
event ProjectApprovalRequest(address requestor, address project)
```

### ProjectApproved

```solidity
event ProjectApproved(address)
```

### ProjectRevoked

```solidity
event ProjectRevoked(address)
```

### BeneficiaryAdded

```solidity
event BeneficiaryAdded(address)
```

### BeneficiaryRemoved

```solidity
event BeneficiaryRemoved(address)
```

### Received

```solidity
event Received(address, uint256)
```

### name

```solidity
string name
```

### isBeneficiary

```solidity
mapping(address => bool) isBeneficiary
```

### isProject

```solidity
mapping(address => bool) isProject
```

### VENDOR_ROLE

```solidity
bytes32 VENDOR_ROLE
```

### IID_RAHAT_PROJECT

```solidity
bytes4 IID_RAHAT_PROJECT
```

### OnlyAdmin

```solidity
modifier OnlyAdmin()
```

### constructor

```solidity
constructor(string _name, address _admin) public
```

### isAdmin

```solidity
function isAdmin(address _address) public view returns (bool)
```

### addBeneficiary

```solidity
function addBeneficiary(address _address) public
```

### removeBeneficiary

```solidity
function removeBeneficiary(address _address) public
```

### approveProject

```solidity
function approveProject(address _projectAddress) public
```

### revokeProject

```solidity
function revokeProject(address _projectAddress) public
```

### requestProjectApproval

```solidity
function requestProjectApproval(address _projectAddress) public
```

### grantRoleWithEth

```solidity
function grantRoleWithEth(bytes32 _role, address _account) public
```

### receive

```solidity
receive() external payable
```

### withdraw

```solidity
function withdraw(address payable _to) public payable
```

