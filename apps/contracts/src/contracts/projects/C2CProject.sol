// SPDX-License-Identifier: LGPL-3.0
pragma solidity 0.8.20;

import '../../interfaces/IC2CProject.sol';
import '../../libraries/AbstractProject.sol';

contract C2CProject is AbstractProject, IC2CProject {
    using EnumerableSet for EnumerableSet.AddressSet;

    constructor(
        string memory _name,
        address _community
    ) AbstractProject(_name, _community) {
        RahatCommunity.requestProjectApproval(address(this));
    }

    // #region ***** Variables *********//

    bytes4 public constant IID_RAHAT_PROJECT = type(IRahatProject).interfaceId;

    mapping(address => bool) public isDonor;

    // #endregion

    // #region ***** modifiers *********//

    /**
     * @dev Modifier that allows only community admins to execute the function.
     * @notice This modifier checks if the caller is a community admin using the `isAdmin` function from the `RahatCommunity` contract.
     * @notice If the caller is not a community admin, the function will revert with the error message "not a community admin".
     */
    modifier onlyCommunityAdmin() {
        require(RahatCommunity.isAdmin(msg.sender), 'not a community admin');
        _;
    }

    // #endregion

    // #region ***** Token Functions *********//
    function acceptToken(
        address _from,
        address _tokenAddress,
        uint256 _amount
    ) public onlyCommunityAdmin {
        isDonor[_from] = true;
        _acceptToken(_tokenAddress, _from, _amount);
    }

    function withdrawToken(address _tokenAddress) public onlyCommunityAdmin {
        uint256 _balance = IERC20(_tokenAddress).balanceOf(address(this));
        _withdrawToken(_tokenAddress, _balance);
    }

    // #endregion

    // #region ***** Beneficiaries Functions *********//

    function addBeneficiary(address _beneficiary) public onlyCommunityAdmin {
        _addBeneficiary(_beneficiary);
    }

    function removeBeneficiary(address _beneficiary) public onlyCommunityAdmin {
        _removeBeneficiary(_beneficiary);
    }

    function processTransferToBeneficiary(
        address _beneficiary,
        address _tokenAddress,
        uint256 _amount
    ) public onlyCommunityAdmin {
        require(isBeneficiary(_beneficiary), 'Not a Beneficiary');
        require(
            IERC20(_tokenAddress).balanceOf(address(this)) >= _amount,
            'Not enough balance'
        );

        require(
            IERC20(_tokenAddress).transfer(_beneficiary, _amount),
            'Transfer Failed'
        );
        emit TransferProcessed(_beneficiary, _tokenAddress, _amount);
    }

    // #endregion

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override returns (bool) {
        return interfaceId == IID_RAHAT_PROJECT;
    }
}
