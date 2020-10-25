import axios from 'axios';
import server from '../../util/server';
import VueJwtDecode from 'vue-jwt-decode';
const state = {
  friendsPosts: [

  ],
  userPosts: [

  ]
};

const getters = {
  allFriendsPosts: (state) => state.friendsPosts,
  allUserPosts: (state) => state.userPosts,
};

const actions = {
  async fetchUserFriendsPosts({ commit }) {
    let access_token = localStorage.getItem('access_token');
    let decoded = VueJwtDecode.decode(access_token);
    let id = decoded.id;
    const response = await axios.get(`${server.baseUrl}/posts/userFriends/${id}`,
    {headers:{
      'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
    }});
    console.log(response.data);

    commit('setFriendsPosts', response.data);
  },
  async fetchUserPosts({ commit }, userId) {
    let access_token = localStorage.getItem('access_token');
    let decoded = VueJwtDecode.decode(access_token);
    let loggedInUserId = decoded.id;
    return axios.get(`${server.baseUrl}/posts/user/${userId}/${loggedInUserId}`,
    {headers:{
      'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
    }}).then((res) => {
      console.log(res.data);
      commit('setUserPosts',res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  },
  async addPost({ commit },text){
    let access_token = localStorage.getItem('access_token');
    let decoded = VueJwtDecode.decode(access_token);
    let id = decoded.id;
    let object = {
      "id":0,
      "text":text,
      "userId":id,
      "postDate":Date.now(),
      "numberOfLikes": 0
    }
    return await axios.post(`${server.baseUrl}/posts/add`,object,
    {headers:{
      'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
    }}).then((res) => {
      console.log(res.data);
      commit('newPost',res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  },
  addLike(_,postId){
    let access_token = localStorage.getItem('access_token');
    let decoded = VueJwtDecode.decode(access_token);
    let userId = decoded.id;
    let object = {
      "id":0,
      "likeSenderId":userId,
      "postId":postId
    }
    return axios.post(`${server.baseUrl}/likes/add`,object,
    {headers:{
      'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
    }}).then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  },
  removeLike(_,postId){
    let access_token = localStorage.getItem('access_token');
    let decoded = VueJwtDecode.decode(access_token);
    let userId = decoded.id;
    return axios.delete(`${server.baseUrl}/likes/unlike/${postId}/${userId}`,
    {headers:{
      'Authorization' : `Bearer ${access_token}`
    }}).then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  },
  removePost(_,postId){
    let access_token = localStorage.getItem('access_token');
    return axios.delete(`${server.baseUrl}/posts/${postId}`,
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
  setFriendsPosts: (state, friendsPosts) => (state.friendsPosts = friendsPosts),
  setUserPosts: (state, userPosts) => (state.userPosts = userPosts),
  newPost:(state, post) => state.userPosts.unshift(post),
  likeUp:(state, postId) => state.friendsPosts.array.forEach(post => {
    if(postId==post.id){
      post.numberOfLikes = post.numberOfLikes + 1
    }
    
  })


};

export default {
  state,
  getters,
  actions,
  mutations
}