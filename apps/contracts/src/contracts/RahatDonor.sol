// SPDX-License-Identifier: LGPL-3.0
pragma solidity 0.8.20;

import '@openzeppelin/contracts/utils/ReentrancyGuard.sol';
import './RahatToken.sol';
import '../libraries/AbstractTokenActions.sol';
import '../interfaces/IRahatDonor.sol';

/// @title RahatDonor
/// @dev A contract to manage token creation, minting, approvals, and project registration.
contract RahatDonor is AbstractTokenActions, ReentrancyGuard, IRahatDonor {
    event TokenCreated(address indexed tokenAddress);
    event TokenMintedAndApproved(
        address indexed tokenAddress,
        address indexed approveAddress,
        uint256 amount
    );

    mapping(address => bool) public _registeredProject;

    /// @dev Initializes the contract owner.
    constructor(address _admin) {
        require(_admin != address(0), 'Admin address cannot be zero');
        _addOwner(_admin);
    }

    /// @inheritdoc IRahatDonor
    function createToken(
        string memory _name,
        string memory _symbol,
        uint8 decimals
    ) public returns (address) {
        require(bytes(_name).length > 0, 'Token name is required');
        require(bytes(_symbol).length > 0, 'Token symbol is required');
        RahatToken _token = new RahatToken(
            _name,
            _symbol,
            address(this),
            decimals
        );
        emit TokenCreated(address(_token));
        return address(_token);
    }

    /// @inheritdoc IRahatDonor
    function mintToken(address _token, uint256 _amount) public override {
        require(_token != address(0), 'Token address cannot be zero');
        require(_amount > 0, 'Mint amount must be greater than zero');
        RahatToken(_token).mint(address(this), _amount);
    }

    /// @inheritdoc IRahatDonor
    function mintTokenAndApprove(
        address _token,
        address _approveAddress,
        uint256 _amount,
        address _projectAddress
    ) public {
        require(_token != address(0), 'Token address cannot be zero');
        require(
            _approveAddress != address(0),
            'Approve address cannot be zero'
        );
        require(
            _projectAddress != address(0),
            'Project address cannot be zero'
        );
        require(_registeredProject[_projectAddress], 'Project not registered');
        require(_amount > 0, 'Amount must be greater than zero');

        RahatToken token = RahatToken(_token);
        token.mint(address(this), _amount);
        token.approve(_approveAddress, _amount);

        emit TokenMintedAndApproved(_token, _approveAddress, _amount);
    }

    /// @inheritdoc IRahatDonor
    function addTokenOwner(address _token, address _ownerAddress) public {
        require(_token != address(0), 'Token address cannot be zero');
        require(_ownerAddress != address(0), 'Owner address cannot be zero');
        RahatToken(_token).addOwner(_ownerAddress);
    }

    /// @inheritdoc IERC165
    function supportsInterface(bytes4 interfaceId) public view returns (bool) {
        return interfaceId == type(IRahatDonor).interfaceId;
    }
}
