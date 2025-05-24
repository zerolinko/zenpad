// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BondingToken {
    string public name;
    string public symbol;
    string public description;
    string public imageURI;
    uint256 public totalSupplyCap;
    uint256 public totalMinted;
    address public creator;
    address public feeCollector;
    uint256 public price = 1 ether;
    uint256 public feePercent = 50; // 0.5%

    mapping(address => uint256) public balances;

    event Bought(address indexed user, uint256 amount, uint256 paid);
    event Sold(address indexed user, uint256 amount, uint256 refunded);

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _description,
        string memory _imageURI,
        address _creator,
        uint256 _supplyCap,
        address _feeCollector
    ) {
        name = _name;
        symbol = _symbol;
        description = _description;
        imageURI = _imageURI;
        creator = _creator;
        totalSupplyCap = _supplyCap;
        feeCollector = _feeCollector;
    }

    function initialBuy(address to, uint256 amount) external payable {
        require(totalMinted == 0, "Initial buy already done");
        _buy(to, amount);
    }

    function buy(uint256 amount) external payable {
        _buy(msg.sender, amount);
    }

    function _buy(address to, uint256 amount) internal {
        require(totalMinted + amount <= totalSupplyCap, "Exceeds cap");
        uint256 totalCost = price * amount;
        require(msg.value >= totalCost, "Insufficient ZTC sent");

        uint256 fee = (totalCost * feePercent) / 10000;
        payable(feeCollector).transfer(fee);
        balances[to] += amount;
        totalMinted += amount;

        emit Bought(to, amount, totalCost);
    }

    function sell(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Not enough tokens");
        uint256 refund = price * amount;
        uint256 fee = (refund * feePercent) / 10000;

        balances[msg.sender] -= amount;
        totalMinted -= amount;
        payable(feeCollector).transfer(fee);
        payable(msg.sender).transfer(refund - fee);

        emit Sold(msg.sender, amount, refund - fee);
    }
}
