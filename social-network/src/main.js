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
import Vuetify from 'vuetify'
import DateFilter from './format/date'
Vue.use(Vuelidate)
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.filter('date',DateFilter)
const routes = [
  { path:"/register", component: Register},
  { path:"/login", component: Login},
  { path:"/main", component: Main},
  { path:"/profile/:userName", component: Profile},
  { path:"/friends", component: Friends}
]

const router = new VueRouter({
  routes,
  mode: 'history',
});

/*router.beforeEach((to,from,next)=>{
  function proceed(){
    next();
  }
  if(!store.state.appReady){
    store.watch(
      (state)=> state.appReady,
      (ready)=> {
        if(ready){
          proceed();
        }
      }
    )
  }else {
    proceed();
  }
})*/


new Vue({
  render: h => h(App),
  router,
  store,
  vuetify: Vuetify
}).$mount('#app')
