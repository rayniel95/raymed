// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import {GenericNft} from "./GenericNft.sol";


contract Doctor is GenericNft {

    constructor(
        address adminNftContractAddress
    ) GenericNft("Doctor", "DTK", adminNftContractAddress) {}

    function _baseURI() internal pure override returns (string memory) {
        return "koko";
    }

}