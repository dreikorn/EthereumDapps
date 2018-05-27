import contract from 'truffle-contract'
import AuctionContract from '@contracts/Auction.json'

const Auction = {
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

  getBid: () => {
    let self = this
    return new Promise((resolve, reject) => {
      self.instance
        .then(auction => auction.bid())
        .then(bid => resolve(window.web3.fromWei(bid, "ether")))
        .catch(error => reject(error))
    })
  },


  getHighestBidder: () => {
    let self = this
    return new Promise((resolve, reject) => {
      self.instance
        .then(auction => auction.highestBidder())
        .then(highestBidder => resolve(highestBidder))
        .catch(error => reject(error))
    })
  },

  getBidHistory: () => {
    let self = this
    return new Promise((resolve, reject) => {
      self.instance
        .then(auction => {
          window.web3.eth.getBalance(auction.address, (error, balance) => console.log(balance))
          console.log(auction.address)
          auction.BidReceived({}, {fromBlock: 0, toBlock: 'latest'}).get((error, logs) => {
            resolve(logs)
          })
        })
    })
  },

  setBid: bid => {
    let self = this
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase(
	    (error, coinbase) => {
          if (error) reject(error)
          self.instance
            .then(auction => auction.sendBid({from: coinbase, to: auction.address, value: window.web3.toWei(bid, "ether")}))
            .then(res => console.info("bid sent successfully: " + res))
            .catch(err => console.error("bid rejected with: " + err))
        })
    })
  }
}

export default Auction
