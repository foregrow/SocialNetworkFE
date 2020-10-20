import axios from 'axios';
import server from '../../util/server';
//import router from 'vue-router';

const state = {
  userCred: {}
  ,
  friends: [
    
  ],
  suggestedFriends: [

  ],
  user: [

  ],
  appReady: false
};

const getters = {
  allFriends: (state) => state.friends,
  allSuggestedFriends: (state) => state.suggestedFriends,
  singleUser: (state) => state.user,
  appReady: (state) => state.appReady

};

const actions = {
  loginUser(/*{}, user*/){
    axios
    .post(`${server.base}/authenticate`)//proslediti un&pw
    .then( res=>{
      if(res.data.access_token){
        //save
        //console.log(res.data.access_token)
        localStorage.setItem(
          "access_token",
          res.data.access_token
        )
        //indow.location.replace('/main');
      }
    })
  },
  async fetchUsersFriends({ commit }){
    const response = await axios.get(`${server.baseUrl}/users/friends/${server.loggedInUser}`);

    commit('setFriends',response.data);
  },
  async fetchUsersSuggestedFriends({ commit }){
    const response = await axios.get(`${server.baseUrl}/users/suggested/${server.loggedInUser}`);

    commit('setSuggestedFriends',response.data);
  },
  async fetchUserByUserName({ commit }, userName){
    return axios.get(`${server.baseUrl}/users/userName/${userName}`)
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
  setUser: (state, user) => (state.user = user)
};

export default {
  //namespaced: true,
  state,
  getters,
  actions,
  mutations
}