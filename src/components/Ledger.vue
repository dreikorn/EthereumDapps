<template>
  <div>
    <navibar :coinbase=coinBase></navibar>
    <br/>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Ledger Entries</h5>
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Property</th>
            <th scope="col">Location</th>
            <th scope="col">Seller</th>
            <th scope="col">Owner</th>
            <th scope="col"> </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in ledgerEntries">
            <td>{{ item.entry[2] }}</td>
            <td>{{ item.entry[1] }}</td>
            <td>{{ item.entry[3].substring(0, 16) }}</td>
            <td>{{ item.entry[4].substring(0, 16) }}</td>
            <td>
              <a :href="buyUrl+item.entry[0]" type="button" class="btn btn-primary" >Check Contract</a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import Ledger from '@/handlers/ledger'
  import Navibar from "./Navibar";
  export default {
    components: {Navibar},
    name: "Ledger",
    data () {
      return {
        coinBase: "",
        buyUrl: "/buy?contract=",
        ledgerEntries: [],
        we3 : window.web3
      }
    },
    beforeCreate () {
      Ledger.init()
    },
    mounted(){
      this.getCoinBase()
      this.getLedger()
    },
    methods: {
      getCoinBase() {
        Ledger.getCoinBase().then(coinbase => this.coinBase = coinbase)
      },
      getLedger(){
        Ledger.getLedgerEntries().then(entries => this.ledgerEntries = entries)
      }
    }
  }
</script>
