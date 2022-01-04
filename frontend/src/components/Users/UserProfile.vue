<template>
    <div>
        <table>
          <router-link to="/modifyUser"> Modifier profil </router-link>
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
        <div class="boutons">
          <button class="btn btn-primary" @click="deconnexion()"> Se déconnecter </button>
          <button class="btn btn-danger" @click="deleteUser()"> Supprimer le compte </button>
        </div>
<br><br><br>
        <h2> Vos posts </h2>
        <div class="posts" v-for="post in posts" :key="post.authorId">
            <article class="post" v-if="post.authorId==$user.userId"   >
                <div class="post-header">
                  <span class="post-info">  Posté par {{post.author}} </span>

                  <a type="submit" @click="modifyPost(post)" class="post-modify" 
                    v-if="post.authorId == $user.userId || $user.isAdmin == 1">
                    Modifier 
                    </a>
                  <a class="post-modify" @click="deletePost(post)"> Supprimer </a>

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
import router from '../../router';

export default {
  name: 'UserProfile',

data() {
    return {
      posts: [],
    };
  },

  mounted(){
      this.getAllPosts();
    },

  methods: {
    getAllPosts() {
      axios.get("http://localhost:3000/posts",
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
      header.location("/");
    },

    deleteUser() {
      axios.delete(`http://localhost:3000/users/${this.$user.userId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.$token}`
            }
          }
      )
      .then(localStorage.removeItem('user'))
      .then(router.push("/"));
    },

    modifyPost(post) {
        localStorage.setItem("postId", JSON.stringify(post.id));
        router.push("/modifyPost");
    },

    deletePost(post) {
        axios.delete(`http://localhost:3000/posts/${post.id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.$token}`
                }
            })
            .then(() => {
                alert("Post supprimé"); 
                location.reload();
            })
            .catch( () => (alert("Une erreur dans vos saisies")) );
    }
  }
}
</script>

<style scoped>
    @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';
    table {
        text-align: left;
        margin: auto;
    }
    table, td {
      border: 1px solid #333;
    }
    button {
      margin: auto;
    }
    h3 { margin: 0.5rem; }
    .boutons {
      display: flex;
      
    }

/* Posts */
    .posts{
        margin: 0 auto;
        padding: 20px;
        max-width: 800px;
    }
    .post{
        position: relative;
        padding: 20px 20px 20px 30px;
        margin-bottom: 30px;
        border-left: 5px solid #0069d9;
        box-shadow: 0px 0px 50px -7px rgba(0,0,0,0.1);
        text-align: left;
        transition-duration: .1s;
    }
    .post:hover{
        box-shadow: 0px 0px 50px -7px rgba(0, 0, 0, 0.2);
    }
    .post h2{
        margin-top: 7px;
    }
    .post-header{
        display: flex;
        justify-content: space-between;
        color: rgb(0, 0, 0);
        font-size: .8rem;
    }
    .post-modify{
        font-size: 1rem;
        margin-left: 1rem;
    }
    .post-title{
        color: black;
    }
    .post-content{
        font-size: .9rem;
    }
    .post-img{
      max-width: 100%;
      height: auto;
    }
</style>