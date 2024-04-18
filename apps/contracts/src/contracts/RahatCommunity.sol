//SPDX-License-Identifier: LGPL-3.0
pragma solidity 0.8.20;

import '@openzeppelin/contracts/access/AccessControl.sol';
import '@openzeppelin/contracts/utils/Multicall.sol';
import '@openzeppelin/contracts/utils/introspection/IERC165.sol';
import '../interfaces/IRahatProject.sol';
import '../interfaces/IRahatCommunity.sol';

contract RahatCommunity is IRahatCommunity, AccessControl, Multicall {
    // #region ***** Events *********//
    event ProjectApprovalRequest(
        address indexed requestor,
        address indexed project
    );
    event ProjectApproved(address indexed);
    event ProjectRevoked(address indexed);

    event BeneficiaryAdded(address indexed);
    event BeneficiaryRemoved(address indexed);
    event Received(address, uint);

    // #endregion

    // #region ***** Variables *********//
    string public name;

    mapping(address => bool) public override isBeneficiary;
    mapping(address => bool) public override isProject;

    bytes32 public constant VENDOR_ROLE = keccak256('VENDOR');
    bytes4 public constant IID_RAHAT_PROJECT = type(IRahatProject).interfaceId;

    // #endregion

    // #region ***** Modifiers *********//
    modifier OnlyAdmin() {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), 'Not an admin');
        _;
    }

    // #endregion

    constructor(string memory _name, address _admin) {
        _grantRole(DEFAULT_ADMIN_ROLE, _admin);
        _setRoleAdmin(VENDOR_ROLE, DEFAULT_ADMIN_ROLE);
        name = _name;
    }

    // #region ***** Role functions *********//
    function isAdmin(address _address) public view returns (bool) {
        return hasRole(DEFAULT_ADMIN_ROLE, _address);
    }

    function addBeneficiary(address _address) public OnlyAdmin {
        isBeneficiary[_address] = true;
        emit BeneficiaryAdded(_address);
    }

    function removeBeneficiary(address _address) public OnlyAdmin {
        isBeneficiary[_address] = false;
        emit BeneficiaryRemoved(_address);
    }

    // #endregion

    // #region ***** Project functions *********//

    function approveProject(address _projectAddress) public OnlyAdmin {
        require(
            IERC165(_projectAddress).supportsInterface(IID_RAHAT_PROJECT),
            'project interface not supported'
        );
        if (!isProject[_projectAddress]) emit ProjectApproved(_projectAddress);
        isProject[_projectAddress] = true;
    }

    function revokeProject(address _projectAddress) public OnlyAdmin {
        if (isProject[_projectAddress]) emit ProjectRevoked(_projectAddress);
        isProject[_projectAddress] = false;
    }

    function requestProjectApproval(address _projectAddress) public {
        emit ProjectApprovalRequest(tx.origin, _projectAddress);
    }

    function grantRoleWithEth(
        bytes32 _role,
        address _account
    ) public OnlyAdmin {
        super.grantRole(_role, _account);
        if (_account.balance < 0.0003 ether) {
            (bool success, ) = _account.call{value: 0.0001 ether}('');
            require(success, 'Communnity needs more ether.');
        }
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    function withdraw(address payable _to) public payable OnlyAdmin {
        (bool sent, ) = _to.call{value: address(this).balance}('');
        require(sent, 'Failed to send Ether');
    }
    // #endregion
}
