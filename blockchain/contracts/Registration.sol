// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "upgradeability/CustomOwnable.sol";
import "./BasicMetaTransaction.sol";
import "contracts/WAGMI_CUP_SBT.sol";
// import "./EQ8_SBT.sol";

// import "./interfaces/ISBT721.sol";
import "contracts/REP_Points.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract Registration is BasicMetaTransaction, CustomOwnable {
    mapping(address => bool) public isPoaped;
    address public wagmiCup_SBT;
    address public repContract;
    uint256 repReward;

    constructor(
        address _wagmiCup_SBT,
        address _repContract,
        uint256 _repReward
    ) {
        _setOwner(_msgSender());
        wagmiCup_SBT = _wagmiCup_SBT;
        repReward = _repReward;
        repContract = _repContract;
    }

    function getWagmiCupPOAP(
        WAGMI_CUP_SBT.sbt memory _sbt,
        string memory _tokenURI,
        address to
    ) external {
        address user = to;
        require(!isPoaped[user], "User has WagmiCup POAP already minted");
        isPoaped[user] = true;
        repReward = _sbt.REPTokens;
        RepPoints(repContract)._mint(user, repReward * 10**18);
        WAGMI_CUP_SBT(wagmiCup_SBT).mint(user, _sbt, repReward, _tokenURI);
    }

    function getRepPoints(uint16[] memory arr, bool flag)
        external
        pure
        returns (uint256)
    {
        uint256 rep = arr[0] *
            10 +
            arr[1] *
            200 +
            arr[2] *
            100 +
            arr[3] *
            100 +
            arr[4] *
            100 +
            arr[5] *
            100 +
            arr[6] *
            100 +
            arr[7] *
            100 +
            arr[8] *
            100;
        if (flag) rep = rep + 500;
        return rep;
    }

    function setRepContract(address _rep) external onlyOwner {
        repContract = _rep;
    }

    function setRepPoints(uint256 _repReward) external onlyOwner {
        repReward = _repReward;
    }

    function setWagmiCupContract(address _wagmiCup) external onlyOwner {
        wagmiCup_SBT = _wagmiCup;
    }

    function _msgSender()
        internal
        view
        override(BasicMetaTransaction)
        returns (address sender)
    {
        if (msg.sender == address(this)) {
            bytes memory array = msg.data;
            uint256 index = msg.data.length;
            assembly {
                // Load the 32 bytes word from memory with the address on the lower 20 bytes, and mask those.
                sender := and(
                    mload(add(array, index)),
                    0xffffffffffffffffffffffffffffffffffffffff
                )
            }
        } else {
            return msg.sender;
        }
    }
}
