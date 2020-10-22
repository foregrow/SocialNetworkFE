import axios from 'axios';
import server from '../../util/server';
//import router from 'vue-router';

const state = {
  photo: [

  ],
};

const getters = {
  singlePhoto: (state) => state.photo
};

const actions = {

  async fetchUserPhoto({ commit }, userId){
    return axios.get(`${server.baseUrl}/photos/user/${userId}`,
    {headers:{
      'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
    }})
    .then((res) => {
      commit('setPhoto',res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
    
  },
};

const mutations = {
  setPhoto: (state, photo) => (state.photo = photo)
};

export default {
  state,
  getters,
  actions,
  mutations
}