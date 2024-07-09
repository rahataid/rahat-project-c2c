// SPDX-License-Identifier: LGPL-3.0
pragma solidity 0.8.20;

import '../../interfaces/IC2CProject.sol';
import '../../libraries/AbstractProject.sol';

contract C2CProject is AbstractProject, IC2CProject {
  using EnumerableSet for EnumerableSet.AddressSet;

  constructor(string memory _name) AbstractProject(_name) {}

  // #region ***** Variables *********//

  bytes4 public constant IID_RAHAT_PROJECT = type(IRahatProject).interfaceId;

  mapping(address => bool) public isDonor;

  // #endregion

  // #region ***** Token Functions *********//
  function acceptToken(
    address _from,
    address _tokenAddress,
    uint256 _amount
  ) public {
    isDonor[_from] = true;
    _acceptToken(_tokenAddress, _from, _amount);
  }

  function withdrawToken(
    address _tokenAddress,
    address _withdrawAddress
  ) public {
    uint256 _balance = IERC20(_tokenAddress).balanceOf(address(this));
    _withdrawToken(_tokenAddress, _balance, _withdrawAddress);
  }

  // #endregion

  // #region ***** Beneficiaries Functions *********//

  function addBeneficiary(address _beneficiary) public {
    _addBeneficiary(_beneficiary);
  }

  function removeBeneficiary(address _beneficiary) public {
    _removeBeneficiary(_beneficiary);
  }

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

  function supportsInterface(
    bytes4 interfaceId
  ) public view virtual override returns (bool) {
    return interfaceId == IID_RAHAT_PROJECT;
  }
}
