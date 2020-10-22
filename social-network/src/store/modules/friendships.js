import axios from 'axios';
import server from '../../util/server';
import VueJwtDecode from 'vue-jwt-decode'

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
    let access_token = localStorage.getItem('access_token');
    let decoded = VueJwtDecode.decode(access_token);
    let id = decoded.id;
    const response = await axios.get(`${server.baseUrl}/friendships/user/${id}`,
    {headers:{
      'Authorization' : `Bearer ${access_token}`
    }});
    console.log(response.data);

    commit('setUserFriendships', response.data);
  },
  async sendFriendshipRequest({ commit },user2_id) {
    let access_token = localStorage.getItem('access_token');
    let decoded = VueJwtDecode.decode(access_token);
    let id = decoded.id;
    let object = {"id":0,"user1_id":id,"user2_id":user2_id,"friendshipDate":Date.now(),"accepted":false};
    console.log(object);
    return axios.post(`${server.baseUrl}/friendships/add`, object,
    {headers:{
      'Authorization' : `Bearer ${access_token}`
    }}).then((res) => {
      alert('Friend request successfully sent! ')
      commit('newFriendshipRequest',res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  },
  async removeFriend({commit},user2_id){
    let access_token = localStorage.getItem('access_token');
    let decoded = VueJwtDecode.decode(access_token);
    let user1_id = decoded.id;
    return await axios.delete(`${server.baseUrl}/friendships/remove/${user1_id}/${user2_id}`,
    {headers:{
      'Authorization' : `Bearer ${access_token}`
    }}).then((res) => {
      alert('Friend successfully removed! ')
      commit('removeFriendship',res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  },
  //
  async cancelRequest({commit},user2_id){
    let access_token = localStorage.getItem('access_token');
    let decoded = VueJwtDecode.decode(access_token);
    let user1_id = decoded.id;
    return axios.delete(`${server.baseUrl}/friendships/cancel/${user1_id}/${user2_id}`,
    {headers:{
      'Authorization' : `Bearer ${access_token}`
    }}).then((res) => {
      alert('Friend request successfully canceled! ')
      commit('cancelRequest',res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  },
  async acceptRequest({commit},user1_id){
    let access_token = localStorage.getItem('access_token');
    let decoded = VueJwtDecode.decode(access_token);
    let user2_id = decoded.id;
    return axios.put(`${server.baseUrl}/friendships/accept/${user1_id}/${user2_id}`,
    {headers:{
      'Authorization' : `Bearer ${access_token}`
    }}).then((res) => {
      alert('Friend request successfully accepted! ')
      commit('acceptRequest',res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  },
  async fetchUserFriendship({ commit },friendId) {
    let access_token = localStorage.getItem('access_token');
    let decoded = VueJwtDecode.decode(access_token);
    let id = decoded.id;
    return axios.get(`${server.baseUrl}/friendships/userFriend/${id}/${friendId}`,
    {headers:{
      'Authorization' : `Bearer ${access_token}`
    }}).then((res) => {
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
  newFriendshipRequest: (state, friendship) => state.userFriendship.unshift(friendship),
  //removeFriendship: (state) => 
};

export default {
  state,
  getters,
  actions,
  mutations
}