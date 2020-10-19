import axios from 'axios';
import server from '../../util/server';

const state = {
  friends: [
    
  ],
  suggestedFriends: [

  ],
  user: [

  ]
};

const getters = {
  allFriends: (state) => state.friends,
  allSuggestedFriends: (state) => state.suggestedFriends,
  singleUser: (state) => state.user
};

const actions = {
  async fetchUsersFriends({ commit }){
    const response = await axios.get(`${server.baseUrl}/users/friends/${server.loggedInUser}`);

    commit('setFriends',response.data);
  },
  async fetchUsersSuggestedFriends({ commit }){
    const response = await axios.get(`${server.baseUrl}/users/suggested/${server.loggedInUser}`);

    commit('setSuggestedFriends',response.data);
  },
  async fetchUserByUserName({ commit }, userName){
    await axios.get(`${server.baseUrl}/users/userName/${userName}`)
    .then((res) => {
      console.log(res.data);
      commit('setUser',res.data);

    })
    .catch((err) => {
      console.log(err);
    });
    
  },
};

const mutations = {
  setFriends: (state, friends) => (state.friends = friends),
  setSuggestedFriends: (state, suggestedFriends) => (state.suggestedFriends = suggestedFriends),
  setUser: (state, user) => (state.user = user)
};

export default {
  state,
  getters,
  actions,
  mutations
}