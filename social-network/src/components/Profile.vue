<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="fb-profile-block">
            <div class="fb-profile-block-thumb cover-container"></div>
            <div class="profile-img">
              <a href="#">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  alt=""
                  title=""
                />
              </a>
            </div>
            <div class="profile-name">
              <h2 v-if="singleUser!==undefined">{{singleUser.firstName}} {{singleUser.lastName}}</h2>
            </div>

            <div class="fb-profile-block-menu">
              <div class="block-menu">
                <button
                  v-if="
                    singleUserFriendship !== undefined &&
                    (singleUserFriendship.user1_id == 1 &&
                    singleUserFriendship.user2_id == singleUser.id ||
                    singleUserFriendship.user2_id == 1 &&
                    singleUserFriendship.user1_id == singleUser.id) &&
                    singleUserFriendship.accepted
                  "
                  class="btn btn-primary pull-right mr-1 pt-1"
                >
                  Remove Friend
                </button>
                <button
                  v-if="
                    singleUserFriendship !== undefined &&
                    (singleUserFriendship.user1_id == 1 &&
                    singleUserFriendship.user2_id == singleUser.id ||
                    singleUserFriendship.user2_id == 1 &&
                    singleUserFriendship.user1_id == singleUser.id) &&
                    !singleUserFriendship.accepted
                  "
                  class="btn btn-primary pull-right mr-1 pt-1"
                >
                  Cancel Request
                </button>
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
//import server from '../util/server';

export default {
  name: "Profile",
  components: {
    Navbar: Navbar,
  },
  methods: {
    ...mapActions(["fetchUserByUserName"]),
    ...mapActions(["fetchUserFriendship"]),
  },
  computed: {
    ...mapGetters(["singleUser"]),
    ...mapGetters(["singleUserFriendship"]),
  },
  created() {
    let userName = this.$route.params.userName;
    if(this.singleUserFriendship !== undefined)
      this.fetchUserByUserName(userName);
    
    if(this.singleUser !== undefined)
      this.fetchUserFriendship(this.singleUser.id);
    
    

  },
};
</script>

<style scoped>
.fb-profile-block {
  position: relative;
  width: 100%;
}
.cover-container {
  background: #1e90ff;
  background: -webkit-radial-gradient(bottom, #73d6f5 12%, #1e90ff);
  background: radial-gradient(at bottom, #73d6f5 12%, #1e90ff);
}
.fb-profile-block-thumb {
  display: block;
  height: 315px;
  overflow: hidden;
  position: relative;
  text-decoration: none;
}
.fb-profile-block-menu {
  border: 1px solid #d3d6db;
  border-radius: 0 0 3px 3px;
}
.profile-img a {
  bottom: 15px;
  box-shadow: none;
  display: block;
  left: 15px;
  padding: 1px;
  position: absolute;
  height: 160px;
  width: 160px;
  background: rgba(0, 0, 0, 0.3) none repeat scroll 0 0;
  z-index: 9;
}
.profile-img img {
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.07);
  height: 158px;
  padding: 5px;
  width: 158px;
}
.profile-name {
  bottom: 60px;
  left: 200px;
  position: absolute;
}
.profile-name h2 {
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  line-height: 30px;
  max-width: 275px;
  position: relative;
  text-transform: uppercase;
}
.fb-profile-block-menu {
  height: 44px;
  position: relative;
  width: 100%;
  overflow: hidden;
}
.block-menu {
  clear: right;
  padding-left: 205px;
}
.block-menu ul {
  margin: 0;
  padding: 0;
}
.block-menu ul li {
  display: inline-block;
}
.block-menu ul li a {
  border-right: 1px solid #e9eaed;
  float: left;
  font-size: 14px;
  font-weight: bold;
  height: 42px;
  line-height: 3;
  padding: 0 17px;
  position: relative;
  vertical-align: middle;
  white-space: nowrap;
  color: #4b4f56;
  text-transform: capitalize;
}
.block-menu ul li:first-child a {
  border-left: 1px solid #e9eaed;
}
</style>