import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/base.scss'
//解决移动端300ms的延迟
import fastclick from "fastclick"
fastclick.attach(document.body)
Vue.config.productionTip = false
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  // 图片还未加载时显示的默认图片
  loading: '@/assets/images/loading.png',
  // attempt: 1
})
// import VConsole from "vconsole"
// const vconsole = new VConsole()
// Vue.use(vconsole)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
