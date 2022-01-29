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
            <div class="block-demi-container p-3 text">
                <div class="form-group">
                    <label for="email">
                        
                    </label>
                    <input type="email" placeholder="Email" id="dataEmail" name="email" class="form-control form-mail" autocomplete="on" required v-model="inputLogin.email" />
                </div>
                <div class="form-group div-password">
                    <label for="password">
                        
                    </label>
                    <input type="password" placeholder="Mot de passe" id="password" name="password" class="form-control form-pass" autocomplete="off" required v-model="inputLogin.password" />
                    <button type="button" id="show" class="show-pass" @click="showPassword()" > &#128064;<!-- Oeil --> </button>
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
//import router from "../../router";
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

        login() {
            if(confirm("Connexion en cours...")){
                axios.post("http://localhost:3000/users/login", this.inputLogin)
                    .then((response) => {
                        localStorage.clear();
                        localStorage.setItem("user", JSON.stringify(response.data));
                        console.log(localStorage);
                        //router.push("/");
                        location.href = "/";
                    })
                    .catch( () => (alert("email ou mot de passe invalide !")) );
            }
        }
    }
}
</script>
<style >
   @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';

   .logo-connexion {
        width: 40%;
        height: auto;
   }
   .text {
    max-width: 20rem;
    margin: auto;
   }
   .div-password {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    margin-right: 0;
   }
        .form-mail {
            width: 17.6rem !important;
        }
       .form-pass {
        width: 15rem !important;
       }
           .form-pass:focus {
                outline: none !important;
                box-shadow: none !important;
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

<style scoped>
   #nav {
    display: none;
   }
</style>
