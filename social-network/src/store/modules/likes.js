import axios from 'axios';

const state = {
  posts: [

  ]
};

const getters = {
  allPosts: (state) => state.posts
};

const actions = {
  async fetchUserFriendsPosts({ commit }) {
    const response = await axios.get('http://localhost:9000/api/posts/userFriends/1');
    console.log(response.data);

    commit('setPosts', response.data);
  }
};

const mutations = {
  setPosts: (state, posts) => (state.posts = posts)
};

export default {
  state,
  getters,
  actions,
  mutations
}