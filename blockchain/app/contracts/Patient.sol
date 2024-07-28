// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {NftOwner} from "./access control/NftOwner.sol";
import {GenericNft} from "./GenericNft.sol";


contract Patient is GenericNft {

    constructor(
        address doctorNftContractAddress
    ) GenericNft("Patient", "PTK", doctorNftContractAddress) {}

    function _baseURI() internal pure override returns (string memory) {
        return "koko";
    }
}