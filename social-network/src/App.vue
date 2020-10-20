<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
//import axios from 'axios';
export default {
  name: "App",
  components: {},
  data() {
    return {
     
    };
  },
  created(){
    //axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("access_token");
      //console.log("Bearer " + localStorage.getItem("access_token"));
   // axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("access_token");
  }
};
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
