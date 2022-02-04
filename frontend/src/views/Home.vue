<template>
  <div class="home">
    <h2 class="m-4"> Bienvenue sur Groupomania </h2>
    <router-link to="/newPost" v-if="connected"> 
        <button class="btn btn-primary btn-create"> Créer une publication </button>
    </router-link>

    <Login v-if="!connected"/>
    <Posts v-if="connected"/>
    <Footer />
  </div>
</template>

<script>
// @ = /src
import Login from '@/components/Users/Login.vue'
import Posts from '@/components/Posts/Posts.vue'
import Footer from '@/components/Footer'
//import Vue from 'vue'
//import axios from "axios";
export default {
  name: 'Home',
  components: {
    Login,
    Posts,
    Footer
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

<style>
  
  .btn-create {
    margin: 3rem 0 3rem 0;
    width: 15rem;
    height: 4rem;
    border-radius: 2rem !important;
  }
</style>