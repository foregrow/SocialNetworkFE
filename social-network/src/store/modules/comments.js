import axios from 'axios';
import server from '../../util/server';
import VueJwtDecode from 'vue-jwt-decode';
const state = {
  postComments: [

  ],
};

const getters = {
  allPostComments: (state) => state.postComments,
};

const actions = {
  async fetchPostComments({ commit },postId) {
    let access_token = localStorage.getItem('access_token');
    return axios.get(`${server.baseUrl}/comments/post/${postId}`,
    {headers:{
      'Authorization' : `Bearer ${access_token}`
    }}).then((res)=>{
      console.log(res.data);
      commit('setPostComments', res.data);
      return res.data
    }).catch(()=>{
      console.log('failed fetching comments');
    });
    
  },
  async addComment({ commit },objParam){
    let access_token = localStorage.getItem('access_token');
    let decoded = VueJwtDecode.decode(access_token);
    let commentSenderId = decoded.id;
    let commentSenderUserName = decoded.userName;
    let object = {
      "id":0,
      "content":objParam.content,
      "postId":objParam.postId,
      "commentSenderId":commentSenderId,
      "commentSenderUserName":commentSenderUserName,
      "commentDate": Date.now()
    }
    return await axios.post(`${server.baseUrl}/comments/add`,object,
    {headers:{
      'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
    }}).then((res) => {
      console.log(res.data);
      commit('newComment',res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  },
  removeComment(_,postId){
    let access_token = localStorage.getItem('access_token');
    let decoded = VueJwtDecode.decode(access_token);
    let userId = decoded.id;
    return axios.delete(`${server.baseUrl}/comments/${postId}/${userId}`,
    {headers:{
      'Authorization' : `Bearer ${access_token}`
    }}).then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  },
};

const mutations = {
  setPostComments: (state, postComments) => (state.postComments = postComments),
  newComment:(state, comment) => state.postComments.unshift(comment),


};

export default {
  state,
  getters,
  actions,
  mutations
}