// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {GenericNft} from "./common/GenericNft.sol";


contract Patient is GenericNft {
    //TODO - for this specific contract, there can only be one owner per token
    constructor(
        address doctorNftContractAddress
    ) GenericNft("Patient", "PTK", doctorNftContractAddress) {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function burn(uint256 tokenId) public override {
        //TODO - add some type of custom error
        require(false, "burn is loked");
    }
}