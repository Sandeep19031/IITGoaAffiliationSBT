//SPDX-License-Identifier:UNLICENSED
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./MinterRole.sol";

contract  WAGMI_CUP_SBT is ERC721URIStorage, MinterRole {
    address public owner;

    struct sbt {
        string Title;
        string SbtCategory;
        // uint256 SbtId; 
        string DateOfIssue;
        string DeSocMembershipStatus;
        uint256 REPTokens;
        string RepTokenStatus;
        string Issuer;
        uint16 RunsScored;
        uint16 WicketsTaken;
        uint16 NoOfCatches;
        uint16 NoOfRunOuts;
        uint16 NoOfStumpings;
    }

    uint256 public SBT_ID = 1;
    mapping(uint256 => sbt) public sbtInfo;
    mapping(address => uint256) public userSbtID;
    mapping(address => sbt) public userSbtInfo;
    event SBT_mint(address minter, address receiver, uint256 SBT_ID, string tokenURI);
    event SBT_burn(uint256 SBT_ID);

    constructor() ERC721("WagmiCupPOAP_SoulBoundToken", "SBT") {
        owner = _msgSender();
    }


    function mint(address _to, sbt memory _sbt, uint256 rep, string memory _tokenURI)
        external
        onlyMinter(_msgSender())
    {
        _mint(_to, SBT_ID);
        _setTokenURI(SBT_ID, _tokenURI);
        _sbt.Title = "WAGMI Cup POAP";
        _sbt.SbtCategory = "Credential";
        // _sbt.SbtId =  SBT_ID;
        _sbt.DateOfIssue = "29th October 2022";
        _sbt.DeSocMembershipStatus = "Inactive";
        _sbt.REPTokens = rep;
        _sbt.RepTokenStatus = "Unattested";
        _sbt.Issuer = "EQ8 Desoc";
        userSbtID[_to] = SBT_ID;
        sbtInfo[SBT_ID] = _sbt;
        userSbtInfo[_to] = _sbt;

        emit SBT_mint(owner, _to, SBT_ID,_tokenURI);
        SBT_ID++;
    }

    function burn(uint256 _sbtId) external onlyMinter(_msgSender()) {
        _burn(_sbtId);
        emit SBT_burn(_sbtId);
    }

    function _transfer(
        address from,
        address to,
        uint256 _sbtId
    ) internal override {
        require(false, "NON-transferable");
        super._transfer(from, to, _sbtId);
    }
}