<template>
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
</template>

<script>
import axios from "axios";

export default {
  name: 'Posts',
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
    }
  }
}
</script>

<style>
   @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';

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
        color: #0069d9;
        font-size: 1rem;
        font-weight: bold;
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