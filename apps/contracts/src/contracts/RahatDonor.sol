//SPDX-License-Identifier: LGPL-3.0
pragma solidity 0.8.20;

import '@openzeppelin/contracts/utils/introspection/ERC165.sol';
import './RahatToken.sol';
import '../libraries/AbstractTokenActions.sol';
import '../interfaces/IRahatProject.sol';
import '../interfaces/IRahatDonor.sol';

/**
 * @title RahatDonor
 * @dev This contract allows the management of Rahat tokens and projects. It provides functionality
 * for creating tokens, minting them, approving addresses, and registering projects. All actions
 * are restricted to the contract owner.
 */
contract RahatDonor is AbstractTokenActions, ERC165 {
  event TokenCreated(address indexed tokenAddress);
  event TokenMintedAndApproved(
    address indexed tokenAddress,
    address indexed approveAddress,
    uint256 amount
  );

  /// @notice All the supply is allocated to this contract
  /// @dev Deploys AidToken and Rahat contract by sending supply to this contract

  bytes4 public constant IID_RAHAT_DONOR = type(IRahatDonor).interfaceId;

  mapping(address => bool) public _registeredProject;

  /**
   * @dev Sets the contract owner to the specified address.
   * @param _admin The address of the admin who will be the owner of the contract.
   */
  constructor(address _admin) {
    _addOwner(_admin);
  }

  //#region Token function

  /**
   * @notice Creates a new Rahat token.
   * @param _name The name of the token.
   * @param _symbol The symbol of the token.
   * @param decimals The number of decimals for the token.
   * @return The address of the newly created token.
   * Requirements:
   * - The caller must be the owner.
   */
  function createToken(
    string memory _name,
    string memory _symbol,
    uint8 decimals
  ) public OnlyOwner returns (address) {
    RahatToken _token = new RahatToken(_name, _symbol, address(this), decimals);
    address _tokenAddress = address(_token);
    emit TokenCreated(_tokenAddress);
    return _tokenAddress;
  }

  /**
   * @notice Mints a specified amount of tokens to the contract.
   * @param _token The address of the token to mint.
   * @param _amount The amount of tokens to mint.
   * Requirements:
   * - The caller must be the owner.
   */
  function mintToken(address _token, uint256 _amount) public OnlyOwner {
    RahatToken(_token).mint(address(this), _amount);
  }

  /**
   * @notice Mints tokens and approves a specified address to spend them.
   * @param _token The address of the token to mint.
   * @param _approveAddress The address to approve for spending the minted tokens.
   * @param _amount The amount of tokens to mint and approve.
   * @param _projectAddress The address of the project associated with the tokens.
   * Requirements:
   * - The caller must be the owner.
   * - The token address, approve address, and project address must not be zero.
   * - The project must be registered.
   * - The amount must be greater than zero.
   */
  function mintTokenAndApprove(
    address _token,
    address _approveAddress,
    uint256 _amount,
    address _projectAddress
  ) public OnlyOwner {
    require(_token != address(0), 'token address cannot be zero');
    require(_approveAddress != address(0), 'approve address cannot be zero');
    require(_projectAddress != address(0), 'approve address cannot be zero');
    require(_registeredProject[_projectAddress], 'project not registered');

    require(_amount > 0, 'amount cannot be zero');

    RahatToken token = RahatToken(_token);
    token.mint(address(this), _amount);
    token.approve(_approveAddress, _amount);
    emit TokenMintedAndApproved(_token, _approveAddress, _amount);
  }

  /**
   * @notice Adds a new owner to the specified token.
   * @param _token The address of the token.
   * @param _ownerAddress The address of the new owner to add.
   * Requirements:
   * - The caller must be the owner.
   */
  function addTokenOwner(
    address _token,
    address _ownerAddress
  ) public OnlyOwner {
    RahatToken(_token).addOwner(_ownerAddress);
  }

  /**
   * @notice Registers or unregisters a project.
   * @param _projectAddress The address of the project to register.
   * @param status A boolean indicating whether to register (true) or unregister (false) the project.
   */
  function registerProject(address _projectAddress, bool status) public {
    _registeredProject[_projectAddress] = status;
  }

  /**
   * @dev Checks if the contract supports a specific interface.
   * @param interfaceId The ID of the interface to check.
   * @return True if the interface is supported, false otherwise.
   */
  function supportsInterface(
    bytes4 interfaceId
  ) public view virtual override returns (bool) {
    return
      interfaceId == IID_RAHAT_DONOR || super.supportsInterface(interfaceId);
  }

  //#endregion
}
