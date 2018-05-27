import contract from 'truffle-contract'
import PropertyContract from '@contracts/Property.json'
import LedgerContract from '@contracts/PublicLedger.json'

const PropertyBase = {
  propertyContract: null,
  ledgerContract: null,
  ledgerContractInstance: null,

  init: (self) => {
    return new Promise((resolve, reject) => {
      self.propertyContract = contract(PropertyContract)
      self.propertyContract.setProvider(window.web3.currentProvider)
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
  }
}

export default PropertyBase
