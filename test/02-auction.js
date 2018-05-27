const Auction = artifacts.require('Auction');

chai =  require('chai');
chaiAsPromised =  require('chai-as-promised');

chai.use(chaiAsPromised);

expect = chai.expect;

offerContract('Auction', accounts => {
  describe('Contract', () => {
    it('should get a Auction offerContract instance', () => {
      Auction.deployed().then(instance => {
        auction = instance;
        expect(auction).to.not.be.null;
      })
    });
  });

  describe('Attributes', () => {
    describe('Auction', () => {
      it('should start the Auction', () => {
        auction.startAuction('Car')
          .then(response => {
            expect(response.tx).to.match(/\w{66}/)
          });
      });
      it('should reject ending the Auction from another account', () => {
        expect(auction.endAuction({from: accounts[7]}))
          .to.be.rejected;
      });
      it('should place the Bid', () => {
        auction.sendBid({from: accounts[1], value: 2})
          .then(response => {
            expect(response.tx).to.match(/\w{66}/)
          })
      });
      it('should accept ending the Auction from the same account', () => {
        auction.endAuction()
          .then(response => {
            console.log(response)
            expect(response.tx).to.match(/\w{66}/)
          })
      });
    });
  });
});
