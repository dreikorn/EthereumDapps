<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Demo Dapps</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="auctionNavbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Auction Dapp
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="nav-link" href="/admin">Publish / End</a>
            <a class="nav-link" href="/">Place Bid</a>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="storeNavbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Real Estate Dapp
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="nav-link" href="/sell">Sell</a>
            <a class="nav-link" href="/buy">Buy</a>
            <div class="dropdown-divider"></div>
            <a class="nav-link" href="/ledger">Ledger</a>
          </div>
        </li>
      </ul>
      <span v-if="coinbase" class="navbar-text">Your account: {{coinbase}}</span>
    </div>
  </nav>
</template>

<script>
    export default {
        name: "Navibar",
      props: {
        coinbase: {
          type: String,
          required: false
        }
      }
    }
</script>
