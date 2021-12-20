<template>
          <table class="table" >
            <thead>

            </thead>
            <tbody v-for="post in posts" :key="post.id">
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
  methods: {
    getAllPosts() {
      axios.get("http://localhost:3000/posts")
      .then(() => { console.log(this.posts) })
      .catch(() => console.log("Erreur"));
    }
  }
}
</script>

<style>
   @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';
</style>