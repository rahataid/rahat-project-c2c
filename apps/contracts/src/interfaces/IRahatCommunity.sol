//SPDX-License-Identifier: LGPL-3.0
pragma solidity ^0.8.17;

import '@openzeppelin/contracts/access/IAccessControl.sol';

interface IRahatCommunity is IAccessControl {
    function isBeneficiary(address _address) external view returns (bool);

    function isProject(address _address) external view returns (bool);

    function isAdmin(address _address) external view returns (bool);

    function addBeneficiary(address _address) external;

    function removeBeneficiary(address _address) external;

    function approveProject(address _projectAddress) external;

    function revokeProject(address _projectAddress) external;

    function requestProjectApproval(address _projectAddress) external;
}
