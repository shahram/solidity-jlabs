// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.8.2 <0.9.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConvertor {
    function getPrice() internal view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            0xad96A3F028Ee7440DBBDCd850405f611eb0C5b22
        );
        (, int answer, , , ) = priceFeed.latestRoundData();
        return uint(answer * (10 ** 10));
    }

    function getConversionRate(uint256 ethAmount) internal view returns (uint256) {
        uint256 ethPrice = getPrice();
        uint256 ethAmountInUsd = (ethPrice * ethAmount) * (10 ** 18);
        return ethAmountInUsd;
    }
}
