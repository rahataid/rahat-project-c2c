// SPDX-License-Identifier: LGPL-3.0
pragma solidity 0.8.20;

import '../../interfaces/IC2CProject.sol';
import {AbstractProject} from '@rahataid/contracts/src/libraries/AbstractProject.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

/**
 * @title C2CProject
 * @dev This contract implements a project that allows for the disbursement of tokens.
 * It inherits from the AbstractProject and implements the IC2CProject interface. The contract
 * manages donors and beneficiaries, allowing for token transfers and project management.
 */
contract C2CProject is AbstractProject, IC2CProject {
  /**
   * @dev Sets the project name during contract deployment.
   * @param _name The name of the project.
   */
  constructor(
    string memory _name,
    address _forwarder
  ) AbstractProject(_name, _forwarder) {}

  // #region ***** Token Functions *********//

  /**
   * @notice Withdraws all tokens of a specified type to a given address.
   * @param _tokenAddress The address of the token to withdraw.
   * @param _withdrawAddress The address to which the tokens will be sent.
   */
  function withdrawToken(
    address _tokenAddress,
    address _withdrawAddress
  ) public {
    uint256 _balance = IERC20(_tokenAddress).balanceOf(address(this));
    IERC20(_tokenAddress).transfer(_withdrawAddress, _balance);
  }

  // #endregion

  // #region ***** Beneficiaries Functions *********//

  /**
   * @notice Adds a beneficiary to the project.
   * @param _beneficiary The address of the beneficiary to add.
   */
  function addBeneficiary(address _beneficiary) public {
    _addBeneficiary(_beneficiary);
  }

  /**
   * @notice Removes a beneficiary from the project.
   * @param _beneficiary The address of the beneficiary to remove.
   */
  function removeBeneficiary(address _beneficiary) public {
    _removeBeneficiary(_beneficiary);
  }

  /**
   * @notice Disburses project tokens to a specified beneficiary.
   * @param _tokenAddress The address of the token to disburse.
   * @param _beneficiary The address of the beneficiary to receive the tokens.
   * @param _amount The amount of tokens to disburse.
   */
  function disburseProjectToken(
    address _tokenAddress,
    address _beneficiary,
    uint256 _amount
  ) public {
    addBeneficiary(_beneficiary);
    require(
      IERC20(_tokenAddress).balanceOf(address(this)) >= _amount,
      'Not enough balance'
    );

    require(
      IERC20(_tokenAddress).transfer(_beneficiary, _amount),
      'Transfer Failed'
    );
    emit TransferProcessed(_tokenAddress, _beneficiary, address(this), _amount);
  }

  /**
   * @notice Disburses owned tokens to a specified beneficiary.
   * @param _tokenAddress The address of the token to disburse.
   * @param _beneficiary The address of the beneficiary to receive the tokens.
   * @param _amount The amount of tokens to disburse.
   */
  function disburseOwnedToken(
    address _tokenAddress,
    address _beneficiary,
    uint256 _amount
  ) public {
    addBeneficiary(_beneficiary);
    require(
      IERC20(_tokenAddress).transferFrom(msg.sender, _beneficiary, _amount),
      'Transfer Failed'
    );
    emit TransferProcessed(_tokenAddress, _beneficiary, msg.sender, _amount);
  }

  /**
   * @notice Disburses external tokens from a specified owner to a beneficiary.
   * @param _tokenAddress The address of the token to disburse.
   * @param _beneficiary The address of the beneficiary to receive the tokens.
   * @param _tokenOwner The address of the token owner from whom the tokens will be transferred.
   * @param _amount The amount of tokens to disburse.
   */
  function disburseExternalToken(
    address _tokenAddress,
    address _beneficiary,
    address _tokenOwner,
    uint256 _amount
  ) public {
    addBeneficiary(_beneficiary);
    require(
      IERC20(_tokenAddress).transferFrom(_tokenOwner, _beneficiary, _amount),
      'Transfer Failed'
    );
    emit TransferProcessed(_tokenAddress, _beneficiary, _tokenOwner, _amount);
  }

  // #endregion

  //   /**
  //    * @dev Checks if the contract supports a specific interface.
  //    * @param interfaceId The ID of the interface to check.
  //    * @return True if the interface is supported, false otherwise.
  //    */
  //   function supportsInterface(
  //     bytes4 interfaceId
  //   ) public view virtual override returns (bool) {
  //     return interfaceId == IID_RAHAT_PROJECT;
  //   }
  function supportsInterface(
    bytes4 interfaceId
  ) external view override returns (bool) {}

  function transferTokenToClaimer(
    address _tokenAddress,
    address _benAddress,
    address _vendorAddress,
    uint _amount
  ) external override {}
}
