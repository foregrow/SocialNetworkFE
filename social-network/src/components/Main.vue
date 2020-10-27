<template>
  <div>
    <Navbar />
    <!-- <div v-for="post in allFriendsPosts" v-bind:key="post.id" class="panel-body post"> -->
    <!-- <button @click="created" name="click">Click</button> -->
    <div class="container">
      <h1 class="mt-5 mb-5">Friend's posts</h1>
      <h3 v-if="allFriendsPosts.length === 0" class="mt-5 mb-5">
        It's empty out here..
      </h3>
      <div
        v-for="post in allFriendsPosts"
        v-bind:key="post.id"
        class="well panel-body post mb-3"
      >
        <div class="media mt-5 mb-5">
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
                class="far fa-comment-dots"
                aria-hidden="true"
                @click.prevent="onShowComments(post)"
              >
                toggle comments</i
              >
              <li>|</li>
              <form @submit.prevent="onAddComment(post.id)" class="mb-5">
                <div class="form-group">
                  <textarea
                    v-model="commentContent"
                    placeholder="Type comment here.."
                    name="text"
                    cols="15"
                    rows="3"
                    class="form-control"
                  ></textarea>
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn-primary">
                    Add comment
                  </button>
                </div>
              </form>
              <div :id="`${post.id}c`" class="container mt-1 mb-3">
                <div
                  v-for="comment in allPostComments"
                  v-bind:key="comment.id"
                  class="well panel-body post mb-3"
                >
                  <div
                    v-if="comment.postId === post.id"
                    class="container mt-1 mb-5"
                  >
                    <div class="media comment-box">
                      <div class="media-left">
                        <a href="#">
                          <img
                            class="img-responsive user-photo"
                            src="../../public/userphoto.png"
                          />
                        </a>
                      </div>
                      <div class="media-body ml-5 mr-5">
                        <h4 class="media-heading">
                          {{ comment.commentSenderUserName }}
                        </h4>
                        <p>
                          {{ comment.content }}
                        </p>
                        <span
                          ><i class="fa fa-clock-o" aria-hidden="true"></i>
                          {{ comment.commentDate | date }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
      firstToggle: false,
      allComments: [],
      commentContent: ""
    };
  },
  methods: {
    ...mapActions([
      "fetchUserFriendsPosts",
      "removeLike",
      "addLike",
      "fetchPostComments",
      "addComment",
    ]),
    onAddComment(postId){
      let obj = {
        "content":this.commentContent,
        "postId":postId
      }
      this.addComment(obj).then((res)=>{
        console.log(res.data);
        this.commentContent = "";
      }).catch((e)=>{
         console.log(e);
      });
    },
    goToUserProfile(userName) {
      this.$router.push({ name: "profile", params: { userName: userName } });
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
    onShowComments(post) {
      let comm = document.getElementById(`${post.id}c`);
      if (!this.firstToggle) {
        comm.style.display = "block";
        this.fetchPostComments(post.id);
        this.firstToggle = true;
      } else {
        if (comm.style.display === "none") {
          comm.style.display = "block";
          this.fetchPostComments(post.id);
        } else {
          comm.style.display = "none";
        }
      }
    },
  },
  computed: mapGetters(["allFriendsPosts", "allPostComments"]),
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

.fa-comment-dots:hover {
  cursor: pointer;
}
.imglike:hover {
  font-style: italic;
  cursor: pointer;
}

.comment-box {
  margin-top: 30px !important;
}
/* CSS Test end */

.comment-box img {
  width: 50px;
  height: 50px;
}
.comment-box .media-left {
  padding-right: 10px;
  width: 65px;
}
.comment-box .media-body p {
  border: 1px solid #ddd;
  padding: 10px;
}
.comment-box .media-body .media p {
  margin-bottom: 0;
}
.comment-box .media-heading {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  padding: 7px 10px;
  position: relative;
  margin-bottom: -1px;
}
.comment-box .media-heading:before {
  content: "";
  width: 12px;
  height: 12px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-width: 1px 0 0 1px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  position: absolute;
  top: 10px;
  left: -6px;
}
</style>