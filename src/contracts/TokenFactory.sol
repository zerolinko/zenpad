// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BondingToken.sol";
import "./IERC20.sol";

contract TokenFactory {
    address public feeCollector = 0x6c2Bd887389Fe2f8Df6cBEe1A6FbEd6C0dD99154;
    uint256 public creationFee = 100 * 1e18; // 100 ZTC
    address public ztcToken;

    address[] public tokens;

    event TokenCreated(address token, address creator);

    constructor(address _ztcToken) {
        ztcToken = _ztcToken;
    }

    function createToken(
        string memory name,
        string memory symbol,
        string memory description,
        string memory imageURI,
        uint256 totalSupply,
        uint256 initialBuyPercent
    ) external {
        require(totalSupply <= 10_000_000, "Max supply exceeded");
        require(initialBuyPercent >= 1 && initialBuyPercent <= 100, "Initial buy must be between 1 and 100");

        // Transfer creation fee
        IERC20(ztcToken).transferFrom(msg.sender, feeCollector, creationFee);

        BondingToken token = new BondingToken(
            name,
            symbol,
            description,
            imageURI,
            msg.sender,
            totalSupply,
            ztcToken,
            feeCollector
        );

        uint256 initialAmount = (totalSupply * initialBuyPercent) / 100;
        token.buy{value: 0}(msg.sender, initialAmount);

        tokens.push(address(token));

        emit TokenCreated(address(token), msg.sender);
    }

    function getTokens() external view returns (address[] memory) {
        return tokens;
    }

    function getTokenCount() external view returns (uint256) {
        return tokens.length;
    }
}
