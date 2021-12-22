<template>
    <div>
        <table>
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
        <button class="btn btn-danger" @click="deleteUser()"> Supprimer le compte </button>
    </div>
</template>

<script>
import axios from 'axios';
import router from '../router';

export default {
    name: 'UserProfile',
   methods: {
    deleteUser(){
      const userId = this.$user.userId;
      axios.delete(`http://localhost:3000/users/${userId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.$token}`
            }
          }
      )
      .then(localStorage.removeItem('user'))
      .then(router.push("/"));
    }
  }
}
</script>

<style scoped>
    @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';
    table {
        text-align: left;
    }
    table,
    td {
        border: 1px solid #333;
    }

</style>