<template>
  <div class="home">
    <LoginHome v-if="!connected"/>
    <NewPost v-if="connected"/>
    <Posts v-if="connected"/>
  </div>
</template>

<script>
// @ = /src
import LoginHome from '@/components/LoginHome.vue'
import NewPost from '@/components/NewPost.vue'
import Posts from '@/components/Posts.vue'

//import axios from "axios";

export default {
  name: 'Home',
  components: {
    LoginHome,
    NewPost,
    Posts
  },
  data() {
    return{
      connected: ""
    };
  },

  created(){
    this.checkConnected();
    console.log(localStorage);
  },

  methods: {
    checkConnected(){
      if(localStorage.user !== undefined){
        this.connected = true;
        console.log('Utilisateur connecté !');
      }
      else if(localStorage.user == undefined){
        this.connected = false;
        console.log('Utilisateur non connecté !');
      }
    }
  }
}
</script>
