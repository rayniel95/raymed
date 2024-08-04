// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import {NftOwner} from "../access control/NftOwner.sol";


contract GenericNft is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Burnable, NftOwner {
    uint256 private _nextTokenId;
    address internal _ownerNftContractAddress;

    constructor(
        string memory tokenName,
        string memory tokenSymbol,
        address ownerNftContractAddress
    ) ERC721(tokenName, tokenSymbol) NftOwner(ownerNftContractAddress) {
        _ownerNftContractAddress = ownerNftContractAddress;
    }

    function safeMint(address to, string memory uri) public onlyNftOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        // approve(_ownerNftContractAddress, tokenId);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override(ERC721, IERC721) {
        //TODO - add some type of custom error
        require(false, "Transfers are currently locked");
    }

    function burn(uint256 tokenId) public virtual override onlyNftOwner {
        _burn(tokenId);
    }
    // The following functions are overrides required by Solidity.

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // function _isAuthorized(address owner, address spender, uint256 tokenId) internal view override virtual returns (bool) {
    //     return
    //         spender != address(0) &&
    //         (
    //             owner == spender || 
    //             isApprovedForAll(owner, spender) || 
    //             _getApproved(tokenId) == spender ||
    //             _checkNFTOwnership()
    //         );
    // }
}
