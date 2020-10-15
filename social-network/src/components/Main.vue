<template>
  <div>
    <Navbar />
    <h1>Hello from main</h1>
    <button @click="created" name="click">Click</button>
  </div>
</template>

<script>

import Navbar from './navbar/Navbar';
import axios from "axios";

export default {
  name: "Main",
  components: {
    'Navbar': Navbar
  },
  methods:{
    created(){
      axios.get('http://localhost:9000/api/posts/userFriends/1')
      .then((res) => {
          
          console.log(res.data);
          

        })
        .catch((err) => {
          console.log(err);
          
        });
    }
    
  }
};
</script>