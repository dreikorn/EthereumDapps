var Auction = artifacts.require("./Auction.sol");
var EvilSeller = artifacts.require("./EvilSeller.sol");
var PublicLedger = artifacts.require("./PublicLedger.sol");

module.exports = function(deployer) {
  deployer.deploy(Auction);
  deployer.deploy(EvilSeller);
  deployer.deploy(PublicLedger);
};
