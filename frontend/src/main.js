import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

if (localStorage.user != undefined) {
  Vue.prototype.$token = JSON.parse(localStorage.user).token;
  Vue.prototype.$user = JSON.parse(localStorage.user);
} else {
  Vue.prototype.$token = 'RANDOM_TOKEN_SECRET';
  Vue.prototype.$user = {userId: 1, username: "admin", email: "admin@outlook.fr", isAdmin: null};
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
