// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract MedicalRecord is ERC721, ERC721Enumerable, ERC721URIStorage {
    uint256 private _nextTokenId;
    address internal _doctorNftContractAddress;

    constructor(
        address doctorNftContract
    ) ERC721("MedicalRecord", "MRTK") {
        _doctorNftContractAddress = doctorNftContract;
    }
    //TODO - add update function
    function _baseURI() internal pure override returns (string memory) {
        return "kokokokkko";
    }

    function safeMint(address to, string memory uri) public onlyDoctor(_doctorNftContractAddress) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function transferFrom(address from, address to, uint256 tokenId) public virtual override(ERC721, IERC721) {
        require(false, "Transfers are currently locked");
    }

    //TODO - maybe migrate this to a doctor access control contract or something
    modifier onlyDoctor(address doctorNftContractAddress) {
        require(_checkNFTOwnership(doctorNftContractAddress, _msgSender()), "Not a doctor");
        _;
    }

    function _checkNFTOwnership(
        address nftContractAddress, 
        address potentialOwner
    ) internal view returns (bool) {
        return IERC721(nftContractAddress).balanceOf(potentialOwner) > 0;
    }

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
