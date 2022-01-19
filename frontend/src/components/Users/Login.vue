<template>

        <main class="main main--connect">

         <form v-on:submit.prevent="login" class="w-75 align-items-center form-block  m-auto shadow rounded">
            <div class="form-block--left d-flex align-items-center flex-column justify-content-center block-demi-container p-3 text-right align-self-stretch">
              <img class="logo-connexion" src="../../assets/icon-above-font.svg" alt="Logo Groupomania" />
              <p>
                  <small>
                      Pas de compte ?
                      <router-link class="redirection-singup" to="/signup"> Inscrivez-vous </router-link>
                  </small>
                </p>
            </div>
            <div class="block-demi-container p-3">
                <div class="form-group">
                    <label for="email">
                        
                    </label>
                    <input type="email" placeholder="Email" id="dataEmail" name="email" class="form-control" autocomplete="on" required v-model="inputLogin.email" />
                </div>
                <div class="form-group">
                    <label for="password">
                        
                    </label>
                    <input type="password" placeholder="Mot de passe" id="password" name="password" class="form-control" autocomplete="off" required v-model="inputLogin.password" />
                </div>
                <button type="submit" class="btn btn-primary">
                    Se connecter
                </button>
            </div>
        </form>
    </main>
</template>


<script>
import axios from "axios";
import router from "../../router";

export default {
    name: 'Login',
    data() {
        return {
            inputLogin: {
                email: "",
                password: ""
            }
        }
    },
    methods: {
        login() {
             axios.post("http://localhost:3000/users/login", this.inputLogin)
                .then((response) => {
                    alert("Vous êtes connecté");
                    localStorage.clear();
                    localStorage.setItem("user", JSON.stringify(response.data));
                    console.log(localStorage);
                    router.push("/");
                })
                .catch( () => (alert("email ou mot de passe invalide !")) );
        }
    }
}
</script>
<style>
   @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';

   .logo-connexion {
        width: 40%;
        height: auto;
   }
</style>
