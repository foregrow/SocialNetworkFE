<template>
  <div v-if="getLoginUserInfo !== null">
    <Navbar />
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="fb-profile-block">
            <div class="fb-profile-block-thumb cover-container"></div>
            <div class="profile-img">
              <a href="#">
                <img v-bind:src="imagePreview" />
              </a>
            </div>
            <div class="profile-name">
              <h2 v-if="singleUser !== undefined">
                {{ singleUser.firstName }} {{ singleUser.lastName }}
              </h2>
            </div>

            <div v-bind:class="isToggled"  class="fb-profile-block-menu">
              <div class="block-menu">
                <button
                  @click.prevent="onToggle"
                  class="btn btn-primary pull-left mr-3"
                >
                  About
                </button>
                <input
                  v-if="singleUser.id == getLoginUserInfo.id"
                  class="pull-left"
                  type="file"
                  accept="image/*"
                  @change="onPicSelected"
                />
                <button
                  v-if="singleUser.id == getLoginUserInfo.id && selectedPicture"
                  @click="onPicUpload"
                  class="btn btn-primary pull-left"
                >
                  Upload new image
                </button>
                <button
                  v-if="
                    singleUserFriendship === null &&
                    singleUser.id != getLoginUserInfo.id
                  "
                  @click="onAddFriend($event, singleUser.id)"
                  class="btn btn-primary pull-right"
                >
                  Add Friend
                </button>
                <button
                  v-if="
                    singleUserFriendship !== null &&
                    !singleUserFriendship.accepted &&
                    singleUserFriendship.user1_id === getLoginUserInfo.id &&
                    singleUserFriendship.user2_id === singleUser.id
                  "
                  @click="onCancelRequest($event, singleUser.id)"
                  class="btn btn-danger pull-right mr-1 pt-1"
                >
                  Cancel Request
                </button>
                <button
                  v-if="
                    singleUserFriendship !== null &&
                    !singleUserFriendship.accepted &&
                    singleUserFriendship.user2_id === getLoginUserInfo.id &&
                    singleUserFriendship.user1_id === singleUser.id
                  "
                  @click="onCancelRequest($event, singleUser.id)"
                  class="btn btn-danger pull-right ml-1mr-1 pt-1"
                >
                  Reject Request
                </button>
                <button
                  v-if="
                    singleUserFriendship !== null &&
                    !singleUserFriendship.accepted &&
                    singleUserFriendship.user2_id === getLoginUserInfo.id &&
                    singleUserFriendship.user1_id === singleUser.id
                  "
                  @click="onAcceptRequest($event, singleUser.id)"
                  class="btn btn-primary pull-right mr-auto pt-1"
                >
                  Accept Request
                </button>
                <button
                  v-if="
                    singleUserFriendship !== null &&
                    singleUserFriendship.accepted
                  "
                  @click="onRemoveFriend($event, singleUser.id)"
                  class="btn btn-danger pull-right mr-1 pt-1"
                >
                  Remove Friend
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isToggled" class="col-md-12 mt-3 mb-3">
      <div class="tab-content profile-tab" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <div class="row">
            <div class="col-md-6">
              <label>Username</label>
            </div>
            <div class="col-md-2">
              <p>{{singleUser.userName}}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>First name</label>
            </div>
            <div class="col-md-2">
              <p>{{singleUser.firstName}}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>Last name</label>
            </div>
            <div class="col-md-2">
              <p>{{singleUser.lastName}}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>Phone</label>
            </div>
            <div class="col-md-2">
              <p>{{singleUser.phone}}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>Email</label>
            </div>
            <div class="col-md-2">
              <p>{{singleUser.email}}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>Address</label>
            </div>
            <div class="col-md-2">
              <p>{{singleUser.address}}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>Register date</label>
            </div>
            <div class="col-md-2">
              <p>{{singleUser.registerDate | date}}</p>
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <div class="row">
            <div class="col-md-6">
              <label>Experience</label>
            </div>
            <div class="col-md-6">
              <p>Expert</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>Hourly Rate</label>
            </div>
            <div class="col-md-6">
              <p>10$/hr</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>Total Projects</label>
            </div>
            <div class="col-md-6">
              <p>230</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>English Level</label>
            </div>
            <div class="col-md-6">
              <p>Expert</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>Availability</label>
            </div>
            <div class="col-md-6">
              <p>6 months</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <label>Your Bio</label><br />
              <p>Your detail description</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-5" v-if="singleUser.id === getLoginUserInfo.id">
      <div>
        <form @submit="onAddPost($event)">
          <div class="form-group">
            <textarea
              v-model="descText"
              placeholder="Type something here.."
              name="text"
              cols="30"
              rows="5"
              class="form-control"
            ></textarea>
          </div>
          <div class="form-grup">
            <button type="submit" class="btn btn-primary">Post now!</button>
          </div>
        </form>
      </div>
    </div>

    <div
      v-if="
        (singleUserFriendship === null &&
          singleUser.id == getLoginUserInfo.id) ||
        (singleUserFriendship !== null && singleUserFriendship.accepted)
      "
      class="container mt-5"
    >
      <div
        v-for="post in allUserPosts"
        v-bind:key="post.id"
        class="panel-body post mt-3"
      >
        <div class="media">
          <a class="pull-left" href="#">
            <img class="rounded img" src="../../public/blogpost.png" />
          </a>
          <div class="media-body">
            <p class="pt-5">
              {{ post.text }}
            </p>
            <ul class="list-inline list-unstyled">
              <li>
                <span
                  ><i class="fa fa-clock-o" aria-hidden="true"></i>
                  {{ post.postDate | date }}
                </span>
              </li>
              <li>|</li>

              <i
                v-if="post.loggedInUserLiked"
                @click.prevent="onLike(post)"
                class="fa fa-thumbs-up imglike"
                :id="post.id"
                aria-hidden="true"
              >
                {{ post.numberOfLikes }}</i
              >
              <i
                v-if="!post.loggedInUserLiked"
                @click.prevent="onLike(post)"
                class="fa fa-thumbs-o-up imglike"
                :id="post.id"
                aria-hidden="true"
              >
                {{ post.numberOfLikes }}</i
              >
              <p>likes</p>
              <li>|</li>
              <i
                v-if="singleUser.id == getLoginUserInfo.id"
                class="fa fa-trash"
                @click.prevent="onDeletePost(post.id)"
                aria-hidden="true"
              ></i>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Navbar from "./navbar/Navbar";
