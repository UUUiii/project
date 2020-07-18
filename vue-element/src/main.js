// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import login from './components/login'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
Vue.component('chart', ECharts)
import {
  Swipe,
  SwipeItem
} from 'vue-swipe' // 加这里
Vue.component('swipe', Swipe) // 加这里
Vue.component('swipe-item', SwipeItem) // 加这里
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/backstage.scss'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.$http = axios; //将axios clone至￥http属性中

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
//
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (JSON.parse(sessionStorage.getItem("islogin"))) {
      next();
    } else {
      next({
        path: "/login" //指向为你的登录界面
      });
    }
  } else {
    next();
  }

  if (to.fullPath === "/login") {
    if (JSON.parse(sessionStorage.getItem("islogin"))) {
      next({
        path: from.fullPath
      });
    } else {
      next();
    }
  }
});
