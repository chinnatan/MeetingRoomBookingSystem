import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SignIn from '@/components/SignIn'
import Booking from '@/components/Booking'
import ManageBooking from '@/components/ManageBooking'

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
      path: '/managebooking',
      name: 'ManageBooking',
      component: ManageBooking
    }
  ],
  mode: 'history'
})
