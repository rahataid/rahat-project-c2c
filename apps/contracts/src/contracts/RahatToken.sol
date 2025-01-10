//SPDX-License-Identifier: LGPL-3.0
pragma solidity 0.8.20;
import '@rahataid/contracts/src/contracts/RahatToken.sol'


/// @title RahatToken
/// @dev This contract implements an ERC20 token with burnable capabilities and ownership management.
/// @notice The RahatToken contract allows for minting and burning of tokens, as well as ownership control.
contract RahatToken is AbstractOwner, ERC20Burnable, IRahatToken {
  uint8 private decimalPoints;

  /// @dev Initializes the ERC20 token with a name, symbol, admin address, and decimal points.
  /// @param _name The name of the token.
  /// @param _symbol The symbol of the token.
  /// @param _admin The address of the admin who will have ownership rights.
  /// @param _decimals The number of decimal places the token can be divided into.
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
}
