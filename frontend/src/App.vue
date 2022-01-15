<template>
  <div id="app">
    <div id="nav" class="nav">
      <router-link to="/"> Accueil </router-link> 
      <router-link v-if="this.$user.userId==0" to="/login"> Connexion </router-link> <span v-if="this.$user.userId==0">  </span>
      <router-link to="/profile"> profil </router-link>
      <router-link v-if="this.$user.isAdmin" to="/users">  utilisateurs </router-link>
    </div>
    <router-view/>
  </div>
</template>

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
  background-color: #ececec;
  
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
  position: relative;
  padding: 20px 20px 20px 30px;
  margin-bottom: 30px;
  border-left: 5px solid #0069d9;
  box-shadow: 0px 0px 50px -7px rgba(0,0,0,0.1);
  text-align: left;
  transition-duration: .1s;
  
}

@media (max-width: 400px) {
  #nav a {
    font-size: 0.8rem;
  }
}
</style>