//import Loader from "../components/loader/Loader";

import { mapGetters, mapActions } from "vuex";
import server from "../util/server";
import axios from "axios";

export default {
  name: "Profile",
  components: {
    Navbar: Navbar,
  },
  data() {
    return {
      descText: "",
      selectedPicture: null,
      imagePreview: "https://bootdey.com/img/Content/avatar/avatar7.png",
      isToggled :false
    };
  },
  methods: {
    ...mapActions(["fetchUserByUserName"]),
    ...mapActions(["fetchUserFriendship"]),
    ...mapActions(["fetchUserPosts"]),
    ...mapActions(["sendFriendshipRequest"]),
    ...mapActions(["removeFriend"]),
    ...mapActions(["cancelRequest"]),
    ...mapActions(["acceptRequest"]),
    ...mapActions(["addPost"]),
    ...mapActions(["fetchUserPhoto"]),
    ...mapActions(["removeLike"]),
    ...mapActions(["addLike"]),
    ...mapActions(["removePost"]),

    onToggle(){
      if(!this.isToggled)
        this.isToggled=true;
      else
        this.isToggled=false;
    },
    onAddFriend(e, user2_id) {
      e.preventDefault();
      this.sendFriendshipRequest(user2_id).then(() => {
        this.$router.go();
      });
    },
    onRemoveFriend(e, user2_id) {
      e.preventDefault();
      console.log(user2_id);
      this.removeFriend(user2_id).then(() => {
        this.$router.go();
      });
    },
    onCancelRequest(e, user2_id) {
      e.preventDefault();
      this.cancelRequest(user2_id).then(() => {
        this.$router.go();
      });
    },
    onAcceptRequest(e, user1_id) {
      e.preventDefault();
      this.acceptRequest(user1_id).then(() => {
        this.$router.go();
      });
    },
    onAddPost(e) {
      e.preventDefault();
      this.addPost(this.descText);
      this.$router.go();
    },
    onPicSelected(e) {
      this.selectedPicture = e.target.files[0];
    },
    onPicUpload() {
      const fd = new FormData();
      fd.append("image", this.selectedPicture, this.selectedPicture.name);
      axios
        .post(`${server.baseUrl}/photos/add/${this.getLoginUserInfo.id}`, fd)
        .then((res) => {
          console.log(res);

          if (res !== undefined) {
            this.fetchUserPhoto(this.singleUser.id).then((resP) => {
              if (resP !== undefined) this.imagePreview = resP.path;
              this.$router.go();
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onLike(post) {
      let like = document.getElementById(`${post.id}`);
      let likeInner = document.getElementById(`${post.id}`).innerHTML;
      if (like.classList.contains("fa-thumbs-o-up")) {
        like.classList.remove("fa-thumbs-o-up");
        like.classList.add("fa-thumbs-up");
        likeInner++;
        document.getElementById(`${post.id}`).innerHTML = likeInner;
        this.addLike(post.id);
      } else if (like.classList.contains("fa-thumbs-up")) {
        like.classList.remove("fa-thumbs-up");
        like.classList.add("fa-thumbs-o-up");
        likeInner--;
        document.getElementById(`${post.id}`).innerHTML = likeInner;
        this.removeLike(post.id);
      }
    },
    onDeletePost(postId) {
      this.removePost(postId).then(() => {
        this.$router.go();
      });
    },
  },

  computed: {
    //...mapGetters(["appReady"]),
    ...mapGetters(["singleUser"]),
    ...mapGetters(["singleUserFriendship"]),
    ...mapGetters(["allUserPosts"]),
    ...mapGetters(["singlePhoto"]),
    ...mapGetters({
      isAuthenticated: "isAuthenticated",
      getLoginUserInfo: "getLoginUserInfo",
    }),
  },
  created() {
    let userName = this.$route.params.userName;
    this.fetchUserByUserName(userName).then((resU) => {
      this.fetchUserPhoto(resU.id)
        .then((resP) => {
          if (resP !== undefined) this.imagePreview = resP.path;
        })
        .catch((e) => {
          console.log(e);
        });
      this.fetchUserFriendship(resU.id).then((resF) => {
        if (
          (resF === null && resU.id == this.getLoginUserInfo.id) ||
          (resF !== null && resF.accepted)
        ) {
          this.fetchUserPosts(resU.id);
        }
      });
    });
  },
};
</script>

<style scoped>
.rounded {
  height: 150px;
  width: 200px;
}

.imglike:hover {
  font-style: italic;
  cursor: pointer;
}
.fa-trash:hover {
  font-style: italic;
  cursor: pointer;
}
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

.loader {
  background: #eee;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}



.profile-tab label{
    font-weight: 600;
}
.profile-tab p{
    font-weight: 600;
    color: #0062cc;
}
</style>