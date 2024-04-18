//SPDX-License-Identifier: LGPL-3.0
pragma solidity 0.8.20;

//ERC20 Tokens
import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol';

import '../interfaces/IRahatToken.sol';
import '../libraries/AbstractOwner.sol';

contract RahatToken is AbstractOwner, ERC20Burnable, IRahatToken {
    uint8 private decimalPoints;

    constructor(
        string memory _name,
        string memory _symbol,
        address _admin,
        uint8 _decimals
    ) ERC20(_name, _symbol) {
        _addOwner(_admin);
        decimalPoints = _decimals;
    }

    ///@dev returns the decimals of the tokens
    function decimals() public view override returns (uint8) {
        return decimalPoints;
    }

    ///@dev Mint x amount of ERC20 token to given address
    ///@param _address Address to which ERC20 token will be minted
    ///@param _amount Amount of token to be minted
    function mint(
        address _address,
        uint256 _amount
    ) public OnlyOwner returns (uint256) {
        _mint(_address, _amount);
        return _amount;
    }

    // function _beforeTokenTransfer(
    //   address from,
    //   address to,
    //   uint256 amount
    // ) internal override(ERC20, ERC20Snapshot) {
    //   super._beforeTokenTransfer(from, to, amount);
    // }
}
