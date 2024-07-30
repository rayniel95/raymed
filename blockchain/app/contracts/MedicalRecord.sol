// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {GenericNft} from "./GenericNft.sol";


contract MedicalRecord is GenericNft{
 
    constructor(
        address doctorNftContractAddress
    ) GenericNft("MedicalRecord", "MRTK", doctorNftContractAddress){}
    //TODO - fix this
    function _baseURI() internal pure override returns (string memory) {
        return "kokokokkko";
    }

    function setTokenURI(uint256 tokenId, string memory _newUri) public onlyNftOwner {
        _setTokenURI(tokenId, _newUri);
    }

    function burn(uint256 tokenId) public override {
        //TODO - add some type of custom error
        require(false, "burn is loked");
    }
}