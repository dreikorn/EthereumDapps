pragma solidity ^0.4.22;

contract Auction {

  uint public bid;
  address public highestBidder;
  address public auctioneer;
  string public good;
  bool public running;

  event BidReceived(address from, string good, uint bid, uint timestamp);

  event AuctionStarted(address auctioneer, string good, uint timestamp);

  constructor() public {
    running = false;
    highestBidder = 0;
    bid = 0;
    good = "";
  }

  function sendBid() public payable {

    require(running);
    require(msg.value > bid);

    if(highestBidder != 0 && bid != 0){
      highestBidder.transfer(bid);
    }

    highestBidder = msg.sender;
    bid = msg.value;

    emit BidReceived(msg.sender, good, msg.value, now);
  }

  modifier onlyAuctioneer() {
    require(auctioneer == msg.sender);
    _;
  }

  function startAuction(string _good) public {

    require(!running);

    good = _good;
    auctioneer = msg.sender;
    running = true;

    emit AuctionStarted(msg.sender, _good, now);
  }

  function endAuction() public onlyAuctioneer {

    require(running);

    running = false;
    auctioneer.transfer(address(this).balance);
    highestBidder = 0;
    bid = 0;
    good = "";
  }
}
