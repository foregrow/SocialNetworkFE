import axios from 'axios';
import server from '../../util/server';

const state = {
  friendsPosts: [

  ]
};

const getters = {
  allFriendsPosts: (state) => state.friendsPosts
};

const actions = {
  async fetchUserFriendsPosts({ commit }) {
    const response = await axios.get(`${server.baseUrl}/posts/userFriends/${server.loggedInUser}`);
    console.log(response.data);

    commit('setFriendsPosts', response.data);
  }
};

const mutations = {
  setFriendsPosts: (state, friendsPosts) => (state.friendsPosts = friendsPosts)
};

export default {
  state,
  getters,
  actions,
  mutations
}