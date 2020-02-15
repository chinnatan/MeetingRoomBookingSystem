import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/SignIn'
import Home from '@/components/Home'
import Booking from '@/components/Booking'
import ManageBooking from '@/components/ManageBooking'
import ReportToolBroken from '@/components/ReportToolBroken'
import Setting from '@/components/Admin/Setting'
import ManageUser from '@/components/Admin/ManageUser'
import ManageReportToolBroken from '@/components/Admin/ManageReport/ManageReportToolBroken'
import ManageReportRoom from '@/components/Admin/ManageReport/ManageReportRoom'
import NotFound404 from '@/components/404'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'SignIn',
      component: SignIn,
      meta: { 
        guest: true
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/booking',
      name: 'Booking',
      component: Booking,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/manage/booking',
      name: 'ManageBooking',
      component: ManageBooking,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/report/tool',
      name: 'ReportToolBroken',
      component: ReportToolBroken,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/setting',
      name: 'Setting',
      component: Setting,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/manage/user',
      name: 'ManageUser',
      component: ManageUser,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/manage/report/tool',
      name: 'ManageReportToolBroken',
      component: ManageReportToolBroken,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/manage/report/room',
      name: 'ManageReportRoom',
      component: ManageReportRoom,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      name: "NotFound404",
      component: NotFound404,
      meta: {
        requiresAuth: true
      }
    }
  ],
  mode: 'history',
  linkActiveClass: "active"
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('token') == null) {
          next({
              path: '/',
              params: { nextUrl: to.fullPath }
          })
      } else {
          let user = JSON.parse(localStorage.getItem('user'))
          if(to.matched.some(record => record.meta.is_admin)) {
              if(user.is_admin == 1){
                  next()
              }
              else{
                  next()
              }
          } else {
              next()
          }
      }
  } else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('token') == null){
          next()
      }
      else{
          next({ name: 'userboard'})
      }
  } else {
      next() 
  }
})

export default router
