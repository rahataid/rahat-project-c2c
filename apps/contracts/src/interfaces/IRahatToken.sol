//SPDX-License-Identifier: LGPL-3.0
pragma solidity 0.8.20;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import './IOwner.sol';

interface IRahatToken is IOwner, IERC20 {
    function mint(address _address, uint256 _amount) external returns (uint256);
}
