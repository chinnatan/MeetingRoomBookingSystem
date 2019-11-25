import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/SignIn'
import Booking from '@/components/Booking'
import ManageBooking from '@/components/ManageBooking'
import ReportDamaged from '@/components/ReportDamaged'
import Setting from '@/components/Setting'
import Blacklist from '@/components/Blacklist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
    },
    {
      path: '/report/damaged',
      name: 'ReportDamaged',
      component: ReportDamaged
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/blacklist',
      name: 'Blacklist',
      component: Blacklist
    }
  ],
  mode: 'history'
})
