// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.8.2 <0.9.0;

import "./PriceConvertor.sol";

error NoOwner();

contract FundMe {
    using PriceConvertor for uint256;
    mapping(address => uint256) public addressToAmountFunded;
    address[] public funders;
    address public i_owner;
    uint public constant MINIMUM_USD = 50 * 10 ** 18;

    constructor() {
        i_owner = msg.sender;
    }

    function fund() public payable {
        require(msg.value.getConversionRate() >= MINIMUM_USD, "You need to spend more ETH!");
        addressToAmountFunded[msg.sender] += msg.value;
        funders.push(msg.sender);
    }

    function getVersion() public view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            0xad96A3F028Ee7440DBBDCd850405f611eb0C5b22
        );
        return priceFeed.version();
    }

    modifier onlyOwner() {
        if (msg.sender != i_owner) revert NoOwner();
        _;
    }

    function withdraw() public onlyOwner {
        for (uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }

        funders = new address[](0);
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed!");
    }

    fallback() external payable {
        fund();
    }

    receive() external payable {
        fund();
    }
}
