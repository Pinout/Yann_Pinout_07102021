<template>
    <main class="main main--connect">
        <form v-on:submit.prevent="signup" class="w-75 align-items-center form-block d-flex m-auto shadow rounded">
            <div class="form-block--left d-flex flex-column justify-content-center block-demi-container p-3 text-right align-self-stretch">
              <img class="logo align-self-end" src="../assets/icon.svg" alt="Logo Groupomania" />
              <p>
                  <small>
                      Vous avez déjà un compte ?
                      <router-link to="/login"> Connectez-vous </router-link>
                  </small>
                </p>
            </div>
            <div class="block-demi-container p-3">
                <div class="form-group">
                    <label for="username">
                        Nom d'utilisateur
                    </label>
                    <input type="text" class="form-control" id="username" autocomplete="on" v-model="input.username" />
                </div>

                <div class="form-group">
                    <label for="email">
                        Email
                    </label>
                    <input type="email" class="form-control" id="email" autocomplete="on" v-model="input.email" />
                </div>
                
                <div class="form-group">
                    <label for="password">
                        Mot de passe
                    </label>
                    <input type="password" class="form-control" id="password" autocomplete="off" v-model="input.password" />
                    <p> (Au moins 7 caractères) </p>
                </div>

                <button type="submit" class="btn btn-primary">
                    S'inscrire
                </button>
            </div>
        </form>
    </main>
</template>

<script>
//import { apiClient } from '../services/UserDataService'
import axios from "axios";
//import { mapState } from "vuex";
//import { HTTP } from '../http-common';
//import router from "../router";

export default {
    name: 'Signup',
    data() {
        return {
            input: {
                username:"",
                email:"",
                password:""
            }
        }
    },
    methods: {
        signup() 
        {
            /*let inputDatas = {
                            "username": this.input.username,
                            "email": this.input.email,
                            "password": this.input.password
                        }*/
            const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,15}$/;
            const regexEmail = /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
            const regexPassword = /^[A-Za-z0-9]\w{6,15}$/;

                if(
                    (this.input.username != "" &&
                    this.input.email != "" &&
                    this.input.password != "" ) &&
                    (regexPassword.test(this.input.password) && regexEmail.test(this.input.email) && usernameRegex.test(this.input.username)) ) 
                {
                    axios.post("http://localhost:3000/users/signup", this.input)
                    .then((response) => {
                        alert("Vous êtes inscrit");
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("userId", response.data.userId);
                    })
                    .catch(() => (alert("Erreur")));
                     /*   console.log(inputDatas)
                        let url = "http://localhost:3000/users/signup"
                        let options = {
                            method: "POST",
                            body: JSON.stringify(inputDatas),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                        console.log(options)
                        fetch(url, options)
                            .then(res => res.json())
                            .then((res) => {
                                /*if (res.userId && res.token){*/
                             /*   localStorage.setItem("userId", res.userId);
                                localStorage.setItem("token", res.token);
                                console.log(localStorage)
                                this.$router.push("/");
                                alert("Bienvenue sur Groupomania");
                                /*} */
                           // })
                            //.catch(error => console.log(error))
                } else { alert("Problème avec les saisies"); }
        }
    }
}
</script>
<style>
   @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';
</style>
