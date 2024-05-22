// SPDX-License-Identifier: LGPL-3.0
pragma solidity 0.8.20;

interface IC2CProject {
    /**
     * @dev Emitted when a claim is processed.
     * @param _beneficiary The address of the beneficiary.
     * @param _tokenAddress The address of the token.
     * @param _amount The amount of tokens processed.
     */
    event TransferProcessed(
        address indexed _beneficiary,
        address indexed _tokenAddress,
        uint _amount
    );

    /**
     * @dev Checks if the given address is a donor.
     * @param _address The address to check.
     * @return A boolean value indicating whether the address is a donor or not.
     */
    function isDonor(address _address) external returns (bool);

    /**
     * @dev Allows the contract to accept tokens from a specified address.
     * @param _from The address from which the tokens are being transferred.
     * @param _amount The amount of tokens being transferred.
     */
    function acceptToken(
        address _from,
        address _tokenAddress,
        uint256 _amount
    ) external;

    /**
     * @dev Allows the user to withdraw tokens from the contract.
     * @param _tokenAddress The address of the token to be withdrawn.
     */
    function withdrawToken(address _tokenAddress) external;

    /**
     * @dev Processes a transfer of tokens to a beneficiary.
     * @param _beneficiary The address of the beneficiary.
     * @param _tokenAddress The address of the token to be transferred.
     * @param _amount The amount of tokens to be transferred.
     */
    function processTransferToBeneficiary(
        address _beneficiary,
        address _tokenAddress,
        uint256 _amount
    ) external;
}
