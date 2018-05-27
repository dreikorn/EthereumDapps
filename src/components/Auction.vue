<template>
  <div>
    <navibar :coinbase=auctionData.coinbase></navibar>
    <br/>
    <auction-status :running=running :highestBid=highestBid :highestBidder=highestBidder :auctionGood=auctionGood :auctioneer=auctioneer />
    <br/>
    <form v-if="running">
      <div class="form-group">
        <label for="bid">Enter Your Bid</label>
        <input type="number" class="form-control" id="bid" v-model="bid">
      </div>
      <button type="button" class="btn btn-primary" @click="setBid">Send</button>
    </form>
    <br/>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Bid History</h5>
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Bidder Address</th>
            <th scope="col">Good</th>
            <th scope="col">Amount</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in bidHistory">
            <td>{{ item.args.from }}</td>
            <td>{{ item.args.good }}</td>
            <td>{{ 1 * we3.fromWei(item.args.bid, "ether")}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Auction from '@/handlers/auction'
import Status from '@/handlers/status'
import Navibar from "./Navibar";
import AuctionStatus from "./AuctionStatus";
export default {
  components: {AuctionStatus, Navibar},
  data () {
    return {
      bid: 0,
      highestBid: 0,
      highestBidder: "",
      bidHistory: [],
      running: false,
      auctioneer: "",
      auctionGood: "",
      we3 : window.web3,
      auctionData: {}
    }
  },
  beforeCreate () {
    Auction.init()
    Status.init()
  },
  mounted () {
    this.getBidStats()
  },
  methods: {
    getBidStats () {
      Auction.getHighestBidder().then(highestBidder => this.highestBidder = highestBidder).catch(console.error)
      Auction.getBid().then(highestBid => {
        this.highestBid = 1*highestBid
        this.bid = 1*highestBid + 1.0
      }).catch(console.error)
      Auction.getBidHistory().then(bidHistory => this.bidHistory = bidHistory).catch(console.error)
      let auctionData = Status.getAuctionData()
      auctionData.good.then(good => this.auctionGood = good).catch(console.error)
      auctionData.running.then(running => {
        this.running = running
        this.ended = !running
      }).catch(console.error)
      auctionData.auctioneer.then(auctioneer => this.auctioneer = auctioneer).catch(console.error)
      this.auctionData = auctionData
    },
    setBid() {
      Auction.setBid(this.bid)
    }
  }
}
</script>
