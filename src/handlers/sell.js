import contract from 'truffle-contract'
import PropertyContract from '@contracts/Property.json'
import EvilSellerContract from '@contracts/EvilSeller.json'
import LedgerContract from '@contracts/PublicLedger.json'

const Sell = {
  propertyContract: null,
  evilSellerContract: null,
  evilSellerContractInstance: null,
  ledgerContract: null,
  ledgerContractInstance: null,

  init: () => {
    let self = this
    return new Promise((resolve, reject) => {
      self.propertyContract = contract(PropertyContract)
      self.propertyContract.setProvider(window.web3.currentProvider)
      self.evilSellerContract = contract(EvilSellerContract)
      self.evilSellerContract.setProvider(window.web3.currentProvider)
      self.evilSellerContract.deployed().then(i => {
        self.evilSellerContractInstance = i
      }).catch(console.error)
      self.ledgerContract = contract(LedgerContract)
      self.ledgerContract.setProvider(window.web3.currentProvider)
      self.ledgerContract.deployed().then(i => {
        self.ledgerContractInstance = i
      }).catch(console.error)
    })
  },

  getCoinBase: () => {
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase((error, coinbase) => resolve(coinbase))
    })
  },

  //You should do better than just returning the address, Use Registry Pattern
  //ore an Application Backend to maintain offerContract address directly here
  deployOffer: (value, description, geoLocation, evil) => {
    let self = this
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase(
        (error, coinbase) => {
          if (error) reject(error)
          if(evil){
            self.evilSellerContractInstance.evilSell(self.ledgerContractInstance.address, window.web3.toWei(value, "ether"), geoLocation, description, {from: coinbase})
              .then((receipt) => {
                console.log(receipt)
                self.evilSellerContractInstance.compromisedOffer()
                  .then(address => resolve(address))
                  .catch(console.error)
              }).catch(console.error)
          } else {
            self.propertyContract.new(self.ledgerContractInstance.address, window.web3.toWei(value, "ether"),  geoLocation, description, {from: coinbase})
              .then(contract => {
                console.log(contract)
                resolve(contract.address)
              })
          }
        })
    })
  }

}

export default Sell
