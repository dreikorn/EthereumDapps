<template>
  <div>
    <navibar :coinbase=coinBase></navibar>
    <br/>
    <form>
      <div class="form-group">
        <label for="good">Enter Property Description</label>
        <input type="text" class="form-control" id="good" v-model="good">
        <label for="good">Enter Property Location</label>
        <input type="text" class="form-control" id="geoLocation" v-model="geoLocation">
        <label for="value">Enter Property Selling Price</label>
        <input type="number" class="form-control" id="value" v-model="value">
      </div>
      <button type="button" class="btn btn-primary" @click="deployOffer">Sell</button>
      <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="evil" v-model="evil">
        <label class="custom-control-label" for="evil">Evil</label>
      </div>
    </form>
    <br/>
    <div class="card" style="width: 30rem;">
      <div class="card-header" >{{contractAddressTitle}}</div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <input v-if="!deployingContract" type="text" class="form-control" id="contractAddress" v-model="contractAddress">
          <div class="progress" v-if="deployingContract">
            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Sell from '@/handlers/sell'
  import Navibar from "./Navibar";
  export default {
    components: {Navibar},
    data () {
      return {
        contractAddressTitle: "Contract Address",
        deployingContract: false,
        evil: false,
        coinBase: "",
        value: 0,
        good: "",
        geoLocation: "",
        contractAddress: "",
        we3 : window.web3
      }
    },
    beforeCreate () {
      Sell.init()
    },
    mounted(){
      this.getCoinBase()
    },
    methods: {
      deployOffer() {
        this.contractAddressTitle = "Deploying Contract"
        this.deployingContract = true
        Sell.deployOffer(this.value, this.good, this.geoLocation, this.evil)
          .then(contractAddress => {
            this.contractAddress = contractAddress
            this.contractAddressTitle = "Contract Address"
            this.deployingContract = false
          })
          .catch((error) => {
            this.contractAddressTitle = "Contract Deployment Failed"
            this.deployingContract = false
            console.error(error)
          })
      },
      getCoinBase() {
        Sell.getCoinBase().then(coinbase => this.coinBase = coinbase)
      }
    }
  }
</script>
