//SPDX-License-Identifier: LGPL-3.0
pragma solidity ^0.8.17;

import '@openzeppelin/contracts/utils/introspection/IERC165.sol';

interface IRahatProject is IERC165 {
  function name() external view returns (string memory);

  function addBeneficiary(address _address) external;

  function removeBeneficiary(address _address) external;

  function isBeneficiary(address _address) external view returns (bool);

  function beneficiaryCount() external view returns (uint256);

  function tokenBudget(address _tokenAddress) external view returns (uint);
}
