import contract from 'truffle-contract'
import AuctionContract from '@contracts/Auction.json'

const Admin = {
  contract: null,
  instance: null,

  init: () => {
    let self = this
    return new Promise((resolve, reject) => {
      self.contract = contract(AuctionContract)
      self.contract.setProvider(window.web3.currentProvider)
      self.instance = self.contract.deployed().then(i => i).catch(console.error)
      window.web3.eth.getCoinbase((error, coinbase) => console.log(coinbase))
    })
  },

  getAuctionData: () => {
    let self = this
    let result = {}
    result.good = self.instance.then(auction => auction.good())
    result.auctioneer = self.instance.then(auction => auction.auctioneer())
    result.running = self.instance.then(auction => auction.running())
    return result
  },

  getChangeHistory: () => {
    let self = this
    return new Promise((resolve, reject) => {
      self.instance
        .then(auction => {
          auction.AuctionStarted({}, {fromBlock: 0, toBlock: 'latest'}).get((error, logs) => {resolve(logs)})
        })
    })
  },

  endAuction: () => {
    let self = this
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase(
        (error, coinbase) => {
          if (error) reject(error)
          self.instance
            .then(auction => auction.endAuction({from: coinbase}))
            .then(res => console.info("Auction ended successfully: " + res))
            .catch(err => console.error("Auction End rejected with: " + err))
        })
    })
  },

  startAuction: good => {
    let self = this
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase(
        (error, coinbase) => {
          if (error) reject(error)
          self.instance
            .then(auction => auction.startAuction(good, {from: coinbase}))
            .then(res => console.info("Auction started successfully: " + res))
            .catch(err => console.error("Auction Start rejected with: " + err))
        })
    })
  }
}

export default Admin
