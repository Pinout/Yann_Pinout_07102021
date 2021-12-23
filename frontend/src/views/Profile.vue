<template>
    <div class="Profile">
        <Login v-if="!connected"/>

        <UserProfile v-if="connected"/> 
    </div>
</template>

<script>
import Login from '@/components/Login.vue';
import UserProfile from '@/components/UserProfile.vue';
//import router from "../router";

export default {
    name: 'Profile',
    components: {
        Login,
        UserProfile,
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
      if(localStorage.user !== undefined){
        this.connected = true;
        console.log('Utilisateur connecté !');
      } else if(localStorage.user == undefined){
        this.connected = false;
        console.log('Utilisateur non connecté !');
      }
    },
  },
}
</script>
<style scoped>
</style>