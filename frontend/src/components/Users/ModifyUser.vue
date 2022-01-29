<template>
        <main class="main main--connect">
        <form  v-on:submit.prevent="modifyUser" class="w-50 align-items-center justify-content-center form-block d-flex m-auto shadow rounded">
            

            <div class="block-demi-container p-3">
                <div class="form-group">
                    <label for="username">
                        Nom d'utilisateur
                    </label>
                    <input type="username" id="username" name="username" class="form-control" autocomplete="on" required v-model="input.username" />
                </div>
                <label for="password">
                        Mot de passe
                    </label>
                <div class="form-group div-password">
                    
                    <input type="password" id="password" name="password" class="form-control form-pass" autocomplete="off" v-model="input.password" required/>
                    <button type="button" id="show" class="show-pass" @click="showPassword()" > &#128064;<!-- Oeil --> </button>
                </div>

                <button class="btn btn-primary bouton-marge" > Modifier profil </button>
            </div>
        </form>
    </main>
</template>

<script>
import axios from "axios";
//import router from '../../router';

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
        showPassword() {
          var pass = document.getElementById("password");
          var show = document.getElementById("show");
          if (pass.type === "password") {
            pass.type = "text";
            show.innerHTML = "";
          } else {
            pass.type = "password";
            show.innerHTML = "&#128064;"
          }
        },

        modifyUser() {
            if(confirm("Modification en cours...")) {
                axios.put(`http://localhost:3000/users/${this.$user.userId}`, this.input,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                })
                    .then(() => { 
                        let user = JSON.parse( localStorage.getItem("user") );
                        user.username = document.getElementById("username").value;
                        localStorage.setItem("user" , JSON.stringify(user));
                        //router.push("/profile");
                        location.href = "/profile";
                    })
                    .catch( () => (alert("Une erreur dans vos saisies")) );
            }
        },
    }
}
</script>
<style>
   @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';

    button {
      margin-right: 2rem;
    }
    .show-pass {
        border-top-right-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
        width: 3rem;
        height: 2.38rem;
        margin-right: 0;
        margin-bottom: 1rem;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(206, 212, 218);
        position: relative;
        right: 0.4rem; 
        background-color: #e5e0e0;
       }
            .show-pass:hover {
                background-color: white;
                border-color: rgb(206, 212, 218);
            }
            .show-pass:focus {
                outline: none ;
            }
</style>