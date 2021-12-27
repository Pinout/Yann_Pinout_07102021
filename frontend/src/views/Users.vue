<template >
  <div v-if="this.$user.isAdmin">
          <table class="table">
            <thead>
              <tr>
                <th> id </th>
                <th> username </th>
                <th> email </th>
                
                <th>  </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
               
                <td>{{ user.imgProfil }}</td>
              </tr>
            </tbody>
          </table>

          <div class="form-group">
            <label for="password">
                Entrez l'id à supprimer
            </label>
            <input type="text" id="id" name="id" class="form-control" autocomplete="off" required v-model="input.id" />
          </div>

          <button class="btn btn-danger" @click="deleteUser()"> Supprimer un compte </button>
  </div>
</template>

<script>
import axios from "axios"
//import router from "../router"

export default {
  name: 'Users',
  data() {
    return {
      users: [],
      input: { 
        id:""
      }
    };
  },
  mounted(){
    this.getAllUsers();
  },

  methods: {
    getAllUsers() {
      axios.get("http://localhost:3000/users/users",
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.$token}`
        } 
      })
      .then(res => { this.users = res.data; })
    },

    deleteUser(){
      const userId = this.input.id;
      axios.delete(`http://localhost:3000/users/${userId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.$token}`
            }
          }
      ).then(() => { alert("Utilisateur supprimé"); })
      .catch( () => (alert("Erreur")) );
    }
  }
}
</script>

<style>
   @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';
</style>