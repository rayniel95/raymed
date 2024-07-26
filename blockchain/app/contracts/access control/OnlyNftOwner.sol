// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v5.0.0) (access/Ownable.sol)

pragma solidity ^0.8.20;

import {Context} from "@openzeppelin/contracts/utils/Context.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";


abstract contract NftOwner is Context {
    address private _nftContractAddress;

    /**
     * @dev The caller account is not authorized to perform an operation.
     */
    error NftOwnerUnauthorizedAccount(address account);

    /**
     * @dev The nft address is not a valid nft account. (eg. `address(0)`)
     */
    error NftOwnerInvalidNftAddress(address nft);

    /**
     * @dev Initializes the contract setting the address provided by the deployer as the initial owner.
     */
    constructor(address initialNft) {
        if (initialNft == address(0)) {
            revert NftOwnerInvalidNftAddress(address(0));
        }

        _nftContractAddress = initialNft;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyNftOwner() {
        _checkNFTOwnership();
        _;
    }

    /**
     * @dev Returns the address of the current nft contract.
     */
    function nft() public view virtual returns (address) {
        return _nftContractAddress;
    }

    function _checkNFTOwnership() internal view virtual{
        if (IERC721(_nftContractAddress).balanceOf(_msgSender()) == 0) {
            revert NftOwnerUnauthorizedAccount(_msgSender());
        }
    }
}