import axios from 'axios';
import server from '../../util/server';

const state = {
  usersFriendships: [

  ],
  userFriendship: [

  ],
  //appReady: false,
};

const getters = {
  allUsersFriendships: (state) => state.usersFriendships,
  singleUserFriendship: (state) => state.userFriendship,
  //appReady: (state) => state.appReady

};

const actions = {
  /*INIT_APP({commit}){
    setTimeout(function(){
      commit("READY_APP");
    }, 5000);
  },*/
  async fetchUserFriendships({ commit }) {
    const response = await axios.get(`${server.baseUrl}/friendships/user/${server.loggedInUser}`);
    console.log(response.data);

    commit('setUserFriendships', response.data);
  },
  async sendFriendshipRequest({ commit },user2_id) {
    let object = {"id":0,"user1_id":1,"user2_id":user2_id,"friendshipDate":Date.now(),"accepted":false};
    console.log(object);
    return axios.post(`${server.baseUrl}/friendships/add`, object).then((res) => {
      alert('Friend request successfully sent! ')
      commit('newFriendshipRequest',res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  },
  async fetchUserFriendship({ commit },friendId) {
    
    return axios.get(`${server.baseUrl}/friendships/userFriend/${server.loggedInUser}/${friendId}`).then((res) => {
      //console.log(res.data);
      commit('setUserFriendship',res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
    
  },
};

const mutations = {
  /*READY_APP(state){
    state.appReady = true;
  },*/
  setUserFriendships: (state, usersFriendships) => (state.usersFriendships = usersFriendships),
  setUserFriendship: (state, userFriendship) => (state.userFriendship = userFriendship),
  newFriendshipRequest: (state, friendship) => state.userFriendship.unshift(friendship)
};

export default {
  state,
  getters,
  actions,
  mutations
}