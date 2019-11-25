import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/SignIn'
import Booking from '@/components/Booking'
import ManageBooking from '@/components/ManageBooking'
import ReportDamaged from '@/components/ReportDamaged'
import Setting from '@/components/Setting'
import Blacklist from '@/components/Blacklist'
import ManageReportDamaged from '@/components/ManageReportDamaged'
import ManageReportRoom from '@/components/ManageReportRoom'

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
      path: '/manage/booking',
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
    },
    {
      path: '/manage/report/damaged',
      name: 'ManageReportDamaged',
      component: ManageReportDamaged
    },
    {
      path: '/manage/report/room',
      name: 'ManageReportRoom',
      component: ManageReportRoom
    }
  ],
  mode: 'history'
})
