import contract from 'truffle-contract'
import PropertyContract from '@contracts/Property.json'
import LedgerContract from '@contracts/PublicLedger.json'

const Buy = {
  propertyContract: null,
  ledgerContract: null,
  ledgerContractInstance: null,

  init: () => {
    let self = this
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
  },

  loadProperty: (address) => {
    let self = this
    let result = {}
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase(
        (error, coinbase) => {
          if (error) reject(error)
          self.propertyContract.at(address).then(contract => {
            result.geoLocation = contract.geoLocation()
            result.description = contract.description()
            result.value = contract.value()
            result.state = contract.state()
            result.seller = contract.seller()
            web3.eth.getBalance(address, (error, balance) => {
              console.log(balance)
              result.balance = balance
              resolve(result)
            })
          })
        })
    })
  },

  buyProperty: (address, bid) => {
    let self = this
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase(
        (error, coinbase) => {
          if (error) reject(error)
          self.propertyContract.at(address)
            .then(contract => {
              contract.sendMoney({from: coinbase, to: address, value: window.web3.toWei(bid, "ether")})
                .then(res => {
                  console.info("Ether sent successfully: ")
                  console.log(res)
                  resolve(res)
                })
                .catch(err => {
                  console.error("Ether rejected with: ")
                  console.error(err)
                  reject(err)
                })
            })
        })
    })
  },

  confirmReceipt: (address) => {
    let self = this
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase(
        (error, coinbase) => {
          self.propertyContract.at(address)
            .then(contract => {
              contract.confirmReceived(self.ledgerContractInstance.address, {from: coinbase})
                .then(res => {
                  console.info("Receipt sent successfully: ")
                  console.log(res)
                  resolve(res)
                })
                .catch(err => {
                  console.error("Receipt rejected with: ")
                  console.error(err)
                  reject(err)
                })
            })
        })
    })
  }

}

export default Buy
