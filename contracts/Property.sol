pragma solidity ^0.4.22;
import "./PublicLedger.sol";

contract Property {

  uint public value;
  string public geoLocation;
  string public description;
  address public seller;
  address public buyer;
  enum State { Open, Locked, Sold }
  State public state;

  //In a real world Property Real Estate System rather a
  //trustworthy Oracle would initially feed in this data
  constructor(address ledgerAddress, uint _value, string _geoLocation, string _description) public{
    state = State.Open;
    seller = msg.sender;
    value = _value;
    description = _description;
    geoLocation = _geoLocation;
    PublicLedger publicLedger = PublicLedger(ledgerAddress);
    publicLedger.registerProperty(address(this), msg.sender, geoLocation, description, msg.sender);
  }

  modifier condition(bool _condition) {
    require(
      _condition,
        "Condition not met"
    );
    _;
  }

  modifier onlyBuyer() {
    require(
      msg.sender == buyer,
      "Only buyer can do this."
    );
    _;
  }

  modifier onlySeller() {
    require(
      msg.sender == seller,
      "Only seller can do this."
    );
    _;
  }

  modifier inState(State _state) {
    require(
      state == _state,
      "Invalid state."
    );
    _;
  }

  event Aborted();
  event PurchaseConfirmed();
  event ItemReceived();

  function sendMoney() public inState(State.Open) condition(msg.value ==  value) payable
  {
    emit PurchaseConfirmed();
    buyer = msg.sender;
    state = State.Locked;
  }

  //never implement this in a real life application as a fraudulent buyer could use
  //an intermediary offerContract to block the transfer of the funds to the seller
  //use the withdraw pattern to avoid unresolvable lock-in scenarios
  function confirmReceived(address ledgerAddress) public onlyBuyer inState(State.Locked) {
    state = State.Sold;
    seller.transfer(address(this).balance);
    PublicLedger publicLedger = PublicLedger(ledgerAddress);
    publicLedger.registerProperty(address(this), msg.sender, geoLocation, description, seller);
  }
}
