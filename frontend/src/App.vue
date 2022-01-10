<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"> Accueil </router-link> |
      <router-link v-if="this.$user.userId==0" to="/login"> Connexion </router-link> <span v-if="this.$user.userId==0"> | </span>
      <router-link to="/profile"> profil </router-link>
      <router-link v-if="this.$user.isAdmin" to="/users"> | utilisateurs </router-link>
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
  
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #0069d9;
}
</style>
