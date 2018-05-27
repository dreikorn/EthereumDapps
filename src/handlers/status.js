import contract from 'truffle-contract'
import AuctionContract from '@contracts/Auction.json'

const Status = {
  contract: null,
  instance: null,

  init: () => {
    let self = this
    return new Promise((resolve, reject) => {
      self.contract = contract(AuctionContract)
      self.contract.setProvider(window.web3.currentProvider)
      self.instance = self.contract.deployed().then(i => i).catch(console.error)
    })
  },

  getAuctionData: () => {
    let self = this
    let result = {}
    result.good = self.instance.then(auction => auction.good())
    result.auctioneer = self.instance.then(auction => auction.auctioneer())
    result.running = self.instance.then(auction => auction.running())
    window.web3.eth.getCoinbase((error, coinbase) => result.coinbase = coinbase)
    return result
  },
}

export default Status
