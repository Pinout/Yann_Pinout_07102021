import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

if (localStorage.user != undefined) {
    Vue.prototype.$token = JSON.parse(localStorage.user).token;
    Vue.prototype.$user = JSON.parse(localStorage.user);
} else {
  Vue.prototype.$token = '';
  Vue.prototype.$user = {userId: 0, username: "", email: "", isAdmin: null};
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
