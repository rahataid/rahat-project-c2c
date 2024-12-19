//SPDX-License-Identifier: LGPL-3.0
pragma solidity ^0.8.17;

import '@openzeppelin/contracts/utils/introspection/IERC165.sol';

/**
 * @title IRahatDonor
 * @dev This interface defines the functions for managing Rahat tokens within the donor contract.
 * It extends the IERC165 interface for interface detection.
 */
interface IRahatDonor is IERC165 {
  /**
   * @notice Creates a new token with the specified name, symbol, and decimals.
   * @param _name The name of the token to be created.
   * @param _symbol The symbol of the token to be created.
   * @param decimals The number of decimals for the token.
   */
  function createToken(
    string memory _name,
    string memory _symbol,
    uint8 decimals
  ) external;

  /**
   * @notice Mints a specified amount of tokens to the donor contract.
   * @param _token The address of the token to mint.
   * @param _amount The amount of tokens to mint.
   */
  function mintToken(address _token, uint256 _amount) external;

  /**
   * @notice Mints tokens and approves a specified address to spend them.
   * @param _token The address of the token to mint.
   * @param _approveAddress The address to approve for spending the minted tokens.
   * @param _amount The amount of tokens to mint and approve.
   */
  function mintTokenAndApprove(
    address _token,
    address _approveAddress,
    uint256 _amount
  ) external;

  /**
   * @notice Adds a new owner to the specified token.
   * @param _token The address of the token.
   * @param _ownerAddress The address of the new owner to add.
   */
  function addTokenOwner(address _token, address _ownerAddress) external;
}
