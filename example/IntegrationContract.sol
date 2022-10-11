// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "redstone-evm-connector/lib/contracts/message-based/PriceAware.sol";

contract IntegrationContract is PriceAware {
  function isSignerAuthorized(address _receviedSigner)
    public
    view
    virtual
    override
    returns (bool)
  {
    return _receviedSigner == 0xf786a909D559F5Dee2dc6706d8e5A81728a39aE9; // redstone-rapid
  }

  function getBTCPrice() public view returns (uint256) {
    return getPriceFromMsg("BTC");
  }
}
