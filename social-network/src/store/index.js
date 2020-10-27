import Vuex from 'vuex';
import Vue from 'vue';
import posts from './modules/posts';
import users from './modules/users';
import friendships from './modules/friendships';
import photos from './modules/photos';
import comments from './modules/comments';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    posts,
    users,
    friendships,
    photos,
    comments
  }
});