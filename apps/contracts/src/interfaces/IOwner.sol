//SPDX-License-Identifier: LGPL-3.0
pragma solidity ^0.8.17;

/**
 * @title IOwner
 * @dev This interface defines the functions for managing ownership in a contract.
 * It allows for adding and removing owners, checking ownership status, and listing all owners.
 */
interface IOwner {
  /**
   * @notice Adds a new owner to the contract.
   * @param _account The address of the account to be added as an owner.
   * @return True if the operation was successful, false otherwise.
   */
  function addOwner(address _account) external returns (bool);

  /**
   * @notice Removes an existing owner from the contract.
   * @param _account The address of the account to be removed as an owner.
   * @return True if the operation was successful, false otherwise.
   */
  function removeOwner(address _account) external returns (bool);

  /**
   * @notice Returns the total number of owners in the contract.
   * @return The count of owners.
   */
  function ownerCount() external view returns (uint);

  /**
   * @notice Checks if a given address is an owner.
   * @param _address The address to check for ownership.
   * @return True if the address is an owner, false otherwise.
   */
  function isOwner(address _address) external view returns (bool);

  /**
   * @notice Lists all current owners of the contract.
   * @return An array of addresses representing the current owners.
   */
  function listOwners() external view returns (address[] memory);
}
