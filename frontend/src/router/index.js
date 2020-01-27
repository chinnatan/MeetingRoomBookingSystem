import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/SignIn'
import Home from '@/components/Home'
import Booking from '@/components/Booking'
import ManageBooking from '@/components/ManageBooking'
import ReportToolBroken from '@/components/ReportToolBroken'
import Setting from '@/components/Admin/Setting'
import Blacklist from '@/components/Admin/Blacklist'
import ManageReportDamaged from '@/components/Admin/ManageReport/ManageReportDamaged'
import ManageReportRoom from '@/components/Admin/ManageReport/ManageReportRoom'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
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
      path: '/report/tool',
      name: 'ReportToolBroken',
      component: ReportToolBroken
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
  mode: 'history',
  linkActiveClass: "active"
})
