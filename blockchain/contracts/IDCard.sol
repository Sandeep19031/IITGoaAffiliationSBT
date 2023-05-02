//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./MinterRole.sol";

contract SBT is ERC721URIStorage, MinterRole {
    address public admin;

    struct studentSbt {
        string StudentName;
        string Branch;
        string RollNo;
        string SBTtype;
        string EmergencyContractNumber;
        string ValidUpto;
        uint256 sbtId;
    }

    uint256 public SBT_ID = 1;
    mapping(uint256 => studentSbt) public studentSbtInfo;
    mapping(address => uint256) public studentSbtId;
    mapping(address => studentSbt) public studentSbtDetails;
    event SBT_mint(
        address minter,
        address receiver,
        uint256 SBT_ID,
        string tokenURI
    );
    event SBT_burn(uint256 SBT_ID);

    constructor() ERC721("Affiliation_IITGoaSbt", "SBT") {
        admin = _msgSender();
    }

    function mint(
        address _to,
        studentSbt memory _studentSbt,
        string memory _tokenURI
    ) external onlyMinter(_msgSender()) {
        _mint(_to, SBT_ID);
        _studentSbt.sbtId = SBT_ID;
        studentSbtInfo[SBT_ID] = _studentSbt;
        studentSbtDetails[_to] = _studentSbt;
        studentSbtId[_to] = SBT_ID;
        _setTokenURI(SBT_ID, _tokenURI);
        emit SBT_mint(admin, _to, SBT_ID, _tokenURI);
        SBT_ID++;
    }

    function updateSbtdata(
        uint256 _sbtId,
        studentSbt memory _studentSbt
    ) external onlyMinter(_msgSender()) {
        studentSbtInfo[_sbtId] = _studentSbt;
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
