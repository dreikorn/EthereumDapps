import contract from 'truffle-contract'
import LedgerContract from '@contracts/PublicLedger.json'

const Ledger = {
  ledgerContract: null,
  ledgerContractInstance: null,

  init: () => {
    let self = this
    return new Promise((resolve, reject) => {
      self.ledgerContract = contract(LedgerContract)
      self.ledgerContract.setProvider(window.web3.currentProvider)
      self.ledgerContract.deployed().then(instance => {
        self.ledgerContractInstance = instance
      }).catch(console.error)
    })
  },

  getCoinBase: () => {
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase((error, coinbase) => resolve(coinbase))
    })
  },

  getLedgerEntries: () => {
    let self = this;
    let result = []
    return new Promise((resolve, reject) => {
      self.ledgerContract.deployed().then(instance => {
        instance.propertyTableSize().then(size => {
          for(let i=0;i<size;i++){
            instance.propertyTable(i).then(entry => {
              result.push({
                "entry" : entry
              })
              if(result.length==size){resolve(result)}
            })
          }
        })
      })
    })
  },

}

export default Ledger
