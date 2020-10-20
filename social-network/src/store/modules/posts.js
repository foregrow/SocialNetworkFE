import axios from 'axios';
import server from '../../util/server';

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
    const response = await axios.get(`${server.baseUrl}/posts/userFriends/${server.loggedInUser}`);
    console.log(response.data);

    commit('setFriendsPosts', response.data);
  },
  async fetchUserPosts({ commit }, userId) {
    return axios.get(`${server.baseUrl}/posts/user/${userId}`).then((res) => {
      console.log(res.data);
      commit('setUserPosts',res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  },
  async addPost({ commit },text){
    let object = {
      "id":0,
      "text":text,
      "userId":1, //loggedInUserId
      "postDate":Date.now()
    }
    return axios.post(`${server.baseUrl}/posts/add`,object).then((res) => {
      console.log(res.data);
      commit('newPost',res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  }
};

const mutations = {
  setFriendsPosts: (state, friendsPosts) => (state.friendsPosts = friendsPosts),
  setUserPosts: (state, userPosts) => (state.userPosts = userPosts),
  newPost:(state, post) => state.userPosts.unshift(post)

};

export default {
  state,
  getters,
  actions,
  mutations
}