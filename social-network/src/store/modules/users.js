import axios from 'axios';
import server from '../../util/server';
//import router from 'vue-router';
import VueJwtDecode from 'vue-jwt-decode'

const state = {
  loginUserInfo: null,
  access_token: null, 
  friends: [
    
  ],
  suggestedFriends: [

  ],
  user: [

  ],
  appReady: false,
  

};

const getters = {
  isAuthenticated(state){
    return state.access_token && state.loginUserInfo;
  },
  getLoginUserInfo(state){
    return state.loginUserInfo;
  },
  allFriends: (state) => state.friends,
  allSuggestedFriends: (state) => state.suggestedFriends,
  singleUser: (state) => state.user,
  appReady: (state) => state.appReady,

};

const actions = {
  
   async loginUser({ dispatch },userCred){
    delete axios.defaults.headers.common["Authorization"];
    await axios.post(`${server.base}/authenticate`,userCred).then(res=>{
      dispatch('attempt',res.data.access_token);

    }).catch(err=>{
      if(err.response.status === 400){
        alert("Wrong username or password! ");
      }
    })
  },
  async attempt ({commit}, access_token){

    commit('setToken', access_token);
    try {
      let decoded = VueJwtDecode.decode(access_token);
      let id = decoded.id;
      let res = await axios.get(`${server.baseUrl}/users/${id}`,
      {headers:{
        'Authorization' : `Bearer ${access_token}`
      }})
      commit('setLoginUserInfo',res.data)
    } catch (e) {
      console.log('fail')
      commit('setToken',null)
      commit('setLoginUserInfo',null)

    }
  },
  
  async fetchUsersFriends({ commit }){
    let access_token = localStorage.getItem('access_token');
    let decoded = VueJwtDecode.decode(access_token);
    let id = decoded.id;
    const response = await axios.get(`${server.baseUrl}/users/friends/${id}`,
    {headers:{
      'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
    }});

    commit('setFriends',response.data);
  },
  async fetchUsersSuggestedFriends({ commit }){
    let access_token = localStorage.getItem('access_token');
    let decoded = VueJwtDecode.decode(access_token);
    let id = decoded.id;
    const response = await axios.get(`${server.baseUrl}/users/suggested/${id}`,
    {headers:{
      'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
    }});

    commit('setSuggestedFriends',response.data);
  },
  async fetchUserByUserName({ commit }, userName){
    return axios.get(`${server.baseUrl}/users/userName/${userName}`,
    {headers:{
      'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
    }})
    .then((res) => {
      //console.log(res.data);
      commit('setUser',res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
    
  },


};

const mutations = {
  READY_APP(state){
    state.appReady = true;
  },
  
  setFriends: (state, friends) => (state.friends = friends),
  setSuggestedFriends: (state, suggestedFriends) => (state.suggestedFriends = suggestedFriends),
  setUser: (state, user) => (state.user = user),
  setToken(state, access_token){
    state.access_token = access_token
  },
  setLoginUserInfo(state,data){
    state.loginUserInfo = data
  }
};

export default {
  //namespaced: true,
  state,
  getters,
  actions,
  mutations
}