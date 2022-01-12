<template>
        <main class="main main--connect">
        <form  class="w-75 align-items-center form-block d-flex m-auto shadow rounded">
            <div class="form-block--left d-flex flex-column justify-content-center block-demi-container p-3 text-right align-self-stretch">
              <img class="logo align-self-end" src="../../assets/icon.svg" alt="Logo Groupomania" />
            </div>

            <div class="block-demi-container p-3">
                <div class="form-group">
                    <label for="username">
                        Nom d'utilisateur
                    </label>
                    <input type="username" id="username" name="username" class="form-control" autocomplete="on" required v-model="input.username" />
                </div>

                <div class="form-group">
                    <label for="password">
                        Mot de passe
                    </label>
                    <input type="password" id="password" name="password" class="form-control" autocomplete="off" required v-model="input.password" />
                </div>

                <button class="btn btn-primary" @click="modifyUser()"> Modifier profil </button>
            </div>
        </form>
    </main>
</template>

<script>
import axios from "axios";
import router from '../../router';

export default {
    name: 'Modify',
    data() {
        return {
            input: {
                username: this.$user.username,
                password: "",
            },
        }
    },

    
    methods: {

        modifyUser() {
            axios.put(`http://localhost:3000/users/${this.$user.userId}`, this.input,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.$token}`
                }
            })
                .then(() => {
                    alert("Profil modifié"); 
                    let user = JSON.parse( localStorage.getItem("user") );
                    user.username = document.getElementById("username").value;
                    localStorage.setItem("user" , JSON.stringify(user));
                    router.push("/profile");
                })
                .catch( () => (alert("Une erreur dans vos saisies")) );
        },
    }
}
</script>
<style>
   @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';

    button {
      margin-right: 2rem;
    }

</style>