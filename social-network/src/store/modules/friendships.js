import axios from 'axios';
import server from '../../util/server';

const state = {
  usersFriendships: [

  ],
  userFriendship: [

  ]
};

const getters = {
  allUsersFriendships: (state) => state.usersFriendships,
  singleUserFriendship: (state) => state.userFriendship

};

const actions = {
  async fetchUserFriendships({ commit }) {
    const response = await axios.get(`${server.baseUrl}/friendships/user/${server.loggedInUser}`);
    console.log(response.data);

    commit('setUserFriendships', response.data);
  },
  async sendFriendshipRequest({ commit }, user1_id,user2_id) {
    const response = await axios.post(`${server.baseUrl}/api/friendships/add`, 
    {id:0,user1_id,user2_id,friendshipDate: Date.now(), accepted:false});
    console.log(response.data);

    commit('setFriendshipRequest', response.data);
  },
  async fetchUserFriendship({ commit },friendId) {
    const response = 
      await axios.get(`${server.baseUrl}/friendships/userFriend/${server.loggedInUser}/${friendId}`);
    console.log(response.data);

    commit('setUserFriendship', response.data);
  }
};

const mutations = {
  setUserFriendships: (state, usersFriendships) => (state.usersFriendships = usersFriendships),
  setUserFriendship: (state, userFriendship) => (state.userFriendship = userFriendship),
};

export default {
  state,
  getters,
  actions,
  mutations
}