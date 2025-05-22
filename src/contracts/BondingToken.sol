// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC20.sol";

contract BondingToken {
    string public name;
    string public symbol;
    string public description;
    string public imageURI;
    uint256 public totalSupplyCap;
    uint256 public totalMinted;
    uint256 public reserve;
    address public creator;
    address public ztc;
    address public feeCollector;
    uint256 public feePercent = 50; // 0.5%

    mapping(address => uint256) public balances;

    event Bought(address indexed user, uint256 amount, uint256 price);
    event Sold(address indexed user, uint256 amount, uint256 refund);

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _description,
        string memory _imageURI,
        address _creator,
        uint256 _supplyCap,
        address _ztc,
        address _feeCollector
    ) {
        name = _name;
        symbol = _symbol;
        description = _description;
        imageURI = _imageURI;
        creator = _creator;
        totalSupplyCap = _supplyCap;
        ztc = _ztc;
        feeCollector = _feeCollector;
    }

    function priceToBuy(uint256 amount) public view returns (uint256) {
        return amount * 1e18; // flat price for simplicity
    }

    function priceToSell(uint256 amount) public view returns (uint256) {
        return amount * 1e18;
    }

    function buy(address to, uint256 amount) public {
        require(totalMinted + amount <= totalSupplyCap, "Exceeds cap");

        uint256 cost = priceToBuy(amount);
        uint256 fee = (cost * feePercent) / 10000;

        IERC20(ztc).transferFrom(msg.sender, feeCollector, fee);
        IERC20(ztc).transferFrom(msg.sender, address(this), cost - fee);

        balances[to] += amount;
        totalMinted += amount;
        reserve += cost - fee;

        emit Bought(to, amount, cost);
    }

    function sell(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Not enough balance");

        uint256 refund = priceToSell(amount);
        uint256 fee = (refund * feePercent) / 10000;

        balances[msg.sender] -= amount;
        totalMinted -= amount;
        reserve -= refund - fee;

        IERC20(ztc).transfer(feeCollector, fee);
        IERC20(ztc).transfer(msg.sender, refund - fee);

        emit Sold(msg.sender, amount, refund);
    }
}
