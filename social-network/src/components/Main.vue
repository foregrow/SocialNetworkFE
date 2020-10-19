<template>
  <div>
    <Navbar />
    <!-- <button @click="created" name="click">Click</button> -->
    <div class="container">
      <div class="col-md-12">
        <div class="panel panel-default posts mt-3">
          <div v-for="post in allFriendsPosts" v-bind:key="post.id" class="panel-body post">
            <section class="post-heading">
              <div class="row">
                <div class="col-md-11">
                  <div class="media">
                    <div class="media-left">
                      <a href="#">
                        <img
                          class="media-object photo-profile"
                          src="http://0.gravatar.com/avatar/38d618563e55e6082adf4c8f8c13f3e4?s=40&d=mm&r=g"
                          width="40"
                          height="40"
                          alt="..."
                        />
                      </a>
                    </div>
                    <div class="media-body">
                      <a href="#" class="anchor-username"
                        ><h4 class="media-heading">Bayu Darmantra</h4></a
                      >
                      <a href="#" class="anchor-time">51 mins</a>
                    </div>
                  </div>
                </div>
                <div class="col-md-1">
                  <a href="#"
                    ><i class="glyphicon glyphicon-chevron-down"></i
                  ></a>
                </div>
              </div>
            </section>
            <section class="post-body">
              <p>
                {{ post.text }}
              </p>
            </section>
            <section class="post-footer">
              <hr />
              <div class="post-footer-option container">
                <ul class="list-unstyled">
                  <li>
                    <a href="#"
                      ><i class="glyphicon glyphicon-thumbs-up"></i> Like</a
                    >
                  </li>
                </ul>
              </div>
            </section>
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
  methods: {
    ...mapActions(['fetchUserFriendsPosts']),
  },
  computed: mapGetters(["allFriendsPosts"]),
  created() {
    this.fetchUserFriendsPosts();
  }
};
</script>