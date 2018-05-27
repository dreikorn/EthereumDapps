import Vue from 'vue'
import Router from 'vue-router'
import Auction from '@/components/Auction'
import Admin from '@/components/Admin'
import Sell from '@/components/Sell'
import Buy from '@/components/Buy'
import Ledger from '@/components/Ledger'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Auction',
      component: Auction
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/sell',
      name: 'Sell',
      component: Sell
    },
    {
      path: '/buy',
      name: 'Buy',
      component: Buy
    },
    {
      path: '/ledger',
      name: 'Ledger',
      component: Ledger
    }
  ]
})
