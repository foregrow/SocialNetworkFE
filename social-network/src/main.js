import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import Register from './components/Register.vue'
import Login from './components/Login.vue'
import Main from './components/Main.vue'
import Profile from './components/Profile.vue'
import store from './store'
import Friends from './components/Friends.vue'
import Error from './components/Error.vue'
import Vuetify from 'vuetify'
import DateFilter from './format/date'
//import axios from 'axios'

Vue.use(Vuelidate)
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.filter('date', DateFilter)


//axios.defaults.baseURL = 'http://localhost:9000/api'

const routes = [
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  {
    path: "/main",
    component: Main,
    /*beforeEnter(to, from, next) {
      let access_token = window.localStorage.access_token;
      if (access_token) {
        next();
      } else {
        next("/error")
      }
    },*/
  },
  {
    path: "/profile/:userName", component: Profile,
    /*beforeEnter(to, from, next) {
      let access_token = window.localStorage.access_token;
      if (access_token) {
        next();
      } else {
        next("/error")
      }
    },*/
  },
  {
    path: "/friends", component: Friends,

    /*beforeEnter(to, from, next) {
      let access_token = window.localStorage.access_token;
      if (access_token) {
        next();
      } else {
        next("/error")
      }
    },*/
  },
  { path: "/error", component: Error },
  { path: "*", component: Error }
]

const router = new VueRouter({
  routes,
  mode: 'history',
});




new Vue({
  render: h => h(App),
  router,
  store,
  vuetify: Vuetify
}).$mount('#app')
