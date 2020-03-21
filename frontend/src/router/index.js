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
import ManageRoom from '@/components/Admin/ManageRoom'
import ManageToolReport from '@/components/Admin/ManageToolReport'
import Forbidden403 from '@/components/403'
import NotFound404 from '@/components/404'
import Permission from '@/components/Permission'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'SignIn',
      component: SignIn,
      meta: {
        guest: true,
        requiresAuth: false
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
        requiresAuth: true,
        isAdmin: true
      }
    },
    {
      path: '/admin/manage/user',
      name: 'ManageUser',
      component: ManageUser,
      meta: {
        requiresAuth: true,
        isAdmin: true
      }
    },
    {
      path: '/admin/manage/tool/report',
      name: 'ManageToolReport',
      component: ManageToolReport,
      meta: {
        requiresAuth: true,
        isAdmin: true
      }
    },
    {
      path: '/admin/manage/report/tool',
      name: 'ManageReportToolBroken',
      component: ManageReportToolBroken,
      meta: {
        requiresAuth: true,
        isAdmin: true
      }
    },
    {
      path: '/admin/manage/report/room',
      name: 'ManageReportRoom',
      component: ManageReportRoom,
      meta: {
        requiresAuth: true,
        isAdmin: true
      }
    },
    {
      path: '/admin/manage/room',
      name: 'ManageRoom',
      component: ManageRoom,
      meta: {
        requiresAuth: true,
        isAdmin: true
      }
    },
    {
      path: '/403',
      name: 'Forbidden',
      component: Forbidden403,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/permission',
      name: 'Permission',
      component: Permission,
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
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') == null) {
      next({
        path: '/',
        params: { nextUrl: to.fullPath }
      })
    } else {
      let user = JSON.parse(localStorage.getItem('user'))
      if (to.matched.some(record => record.meta.isAdmin)) {
        if (user.isAdmin) {
          next()
        }
        else {
          next({
            path: '/403',
            params: { nextUrl: to.fullPath }
          })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('token') == null) {
      next()
    } else {
      next({
        path: '/home',
        params: { nextUrl: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
