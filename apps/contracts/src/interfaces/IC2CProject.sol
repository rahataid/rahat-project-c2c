// SPDX-License-Identifier: LGPL-3.0
pragma solidity 0.8.20;

interface IC2CProject {
  /**
   * @dev Emitted when a claim is processed.
   * @param _tokenAddress The address of the token.
   * @param _to The address of the beneficiary.
   * @param _from The address of the donor.
   * @param _amount The amount of tokens processed.
   */
  event TransferProcessed(
    address indexed _tokenAddress,
    address indexed _to,
    address indexed _from,
    uint _amount
  );

  /**
   * @dev Allows the user to withdraw tokens from the contract.
   * @param _tokenAddress The address of the token to be withdrawn.
   */
  function withdrawToken(
    address _tokenAddress,
    address _withdrawAddress
  ) external;

  /**
   * @dev Processes a transfer of tokens to a beneficiary.
   * @param _beneficiary The address of the beneficiary.
   * @param _tokenAddress The address of the token to be transferred.
   * @param _amount The amount of tokens to be transferred.
   */
  function disburseProjectToken(
    address _tokenAddress,
    address _beneficiary,
    uint256 _amount
  ) external;

  function disburseOwnedToken(
    address _tokenAddress,
    address _beneficiary,
    uint256 _amount
  ) external;

  function disburseExternalToken(
    address _tokenAddress,
    address _beneficiary,
    address _tokenOwner,
    uint256 _amount
  ) external;
}
