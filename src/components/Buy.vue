<template>
  <div>
    <navibar :coinbase=coinBase></navibar>
    <br/>
    <form>
      <div class="form-group">
        <label for="contractAddress">Contract Address</label>
        <input type="text" class="form-control" id="contractAddress" v-model="contractAddress">
      </div>
      <button type="button" class="btn btn-primary" @click="loadContract">Find</button>
    </form>
    <br/>
    <br/>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Offer Details</h5>
        <table class="table table-bordered">
          <tbody>
          <tr>
            <td>Offer</td>
            <td id="description">{{ description }}</td>
          </tr>
          <tr>
            <td>Location</td>
            <td id="geoLocation">{{ geoLocation }}</td>
          </tr>
          <tr>
            <td>Seller</td>
            <td id="seller" >{{ seller }}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td id="value" >{{ value }}</td>
          </tr>
          <tr>
            <td>Contract Balance</td>
            <td id="balance" >{{ balance }}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td id="status" >{{ state }}</td>
          </tr>
          </tbody>
        </table>
        <br/>
        <button type="button" class="btn btn-primary" @click="buyProperty" v-if="state == 0">Buy</button>
        <button type="button" class="btn btn-primary" @click="confirmReceipt" v-if="state == 1">Public Register</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Buy from '@/handlers/buy'
  import Navibar from "./Navibar";
  export default {
    components: {Navibar},
    data () {
      return {
        coinBase: "",
        contractAddress: this.$route.query.contract,
        description: "",
        geoLocation: "",
        seller: "",
        value: "",
        balance: "",
        state: "",
        we3 : window.web3
      }
    },
    beforeCreate () {
      Buy.init()
    },
    mounted(){
      this.getCoinBase()
    },
    methods: {
      loadContract() {
        Buy.loadProperty(this.contractAddress).then(contract => {
          contract.value.then(value=>this.value=""+(window.web3.fromWei(value, "ether")))
          this.balance=""+window.web3.fromWei(contract.balance, "ether")
          contract.description.then(description=>this.description=""+description)
          contract.geoLocation.then(geoLocation=>this.geoLocation=""+geoLocation)
          contract.seller.then(seller=>this.seller=""+seller)
          contract.state.then(state=>{
            this.state=""+state
          })
        })
      },
      buyProperty() {
        let self = this
        Buy.buyProperty(this.contractAddress, 1*this.value).then(result => {
          self.state = self.state*1 + 1
        })
      },
      confirmReceipt() {
        let self = this
        Buy.confirmReceipt(this.contractAddress).then( result => {
          self.state = self.state*1 + 1
        })
      },
      getCoinBase() {
        Buy.getCoinBase().then(coinbase => this.coinBase = coinbase)
      }
    }
  }
</script>
