import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: 'Nc',
      username: 'Nc',
      email: 'Nc',
      password: 'Nc',
      isAdmin: false,
      imgProfil: 'Nc'
    },
    editOption: ""
  },
  mutations: {
    saveUserInfos(state, [id, username, email, password, isAdmin, imgProfil]) {
        state.user.id = id,
        state.user.username = username,
        state.user.email = email,
        state.user.password = password,
        state.user.isAdmin = isAdmin,
        state.user.imgProfil = imgProfil
    },
    editStyle(state, value) {
      state.editOption = value
    }
  },
  actions: {
    
  },
  modules: {
  }
})