<template>
  <div>
    <Navbar />
    <!-- <div v-for="post in allFriendsPosts" v-bind:key="post.id" class="panel-body post"> -->
    <!-- <button @click="created" name="click">Click</button> -->
    <div class="container">
      <h1 class="mt-5 mb-5">Friend's posts</h1>
      <h3  v-if="allFriendsPosts.length===0" class="mt-5 mb-5">It's empty out here..</h3>
      <div
        v-for="post in allFriendsPosts"
        v-bind:key="post.id"
        class="well panel-body post mb-3"
      >
        <div class="media">
          <a class="pull-left" href="#">
            <img class="rounded img" src="../../public/blogpost.png" />
          </a>
          <div class="media-body">
            <a
              @click.prevent="goToUserProfile(post.userName)"
              class="pull-right"
              style="cursor: pointer"
            >
              <i class="fa fa-user" aria-hidden="true"></i> by
              {{ post.userFirstName }} {{ post.userLastName }}</a
            >
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
                {{post.numberOfLikes}}</i
              >
              <i
                v-if="!post.loggedInUserLiked"
                @click.prevent="onLike(post)"
                class="fa fa-thumbs-o-up imglike"
                :id="post.id"
                aria-hidden="true"
              >
                {{post.numberOfLikes}}</i>
                <p> likes</p>
              <li>|</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./navbar/Navbar";
//import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Main",
  components: {
    Navbar: Navbar,
  },
  data() {
    return {
      isLiked: false,
    };
  },
  methods: {
    ...mapActions(["fetchUserFriendsPosts"]),
    ...mapActions(["removeLike"]),
    ...mapActions(["addLike"]),
    goToUserProfile(userName) {
      this.$router.push({ name: "profile", params: { userName: userName } });
    },

    onLike(post){
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
    }
  },
  computed: mapGetters(["allFriendsPosts"]),
  created() {
    this.fetchUserFriendsPosts();
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
</style>