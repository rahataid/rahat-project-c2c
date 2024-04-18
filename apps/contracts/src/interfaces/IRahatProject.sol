//SPDX-License-Identifier: LGPL-3.0
pragma solidity ^0.8.17;

import '@openzeppelin/contracts/utils/introspection/IERC165.sol';

interface IRahatProject is IERC165 {
    function name() external view returns (string memory);

    function community() external view returns (address);

    /**
     * @dev Adds a beneficiary to the contract.
     * @param _beneficiary The address of the beneficiary to be added.
     */
    function addBeneficiary(address _beneficiary) external;

    /**
     * @dev Removes a beneficiary from the contract.
     * @param _beneficiary The address of the beneficiary to be removed.
     */
    function removeBeneficiary(
        address _beneficiary,
        address _tokenAddress
    ) external;

    function isBeneficiary(address _address) external view returns (bool);

    function beneficiaryCount() external view returns (uint256);

    function tokenBudget(address _tokenAddress) external view returns (uint);
}