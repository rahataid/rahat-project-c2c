# Solidity API

## IRahatClaim

### Claim

```solidity
struct Claim {
  address ownerAddress;
  address claimerAddress;
  address claimeeAddress;
  address otpServerAddress;
  address tokenAddress;
  uint256 amount;
  uint256 expiryDate;
  bytes32 otpHash;
  bool isProcessed;
}
```

### createClaim

```solidity
function createClaim(address _claimerAddress, address _claimeeAddress, address _otpServerAddress, address _tokenAddress, uint256 _amount) external returns (uint256 claimId)
```

### addOtpToClaim

```solidity
function addOtpToClaim(uint256 _claimId, bytes32 _otpHash, uint256 _expiryDate) external
```

### processClaim

```solidity
function processClaim(uint256 _claimId, string _otp) external returns (struct IRahatClaim.Claim claim_)
```

