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
  name: 'Users',
  data() {
    return {
      users: [],
    };
  },
  methods: {
    getAllUsers() {
      axios.get("http://localhost:3000/users/users")
      .then(() => { console.log(this.users) })
      .catch(() => console.log("Erreur"));
      /*let url = "http://localhost:3000/users/users"
      let options = {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
      }
      console.log(options)
      fetch(url, options)
        .then(res => res.json())
        .catch(error => console.log(error))*/
    }
  }
}
</script>

<style>
   @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';
</style>