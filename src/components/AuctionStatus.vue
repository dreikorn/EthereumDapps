<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Bid Status</h5>
      <table class="table table-bordered">
        <tbody>
        <tr v-if="highestBid">
          <td>
            Highest Current Bid
          </td>
          <td id="highestBid">{{ highestBid }}</td>
        </tr>
        <tr v-if="highestBidder">
          <td >
            Current Bid Leader
          </td>
          <td id="highestBidder" >{{ highestBidder }}</td>
        </tr>
        <tr>
          <td >
            Auction Running
          </td>
          <td id="running" >{{ running }}</td>
        </tr>
        <tr>
          <td >
            Auction Good
          </td>
          <td id="auctionGood" >{{ auctionGood }}</td>
        </tr>
        <tr>
          <td >
            Auctioneer
          </td>
          <td id="auctioneer" >{{ auctioneer }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AuctionStatus",
    props: {
        highestBid: {
          type: Number,
          required: false
        },
        highestBidder: {
          type: String,
          required: false
        },
        running: {
          type: Boolean,
          required: true
        },
        auctionGood: {
          type: String,
          required: true
        },
        auctioneer: {
          type: String,
          required: true
        }
      }
  }
</script>

