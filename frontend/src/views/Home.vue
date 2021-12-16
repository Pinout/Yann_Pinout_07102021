<template>
  <div class="home">
    <Login v-if="!connected"/>
    <NewPost v-if="connected"/>
    <Posts v-if="connected"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import NewPost from '@/components/NewPost.vue'

export default {
  name: 'Home',
  components: {
    Login,
    NewPost
  },
  data() {
    return{
      connected: true
    };
  },

  created(){
    this.checkConnected()
  },

  methods: {
    checkConnected(){
      if(localStorage.userId !== undefined){
        this.connected = true;
        console.log('Utilisateur connecté !');
      }
      else if(localStorage.userId == undefined){
        this.connected = false;
        console.log('Utilisateur non connecté !');
      }
    }
  }
}
</script>
