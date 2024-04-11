// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import '@openzeppelin/contracts/utils/structs/EnumerableSet.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/utils/Multicall.sol';

import '../interfaces/IRahatProject.sol';
import '../interfaces/IRahatCommunity.sol';

abstract contract AbstractProject is IRahatProject, Multicall {
    using EnumerableSet for EnumerableSet.AddressSet;

    // #region ***** Events *********//
    event BeneficiaryAdded(address indexed);
    event BeneficiaryRemoved(address indexed);
    event ProjectLocked();
    event ProjectUnlocked();

    event TokenRegistered(address indexed tokenAddress);
    event TokenBudgetIncrease(address indexed tokenAddress, uint amount);
    event TokenBudgetDecrease(address indexed tokenAddress, uint amount);
    event TokenReceived(
        address indexed token,
        address indexed from,
        uint amount
    );
    event TokenTransfer(address indexed token, address indexed to, uint amount);
    // #endregion

    // #region ***** Variables *********//
    bool internal _permaLock;
    mapping(address => uint) private _tokenBudget;
    mapping(address => bool) private _registeredTokens;

    string public override name;

    IRahatCommunity public RahatCommunity;
    EnumerableSet.AddressSet internal _beneficiaries;

    // #endregion

    constructor(string memory _name, address _community) {
        name = _name;
        RahatCommunity = IRahatCommunity(_community);
    }

    // #region ***** Beneficiary Functions *********//
    function isBeneficiary(
        address _address
    ) public view virtual returns (bool) {
        return _beneficiaries.contains(_address);
    }

    function beneficiaryCount() public view virtual returns (uint256) {
        return _beneficiaries.length();
    }

    function _addBeneficiary(address _address) internal {
        require(RahatCommunity.isBeneficiary(_address), 'not valid ben');
        if (!_beneficiaries.contains(_address)) emit BeneficiaryAdded(_address);
        _beneficiaries.add(_address);
    }

    function _removeBeneficiary(address _address) internal {
        if (_beneficiaries.contains(_address))
            emit BeneficiaryRemoved(_address);
        _beneficiaries.remove(_address);
    }

    // #endregion

    // #region ***** Token Functions *********//
    function tokenBudget(
        address _tokenAddress
    ) public view virtual returns (uint) {
        return _tokenBudget[_tokenAddress];
    }

    function _tokenBudgetIncrease(
        address _tokenAddress,
        uint _amount
    ) internal {
        _tokenBudget[_tokenAddress] += _amount;
        emit TokenBudgetIncrease(_tokenAddress, _amount);

        if (!_registeredTokens[_tokenAddress]) {
            _registeredTokens[_tokenAddress] = true;
            emit TokenRegistered(_tokenAddress);
        }
    }

    function _tokenBudgetDecrease(
        address _tokenAddress,
        uint _amount
    ) internal {
        _tokenBudget[_tokenAddress] -= _amount;
        emit TokenBudgetDecrease(_tokenAddress, _amount);
    }

    function _acceptToken(
        address _tokenAddress,
        address _from,
        uint256 _amount
    ) internal {
        require(
            RahatCommunity.isProject(address(this)),
            'project not approved'
        );

        IERC20(_tokenAddress).transferFrom(_from, address(this), _amount);
        _tokenBudgetIncrease(_tokenAddress, _amount);
        emit TokenReceived(_tokenAddress, _from, _amount);
    }

    function _withdrawToken(address _tokenAddress, uint _amount) internal {
        IERC20(_tokenAddress).transfer(address(RahatCommunity), _amount);
        _tokenBudgetDecrease(_tokenAddress, _amount);

        emit TokenTransfer(_tokenAddress, address(RahatCommunity), _amount);
    }

    // #endregion

    // #region ***** Misc Functions *********//
    function community() public view virtual returns (address) {
        return address(RahatCommunity);
    }
    // #endregion
}
