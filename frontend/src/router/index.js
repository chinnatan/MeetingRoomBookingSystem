import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SignIn from '@/components/SignIn'
import Booking from '@/components/Booking'
import History from '@/components/History'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/booking',
      name: 'Booking',
      component: Booking
    },
    {
      path: '/history',
      name: 'History',
      component: History
    }
  ],
  mode: 'history'
})
