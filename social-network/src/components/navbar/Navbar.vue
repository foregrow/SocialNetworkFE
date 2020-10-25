<template>
  <nav
    v-if="isAuthenticated"
    id="navnav"
    class="navbar navbar-expand-lg navbar-dark bg-dark"
  >
    <a class="navbar-brand">Welcome {{ getLoginUserInfo.userName }} </a>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="ml-5">
          <router-link :to="{name: 'main'}">Home</router-link>
        </li>
        <li class="ml-5">
          <router-link :to="{name: 'profile', params: {userName: getLoginUserInfo.userName}}"> Profile</router-link>
        </li>
        <li class="ml-5">
          <router-link :to="{name: 'friends'}">
            Friends</router-link>
        </li>
        <li class="ml-5">
          <router-link :to="{name: 'login'}" @click.native="logout" >Log out</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Navbar",
  computed: {
    ...mapGetters({
      isAuthenticated: "isAuthenticated",
      getLoginUserInfo: "getLoginUserInfo",
    }),
  },
  methods: {
    logout(){
      this.$store.dispatch('logoutUser')
      //localStorage.setItem('access_token',null);
    }
  }
};
</script>