<template>
  <div class="container-fluid">
      <div class="mt-5 col-3">
        <div>
          <h2 class="h2">Login</h2>

          <div class="form-group">
            <input v-model="userCred.userName"
            type="text" placeholder="Username" class="form-control" />
          </div>

          <div class="form-group">
            <input v-model="userCred.password"
              type="password"
              placeholder="Password"
              class="form-control"
            />
          </div>
          <button class="btn btn-primary mr-3" type="submit" @click="login">Log in</button>
          <button class="btn btn-secondary" type="button" @click="$router.push('/register')">No account? Register here</button>

        </div>
      </div>
      
    </div>
</template>

<script>
//import axios from 'axios'
//import server from '../util/server'
import { mapActions, mapGetters } from "vuex";
export default {
  name: 'Login',
  data () {
    return {
      userCred:{
        id: 0,
        userName: "",
        password: ""
      }
    }  
  },
  computed:{
    ...mapGetters({
      isAuthenticated: 'isAuthenticated',
      getLoginUserInfo: 'getLoginUserInfo'
      }),
  },
  methods: {
    ...mapActions(["loginUser","attempt"]),
    login() {
      this.loginUser(this.userCred).then((res)=>{
        this.attempt(res).then(()=>{
          if(this.isAuthenticated && this.getLoginUserInfo){
            this.$router.push("main");
           }
        })
      });
      
      
    }
  }
}
</script>