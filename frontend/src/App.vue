<template>
  <div id="app">
    <div id="nav" class="nav" v-if="this.$user.userId!=0">
      <router-link to="/"> 
        <img class="img-nav" src="@/assets/icon-left-font-monochrome-black.svg" alt="logo accueil" /> 
      </router-link> 
      <div>
        <router-link v-if="this.$user.isAdmin" to="/users">  utilisateurs </router-link>
        <router-link  to="/profile"> profil </router-link>
         <a class="link" @click="deconnexion()"> Déconnexion </a>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    deconnexion() {
      localStorage.clear();
      location.reload();
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  /*background-color: #ececec;*/
  
}

#nav a {
  margin: 1rem;
  font-weight: bold;
  color: #2c3e50;
  font-size: 1.1rem;
}
#nav a:hover { 
  color: #696e73;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #0069d9;
}
.nav {
  /*position: relative;
  padding: 20px 20px 20px 30px;
  margin-bottom: 30px;
  border-left: 5px solid #0069d9;
  box-shadow: 0px 0px 50px -7px rgba(0,0,0,0.1);
  text-align: left;
  transition-duration: .1s;*/
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
}

.img-nav {
  width: 50%;
  height: auto;
}

@media (max-width: 400px) {
  
  .nav {
    text-align: center;
    justify-content: space-around;
  }
  #nav div {
    text-align: center;
  }
}
</style>
