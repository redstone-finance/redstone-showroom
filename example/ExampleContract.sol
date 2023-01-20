// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "@redstone-finance/evm-connector/contracts/data-services/AvalancheDataServiceConsumerBase.sol";

contract ExampleContract is AvalancheDataServiceConsumerBase {
  function getTokensPrices() public view returns (uint256[2] memory) {
    bytes32[] memory dataFeedIds = new bytes32[](2);
    dataFeedIds[0] = bytes32("ETH");
    dataFeedIds[1] = bytes32("BTC");
    uint256[] memory values = getOracleNumericValuesFromTxMsg(dataFeedIds);
    uint256 ethPrice = values[0];
    uint256 btcPrice = values[1];
    return [ethPrice, btcPrice];
  }
}
