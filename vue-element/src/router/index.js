import Vue from 'vue'
import Router from 'vue-router'
// import index from '@/components/pages/index'
// import login from '@/components/login'
// import user from '@/components/pages/User/user'
// import active from '@/components/pages/Active/active'
// import welcome from '@/components/pages/welcome'
// import backstage from '@/components/pages/backstage'
// import addactive from '@/components/pages/Active/addactive'
// import acupdata from '@/components/pages/Active/acupdata'
// import activedetails from '@/components/pages/Active/activedetails'
// import award from '@/components/pages/Ward/award'
// import addaward from '@/components/pages/Ward/addaward'
// import upward from '@/components/pages/Ward/upward'
// import userinfo from '@/components/pages/User/userinfo'
// import expenditrue from '@/components/pages/Fund/expenditrue'
// import income from '@/components/pages/Fund/income'
// import findex from '@/components/pages/Fund/findex'
// import myplace from '@/components/pages/Front/myplace'
// import fronconent from '@/components/pages/Front/fronconent'
// import frontdetails from '@/components/pages/Front/frontdetails'
// import reqfront from '@/components/pages/Front/reqfront'
// import myactivereq from '@/components/pages/Front/myactivereq'
// import mywreq from '@/components/pages/Front/mywreq'
// import myward from '@/components/pages/Front/myward'
// import activereq from '@/components/pages/Active/activereq'
// import req from '@/components/pages/Ward/req'
// import reqmy from '@/components/pages/Front/reqmy'
// import myinfo from '@/components/pages/Front/myinfo'
// import upmyinfo from '@/components/pages/Front/upmyinfo'
// import unionculture from '@/components/pages/Front/unionculture'
import cultureshow from '@/components/pages/Front/cultureshow'
Vue.use(Router)

