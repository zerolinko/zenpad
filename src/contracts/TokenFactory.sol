// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BondingToken.sol";

contract TokenFactory {
    address public feeCollector = 0x6c2Bd887389Fe2f8Df6cBEe1A6FbEd6C0dD99154;
    uint256 public creationFee = 100 ether;

    address[] public tokens;

    event TokenCreated(address token, address creator);

    function createToken(
        string memory name,
        string memory symbol,
        string memory description,
        string memory imageURI,
        uint256 totalSupply,
        uint256 initialBuyPercent
    ) external payable {
        require(msg.value == creationFee, "Require exactly 100 ZTC");
        require(totalSupply <= 10_000_000, "Max supply exceeded");
        require(initialBuyPercent >= 1 && initialBuyPercent <= 100, "Initial buy must be 1%-100%");

        payable(feeCollector).transfer(msg.value);

        BondingToken token = new BondingToken(
            name,
            symbol,
            description,
            imageURI,
            msg.sender,
            totalSupply,
            feeCollector
        );

        uint256 initialAmount = (totalSupply * initialBuyPercent) / 100;
        token.initialBuy{value: initialAmount * 1 ether}(msg.sender, initialAmount);

        tokens.push(address(token));
        emit TokenCreated(address(token), msg.sender);
    }

    function getTokens() external view returns (address[] memory) {
        return tokens;
    }
}
