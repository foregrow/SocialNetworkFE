<template>

  <nav v-if="isAuthenticated" id="navnav" class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand">Welcome {{getLoginUserInfo.userName}} </a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <a class="nav-link" style="cursor: pointer">
            <i class="fa fa-sign-out ml-5" aria-hidden="true"></i> Logout</a
          >
        </ul>
      </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Navbar',
  data(){
    return{
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'isAuthenticated',
      getLoginUserInfo: 'getLoginUserInfo'
    })
  }
}
</script>