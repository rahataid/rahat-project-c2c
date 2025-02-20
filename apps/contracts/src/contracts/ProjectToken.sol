//SPDX-License-Identifier: LGPL-3.0
pragma solidity 0.8.20;

//ERC20 Tokens
import '@rahataid/contracts/src/contracts/RahatToken.sol';

contract ProjectToken is RahatToken {
  constructor(
    string memory _name,
    string memory _symbol,
    string memory _description,
    uint8 _decimals,
    uint256 _initialSupply,
    address _to,
    address _manager,
    address _forwarder
  )
    RahatToken(
      _name,
      _symbol,
      _description,
      _decimals,
      _initialSupply,
      _to,
      _manager,
      _forwarder
    )
  {}
}
