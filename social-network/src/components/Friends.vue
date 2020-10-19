<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <div class="people-nearby mt-5">
            <h1 v-if="allFriends.length>0">Friend's list</h1> 
            <h1 v-if="allFriends.length===0">Friend's list is empty</h1> 
            <div  
              v-for="user in allFriends"
              v-bind:key="user.id"
              class="nearby-user"
            >
            
              <div class="row">
                <div class="col-md-2 col-sm-2">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="user"
                    class="profile-photo-lg"
                  />
                </div>
                <div class="col-md-7 col-sm-7">
                  <h5>
                    <a href="#" class="profile-link"
                      >{{ user.firstName }} {{ user.lastName }}</a
                    >
                  </h5>
                  <p>{{ user.email }}</p>
                  <p class="text-muted">{{ user.phone }}</p>
                </div>
                <div class="col-md-3 col-sm-3">
                  <button @click="onProfileClick(user.userName)" 
                  class="btn btn-primary pull-right">Profile</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <div class="people-nearby mt-5">
            <h1>Suggested friends</h1>
            <div
              v-for="user in allSuggestedFriends"
              v-bind:key="user.id"
              class="nearby-user"
            >
              <div class="row">
                <div class="col-md-2 col-sm-2">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="user"
                    class="profile-photo-lg"
                  />
                </div>
                <div class="col-md-7 col-sm-7">
                  <h5>
                    <a href="#" class="profile-link"
                      >{{ user.firstName }} {{ user.lastName }}</a
                    >
                  </h5>
                  <p>{{ user.email }}</p>
                  <p class="text-muted">{{ user.phone }}</p>
                </div>

                <div class="col-md-3 col-sm-3">
                  <button @click="onProfileClick(user.userName)" 
                  class="btn btn-primary pull-right">Profile</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Navbar from "./navbar/Navbar";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Friends",
  components: {
    Navbar: Navbar,
  },
  methods: {
    ...mapActions(["fetchUsersFriends"]),
    ...mapActions(["fetchUsersSuggestedFriends"]),
    ...mapActions(["fetchUserByUserName"]),
    //...mapActions(["fetchUserFriendships"]),
    onProfileClick(userName){
      this.fetchUserByUserName(userName);
      this.$router.push(`/profile/${userName}`).catch(()=>{});
    }
  },
  computed: {
    ...mapGetters(["allFriends"]),
    ...mapGetters(["allSuggestedFriends"]),
    //...mapGetters(["allUsersFriendships"]),
    ...mapGetters(["singleUser"]),
  },
  created() {
    this.fetchUsersFriends();
    this.fetchUsersSuggestedFriends();
    //this.fetchUserFriendships();
    
  },
};
</script>



<style>

.people-nearby .google-maps {
  background: #f8f8f8;
  border-radius: 4px;
  border: 1px solid #f1f2f2;
  padding: 20px;
  margin-bottom: 20px;
}

.people-nearby .google-maps .map {
  height: 200px;
  width: 100%;
  border: none;
}

.people-nearby .nearby-user {
  padding: 20px 0;
  border-top: 1px solid #f1f2f2;
  border-bottom: 1px solid #f1f2f2;
  margin-bottom: 20px;
}

img.profile-photo-lg {
  height: 80px;
  width: 80px;
  border-radius: 50%;
}
</style>