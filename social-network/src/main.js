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
import VueJwtDecode from 'vue-jwt-decode'
import axios from 'axios';
import api from "./api";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 
library.add(faUserSecret)
 
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.prototype.$http = api;
require('./store/modules/subscriber')
Vue.use(Vuelidate)
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.use(VueJwtDecode)
//axios.defaults.baseURL = 'http://localhost:9000/api'
store.dispatch('attempt', localStorage.getItem('access_token'));

const routes = [
  { path: "/register", component: Register },
  { path: "/login", name: 'login',component: Login },
  {
    path: "/main",
    component: Main,
    name: 'main',
    beforeEnter(to, from, next) {
      let access_token = localStorage.access_token;
      if (access_token) {
        next();
      } else {
        next({name: "login"})
      }
    },
  },
  {
    path: "/profile/:userName", component: Profile,name: 'profile',
    beforeEnter(to, from, next) {
      let access_token = localStorage.access_token;
      if (access_token) {
        next();
      } else {
        next({name: "login"})
      }
    },
  },
  {
    path: "/friends", component: Friends,name: 'friends',
    beforeEnter(to, from, next) {
      let access_token = localStorage.access_token;
      if (access_token) {
        next();
      } else {
        next({name: "login"})
      }
    },
  },
  { path: "/error", component: Error ,name: 'error',},
  { path: "*", component: Error }
]

const router = new VueRouter({
  routes,
  mode: 'history',
});

Vue.prototype.$http = api;
api.defaults.timeout = 10000; 
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.common["Authorization"] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
); 
api.interceptors.response.use(
  response => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  }, error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 400:

          //do something
          break;

        case 401:
          alert("session expired");
          break; case 403:
          router.replace({
            path: "/login",
            query: { redirect: router.currentRoute.fullPath }
          }); break; case 404:
          alert('page not exist');
          break; case 502:
          setTimeout(() => {
            router.replace({
              path: "/login",
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
      }
      return Promise.reject(error.response);
    }
  }
);

new Vue({
  render: h => h(App),
  router,
  store,
  vuetify: Vuetify,
  axios
}).$mount('#app')