export default new Router({
  mdoe: 'history',
  routes: [
    //
    {
      path: '/cultureshow',
      name: 'cultureshow',
      component: cultureshow
    },

    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    // {
    //   path: '/', // http://localhost:8080/#/
    //   name: 'Home',
    //   component: Home
    // },
    {
      path: '/index', // http://localhost:8080/#/blog
      name: 'index',

      meta: {
        requireAuth: true
      }, //开启路由守卫
      props: true,
      component: () =>
        import("@/components/pages/index"),

      redirect: 'frontconent',
      children: [{
          path: '/frontconent',
          meta: {
            requireAuth: true
          }, //开启路由守卫
          props: true,
          component: () =>
            import("@/components/pages/Front/fronconent"),

        },
        {
          path: '/frontdetails',
          meta: {
            requireAuth: true
          }, //开启路由守卫
          props: true,
          component: () =>
            import("@/components/pages/Front/frontdetails"),
        },
        {
          path: '/reqfront',
          meta: {
            requireAuth: true
          }, //开启路由守卫
          props: true,
          component: () =>
            import("@/components/pages/Front/reqfront"),
        }
      ]

    },
    {
      path: "/unionculture",
      // meta: { requireAuth: true }, //开启路由守卫
      props: true,
      component: () =>
        import("@/components/pages/Front/unionculture"),
    },
    {
      path: '/myplace',
      meta: {
        requireAuth: true
      }, //开启路由守卫
      props: true,
      component: () =>
        import("@/components/pages/Front/myplace"),
      children: [{
          path: '/myward',
          meta: {
            requireAuth: true
          }, //开启路由守卫
          props: true,
          component: () =>
            import("@/components/pages/Front/myward"),
          children: [{
            path: '/reqmy',
            meta: {
              requireAuth: true
            }, //开启路由守卫
            props: true,
            component: () =>
              import("@/components/pages/Front/reqmy"),
          }]
        },
        {
          path: '/myinfo',
          meta: {
            requireAuth: true
          }, //开启路由守卫
          props: true,
          component: () =>
            import("@/components/pages/Front/myinfo"),
          children: [{
            path: '/upmyinfo',
            meta: {
              requireAuth: true
            }, //开启路由守卫
            props: true,
            component: () =>
              import("@/components/pages/Front/upmyinfo"),
          }, {
            path: '/myactivereq',
            meta: {
              requireAuth: true
            }, //开启路由守卫
            props: true,
            component: () =>
              import("@/components/pages/Front/myactivereq"),
          }, {
            path: '/mywreq',
            meta: {
              requireAuth: true
            }, //开启路由守卫
            props: true,
            component: () =>
              import("@/components/pages/Front/mywreq"),
          }, ]
        }
      ]
    },
    // {
    //   path: '/',
    //   name: "head",
    //   component: head
    // },
    {
      path: '/',
      name: 'login',
      // meta: { requireAuth: true }, //开启路由守卫
      props: true,
      component: () =>
        import("@/components/login"),
    },
    {
      path: '/login',
      // meta: { requireAuth: true }, //开启路由守卫
      props: true,
      name: 'login',
      component: () =>
        import("@/components/login"),
    },
    {
      path: '/backstage',
      name: 'backstage',
      meta: {
        requireAuth: true
      }, //开启路由守卫
      props: true,
      component: () =>
        import("@/components/pages/backstage"),
      redirect: 'welcome',
      children: [{
          path: '/welcome',
          meta: {
            requireAuth: true
          }, //开启路由守卫
          props: true,
          component: () =>
            import("@/components/pages/welcome"),
        },
        {
          path: '/user',
          meta: {
            requireAuth: true
          }, //开启路由守卫
          props: true,
          component: () =>
            import("@/components/pages/User/user"),
        },
        {
          path: '/culture',
          // meta: { requireAuth: true }, //开启路由守卫
          props: true,
          component: () =>
            import("@/components/pages/User/culture"),
        },
        {
          path: '/active',
          meta: {
            requireAuth: true
          }, //开启路由守卫
          props: true,
          component: () =>
            import("@/components/pages/Active/active"),
        },
        {
          path: '/infrom',
          meta: {
            requireAuth: true
          }, //开启路由守卫
          props: true,
          component: () =>
            import("@/components/pages/Active/infrom"),
        },
        {
          path: '/acupdata',
          meta: {
            requireAuth: true
          }, //开启路由守卫
          props: true,
          component: () =>
            import("@/components/pages/Active/acupdata"),
        },
        {
          path: '/addactive',
          meta: {
            requireAuth: true
          }, //开启路由守卫
          props: true,
          component: () =>
            import("@/components/pages/Active/addactive"),
        },
        {
          path: '/activedetails',
          meta: {
            requireAuth: true
          }, //开启路由守卫
          props: true,
          component: () =>
            import("@/components/pages/Active/activedetails"),
        },
        {
          path: '/activereq',
          meta: {
            requireAuth: true
          }, //开启路由守卫
          props: true,
          component: () =>
            import("@/components/pages/Active/activereq"),
        },
        {
          path: '/award',
          meta: {
            requireAuth: true
          }, //开启路由守卫
          props: true,
          component: () =>
            import("@/components/pages/Ward/award"),
        },
        {
          path: '/addaward',
          meta: {
            requireAuth: true
          }, //开启路由守卫
          props: true,
          component: () =>
            import("@/components/pages/Ward/addaward"),
        },
        {
          path: '/upward',
          meta: {
            requireAuth: true
          }, //开启路由守卫
          props: true,
          component: () =>
            import("@/components/pages/Ward/upward"),
        },
        {
          path: '/req',
          meta: {
            requireAuth: true
          }, //开启路由守卫
          props: true,
          component: () =>
            import("@/components/pages/Ward/req"),
        },
        {
          path: '/userinfo',
          meta: {
            requireAuth: true
          }, //开启路由守卫
          props: true,
          component: () =>
            import("@/components/pages/User/userinfo"),
        },
        {
          path: '/expenditrue',
          meta: {
            requireAuth: true
          }, //开启路由守卫
          props: true,
          component: () =>
            import("@/components/pages/Fund/expenditrue"),
        },
        {
          path: '/income',
          meta: {
            requireAuth: true
          }, //开启路由守卫
          props: true,
          component: () =>
            import("@/components/pages/Fund/income"),
        },
        {
          path: '/findex',
          meta: {
            requireAuth: true
          }, //开启路由守卫
          props: true,
          component: () =>
            import("@/components/pages/Fund/findex"),
        }
      ]
    },
    // {
    //   path: '/user',
    //   name: user,
    //   component: user
    // },
    // {
    //   path: '/active',
    //   name: active,
    //   component: active
    // }
  ]
})
