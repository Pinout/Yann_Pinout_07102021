<template>
          <table class="table" >
            <thead>

            </thead>
            <tbody v-for="post in posts" :key="post.title">
                <tr>{{ post.title }}</tr>
                <tr>{{ post.author }}</tr>
                <tr>{{ post.content }}</tr>
            </tbody>
          </table>
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
</style>