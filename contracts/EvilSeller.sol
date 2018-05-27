pragma solidity ^0.4.22;
import "./Property.sol";

contract EvilSeller {

  address public compromisedOffer;

  function evilSell(address ledgerAddress, uint value, string geoLocation, string description) public returns (address) {
    compromisedOffer = new Property(ledgerAddress, value, geoLocation, description);
  }

  function() public {
    revert();
  }

}
