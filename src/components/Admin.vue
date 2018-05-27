<template>
  <div>
    <navibar :coinbase=auctionData.coinbase></navibar>
    <br/>
    <auction-status :running=running :auctionGood=auctionGood :auctioneer=auctioneer />
    <br/>
    <form v-if="ended">
      <div class="form-group">
        <label for="bid">Start Auction</label>
        <input type="text" class="form-control" id="bid" v-model="auctionGood">
      </div>
      <button type="button" class="btn btn-primary" @click="startAuction">Start</button>
    </form>
    <br/>
    <button v-if="running" type="button" class="btn btn-primary" @click="endAuction">End Auction</button>
    <br/>
    <br/>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Auction History</h5>
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Auctioneer Address</th>
            <th scope="col">Good</th>
            <th scope="col">Transactionhash</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in changeHistory">
            <td>{{ item.args.auctioneer }}</td>
            <td>{{ item.args.good }}</td>
            <td>{{ item.transactionHash.substring(0, 20) }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import Admin from '@/handlers/admin'
  import Status from '@/handlers/status'
  import Navibar from "./Navibar";
  import AuctionStatus from "./AuctionStatus";

  export default {
    components: {AuctionStatus, Navibar},
    data () {
      return {
        running: false,
        ended: true,
        auctioneer: "",
        auctionGood: "",
        auctionData: {},
        changeHistory: []
      }
    },
    beforeCreate () {
      Admin.init()
      Status.init()
    },
    mounted () {
      this.getAdminStats()
    },
    methods: {
      getAdminStats () {
        let auctionData = Status.getAuctionData()
        auctionData.good.then(good => this.auctionGood = good).catch(console.error)
        auctionData.running.then(running => {
          this.running = running
          this.ended = !running
        }).catch(console.error)
        auctionData.auctioneer.then(auctioneer => this.auctioneer = auctioneer).catch(console.error)
        this.auctionData = auctionData
        Admin.getChangeHistory().then(changeHistory => this.changeHistory = changeHistory).catch(console.error)
      },
      startAuction() {
        Admin.startAuction(this.auctionGood)
      },
      endAuction() {
        Admin.endAuction()
      }
    }
  }
</script>
