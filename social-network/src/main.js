import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import Register from './components/Register.vue'
import Login from './components/Login.vue'
import Main from './components/Main.vue'
import Profile from './components/Profile.vue'
import store from './store';

Vue.use(Vuelidate)
Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { path:"/register", component: Register},
  { path:"/login", component: Login},
  { path:"/main", component: Main},
  { path:"/profile", component: Profile}
]

const router = new VueRouter({
  routes,
  mode: 'history'
});
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
