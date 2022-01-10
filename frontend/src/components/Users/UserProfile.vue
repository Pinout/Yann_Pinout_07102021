<template>
    <div>
        <article id="profil" class="profil">
          <span>
            <h4> ID : {{this.$user.userId}} </h4> 
          </span>
          <span>
            <h4> nom d'utilisateur : {{this.$user.username}}    </h4> 
          </span>
          <span>
            <h4> email : {{this.$user.email}}   </h4>   
          </span>
          <div class="profil-footer">
            <router-link class="link" to="/modifyUser"> Modifier profil </router-link> 
            <a class="link" @click="deconnexion()"> Déconnexion </a>
          </div> 
        </article>
        
        <br>  
        
<br><br><br>
        <h2> Vos posts </h2>

        <div class="posts" v-for="post in posts" :key="post.authorId">
            <article class="post" v-if="post.authorId==$user.userId">
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

        <button class="btn btn-danger" @click="deleteUser()"> Supprimer le compte </button>
    </div>
</template>

<script>
import axios from 'axios';
import router from '../../router';
import Vue from 'vue'

export default {
  name: 'UserProfile',

data() {
    return {
        posts: [],
        componentKey: 0,

    };
  },

  mounted(){
    this.getAllPosts();
    Vue.prototype.$token = JSON.parse(localStorage.user).token;
    Vue.prototype.$user = JSON.parse(localStorage.user);
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
      router.push("/");
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
      margin-bottom: 1rem;
    }
    h3 { margin: 0.5rem; }
    
    .link {
        color: black;
        margin-right: 1rem;
        text-decoration: none;
    }

    .profil {
        position: relative;
        padding: 20px 20px 20px 30px;
        margin-bottom: 30px;
        border-left: 5px solid #0069d9;
        box-shadow: 0px 0px 50px -7px rgba(0,0,0,0.1);
        text-align: left;
        transition-duration: .1s;
        margin: 1rem;
        padding: 20px;
    }
    .profil-footer {
        display: flex;
        justify-content: flex-end;
        color: rgb(0, 0, 0);
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