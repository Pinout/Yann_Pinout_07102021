<template>
          <div class="posts">
            <article class="post" v-for="post in posts" :key="post.authorId">

                <div class="post-header">

                    <img v-if="post.authorImg" :src="post.authorImg" class="rounded-circle img-profil-post" alt="image de profil"/> 
                    <span class="post-info">  {{post.author}} <br> {{convertDate(post.updatedAt)}} </span>

                        <div class="post-modif-suppr">
                           <a tabindex="0" type="submit" class="post-modify"  
                                @keypress="modifyPost(post)" @click="modifyPost(post)"   
                                v-if="post.authorId == $user.userId || $user.isAdmin == 1"
                            >
                            &#9881; 
                            </a>
                            <div class="d-flex flex-column">
                                <a tabindex="0" class="post-modify" 
                                    v-if="post.authorId == $user.userId || $user.isAdmin == 1"  
                                    @keypress="deletePost(post)" @click="deletePost(post)"> &#10006; 
                                </a>
                            </div>
                        </div>

                </div> 
                <h2 class="post-title">    {{post.title}}     </h2>
                <div class="post-content"> {{ post.content }} </div>
                <div class="container-img">
                    <img class="post-img" v-if="post.imgUrl" :src="post.imgUrl" alt="image d'un post"/>  
                </div>

                <div class="commentaires">
                    <div class="form-group">
                        <label for="content">
                            Ajouter un commentaire
                        </label>
                        <textarea type="text"  id="content" :name="post.id" class="form-control" maxlength="40" autocomplete="off" />
                        <button type="button" :id="post.id" @click="createComment()" class="btn btn-primary"> Commenter </button>
                    </div>

                    <div v-for="comment in comments" :key="comment.id">
                        <div v-if="comment.postId==post.id">
                            <span class="comm"> 
                                <div>
                                    <div class="comm-header">
                                        <img class="rounded-circle img-profil-comm" v-if="comment.authorImg" :src="comment.authorImg" alt="image de profil"/>
                                        <div class="rounded-circle img-profil-comm" v-if="!comment.authorImg">  
                                        </div>
                                        <p class="comm-author"> {{ comment.author }} <!--( {{convertDate(comment.updatedAt)}} )--> :</p> 
                                        <p class="comm-content"> {{ comment.content }} </p>
                                    </div>
                                     
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
import moment from 'moment'

export default {
  name: 'Posts',
  data() {
    return {
      posts: [],
      comments: [],
    };
  },
  updated() {
    this.getAllComments();
  },
  mounted(){
    this.getAllPosts();
    this.getAllComments();
    Vue.prototype.$token = JSON.parse(localStorage.user).token;
    Vue.prototype.$user = JSON.parse(localStorage.user);
  },
  /*async created() {
  const { data } = await this.getImage(); // Binary from server
  const blob = new Blob([data]);
  this.post.imgUrl = URL.createObjectURL(blob);
},*/
  
methods: {

// Convert date format
    convertDate(date){
        if (date) {
            return moment(String(date)).format('DD/MM/YYYY à h:mm:ss')
        }
    },
    
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
        if (confirm("Voulez-vous supprimer ce post ?")) {
            axios.delete(`http://localhost:3000/posts/${post.id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.$token}`
                }
            })
            .then(() => { alert("Post supprimé"); location.reload(); })
            .catch( () => (alert("Une erreur dans la suppression du post")) );
        }  
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
      .then(res => { 
            this.comments = res.data;
            //document.getElementById("content").innerHTML = ""; 
        })
    },
    createComment() {
        console.log(event.target.id);
        if(confirm("Création du commentaire..")) {
             axios.post("http://localhost:3000/comments",
                {
                    authorId: this.$user.userId,
                    postId: parseInt(event.target.id),//parseInt( document.getElementById(post.id).id ),
                    //author: this.$user.username,
                    content: document.getElementsByName(event.target.id)[0].value
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                })
                .then(() => { 
                    document.getElementById("content").value = "";
                    //location.reload();
                })
                .catch( () => (alert("Une erreur dans vos saisies")) );
        }
    },
    deleteComment(comment) {
        if (confirm("Voulez-vous supprimer ce commentaire ?")) {
            axios.delete(`http://localhost:3000/comments/${comment.id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.$token}`
                }
            })
            .then(() => { alert("Commentaire supprimé"); })
            .catch( () => (alert("Une erreur dans la suppression du commentaire")) );
        }
    },
  }
}
</script>

<style>
   @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';

   textarea { white-space: pre-line; }
    .posts{
        margin: 0 auto;
        padding: 20px;
        max-width: 100%;
    }
    .post{
        position: relative;
        padding: 20px 20px 20px 30px;
        margin-bottom: 30px;
        border-left: 5px solid #fd2d01;
        box-shadow: 0px 0px 50px -7px rgba(0,0,0,0.1);
        text-align: left;
        transition-duration: .1s;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        
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
        align-items: center;
        color: rgb(0, 0, 0);
        font-size: .8rem;
    }
    .img-profil-post {
        width: 4rem;
        height: 4rem;
        margin-right: 0.5rem;
    }
    .post-info {
        flex-grow: 2;
    }
    .post-modify{
        font-size: 2rem;
        margin-left: 2rem;
        display: block;
        color: black; 
    }
        .post-modify:hover {
            color: #fd2d01; /* orange */
            text-decoration: none;
        }
    .post-modif-suppr {
        display: flex;
    }
    .bouton-delete {
        display: none;
    }
    .post-title{
        color: black;
        white-space: pre-line;
        word-wrap: break-word;
    }
    .post-content{
        font-size: .9rem;
        white-space: pre-line;
        word-wrap: break-word;
    }
    .container-img {
        text-align: center;
    }
        .post-img{
            width: 60%;
            height: 60%;
            border-radius: 10%;
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
    .img-profil-comm {
        width: 2rem;
        height: 2rem;
        margin-right: 0.5rem;
    }
    .comm-header {
        display: flex;
        flex-direction: row;
    }
    .comm-author {
        font-weight: bold;
        font-size: .9rem;
        margin-bottom: 0;
        white-space:nowrap;
    }
    .comm-content {
        font-size: .9rem;
        margin-left: 3rem;
        margin-bottom: 0 !important;
        white-space: pre-line;
        word-wrap: break-word;
    }
    .btn-primary {
        background-color: #fd2d01 !important;
        /*color: black !important;*/
        border-color: #fd2d01 !important;
        /*font-weight: bold !important;*/
    }
        .btn-primary:hover {
            border-color: white !important;
        }

    @media (max-width: 580px) {
        .post {
            width: 100%;
            padding: 6px 6px 6px 6px;
        }
        .post-modif-suppr {
            display: flex;
            flex-direction: column;
        }
        .post-modify {
            margin-top: 0.8rem;
        }
        .comm-content, .comm-author { font-size: 0.7rem; }
        .comm-content {
            margin-left: 0.5rem;
        }

        .img-profil-post {
            width: 2.5rem;
            height: 2.5rem;
        }
        .img-profil-comm {
            width: 1.5rem;
            height: 1.5rem;
        }
        .commentaires {
            margin-left: 0;
        }
    }

</style>