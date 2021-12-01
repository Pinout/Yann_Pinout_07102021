<template>
          <table class="table">
            <thead>
              <tr>
                <th> id </th>
                <th> username </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.username }}</td>
              </tr>
            </tbody>
          </table>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {

      users: [],

    };
  },
  methods: {
    getAllUsers() {
      axios.get("http://localhost:3000/api/auth/users")
        .then(response => (this.users = response.data))
        .catch(error => console.log(error.message));
    }
  }
}
</script>

<style>
   @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';
</style>