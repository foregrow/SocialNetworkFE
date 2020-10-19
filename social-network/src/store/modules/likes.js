import axios from 'axios';

const state = {
  likes: [

  ]
};

const getters = {
  allLikes: (state) => state.likes
};

const actions = {
  async fetchPostLikes({ commit }) {
    const response = await axios.get(`${server.baseUrl}/likes/post/${server.loggedInUser}`);
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