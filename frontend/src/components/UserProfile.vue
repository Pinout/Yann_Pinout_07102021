<template>
    <div>
        <table>
          <tr>
            <td> <h3> ID     </h3> </td>
            <td> <h3> {{this.$user.userId}} </h3> </td>
          </tr>
          <tr>
            <td> <h3> nom d'utilisateur     </h3> </td>
            <td> <h3> {{this.$user.username}} </h3> </td>
          </tr>
          <tr>
            <td> <h3> email              </h3> </td>
            <td> <h3> {{this.$user.email}} </h3> </td>
          </tr>
        </table>
        <br>
        <button class="btn btn-primary" @click="deconnexion()"> Se déconnecter </button>
        <button class="btn btn-danger" @click="deleteUser()"> Supprimer le compte </button>

        <div class="posts">
            <article class="post" v-for="post in posts" :key="post.authorId">
                <div class="post-header">
                  <span class="post-info">  Posté par {{post.author}} </span>
                  <router-link to="/modify" class="post-modify" v-if="post.authorId == $user.userId || $user.isAdmin == 1"> Modifier </router-link> 
                </div> 
                <h2 class="post-title">    {{post.title}}     </h2>
                <div class="post-content"> {{ post.content }} </div>
                <div class="post-img"> {{ post.imgUrl }} </div>
            </article>
          </div>
    </div>
</template>

<script>
import axios from 'axios';
import router from '../router';

export default {
  name: 'UserProfile',

  mounted(){
      this.getPostsByAuthorId();
    },

  methods: {
    getPostsByAuthorId() {
      const userId = this.$user.userId;
      axios.get(`http://localhost:3000/posts/${userId}`,
        {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.$token}`
            }
        })
      .then(res => { this.posts = res.data; })
    },

    deconnexion() {
      localStorage.clear();
      router.push("/");
    },

    deleteUser() {
      const userId = this.$user.userId;
      axios.delete(`http://localhost:3000/users/${userId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.$token}`
            }
          }
      )
      .then(localStorage.removeItem('user'))
      .then(router.push("/"));
    }
  }
}
</script>

<style scoped>
    @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';
    table {
        text-align: left;
        margin-left: 1rem;
    }
    table, td {
      border: 1px solid #333;
    }
    button {
      margin-right: 20rem;
    }
    h3 { margin: 0.5rem; }
</style>