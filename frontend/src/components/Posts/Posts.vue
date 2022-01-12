<template>
          <div class="posts">
            <article class="post" v-for="post in posts" :key="post.authorId">

                <div class="post-header">
                  <span class="post-info">  Posté par {{post.author}} </span>
                   <a type="submit" class="post-modify" @click="modifyPost(post)"  
                    v-if="post.authorId == $user.userId || $user.isAdmin == 1">
                    Modifier 
                    </a>
                  <a class="post-modify" v-if="post.authorId == $user.userId || $user.isAdmin == 1" @click="deletePost(post)"> Supprimer </a>
                </div> 
                <h2 class="post-title">    {{post.title}}     </h2>
                <div class="post-content"> {{ post.content }} </div>
                <img class="post-img" v-if="post.imgUrl" :src="post.imgUrl" alt="image d'un post"/>  

                <div class="commentaires">
                    <div class="form-group">
                        <label for="content">
                            Ajouter un commentaire
                        </label>
                        <input type="content" id="commentContent" name="content" class="form-control" maxlength="40" autocomplete="off" />
                        <button type="submit" @click="createComment(post)" class="btn btn-primary"> Commenter </button>
                    </div>

                    <div v-for="comment in comments" :key="comment.id">
                        <div v-if="comment.postId==post.id">
                            <span class="comm"> 
                                <div>
                                    <p class="comm-author"> {{ comment.author }}: </p> 
                                    <p class="comm-content"> {{ comment.content }} </p> 
                                </div>
                                <a v-if="comment.authorId == $user.userId || $user.isAdmin == 1" class="croix" @click="deleteComment(comment)"> &#10006; </a>
                            </span> 
                        </div>
                    </div>
                </div>
                
            </article>
          </div>
</template>

<script>
import axios from "axios"
import router from "../../router"
import Vue from 'vue'

export default {
  name: 'Posts',
  data() {
    return {
      posts: [],
      comments: [],
      componentKey: 0,
    };
  },

  mounted(){
    this.getAllPosts();
    this.getAllComments();
    Vue.prototype.$token = JSON.parse(localStorage.user).token;
    Vue.prototype.$user = JSON.parse(localStorage.user);
  },
  async created() {
  const { data } = await this.getImage(); // Binary from server
  const blob = new Blob([data]);
  this.post.imgUrl = URL.createObjectURL(blob);
},
  
  methods: {
    
// Posts
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
            .catch( () => (alert("Une erreur dans la suppression du post")) );

        axios.delete(`http://localhost:3000/comments/all/${post.id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.$token}`
                }
            })
            .then(() => {
                    alert("Commentaires du post supprimés"); 
                    location.reload();
                })
                .catch( () => (alert("Une erreur dans la suppression des commentaires")) );
    },
    modifyPost(post) {
        localStorage.setItem("postId", JSON.stringify(post.id));
        localStorage.setItem("postTitle", JSON.stringify(post.title));
        localStorage.setItem("postContent", JSON.stringify(post.content));
        localStorage.setItem("postImg", JSON.stringify(post.imgUrl));

        router.push("/modifyPost");
    },

// Comments
    getAllComments() {
      axios.get("http://localhost:3000/comments",
        {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.$token}`
            }
        })
      .then(res => { this.comments = res.data; })
    },
    createComment(post) {
         axios.post("http://localhost:3000/comments",
            {
                authorId: this.$user.userId,
                postId: post.id,
                author: this.$user.username,
                content: document.getElementById("commentContent").value
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.$token}`
                }
            })
            .then(() => {
                alert("Commentaire créé"); 
                location.reload();
            })
            .catch( () => (alert("Une erreur dans vos saisies")) );
    },
    deleteComment(comment) {
        axios.delete(`http://localhost:3000/comments/${comment.id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.$token}`
                }
            })
            .then(() => {
                    alert("Commentaire supprimé"); 
                    location.reload();
                })
                .catch( () => (alert("Une erreur dans la suppression du commentaire")) );
    },
  }
}
</script>

<style>
   @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';


    .posts{
        margin: 0 auto;
        padding: 20px;
        max-width: 100%;
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
    .post-info {
        flex-grow: 2;
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
    .form-control {
        margin-bottom: 1rem;
    }
    .commentaires {
        margin-top: 2rem;
        margin-left: 3rem;
    }
    .comm {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .comm-author {
        font-weight: bold;
        font-size: .9rem;
        margin-bottom: 0;
    }
    .comm-content {
        font-size: .9rem;
        margin-left: 1rem;
    }

    @media (max-width: 480px) {
        .comm-content, .comm-author { font-size: 0.7rem; }
    }

</style>