<template>
    <main class="main main--connect">
        <form class="w-75 align-items-center form-block d-flex m-auto shadow rounded">
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
                    <input type="text" class="form-control" id="username" autocomplete="on" v-model="dataSignup.username" />
                </div>

                <div class="form-group">
                    <label for="email">
                        Email
                    </label>
                    <input type="email" class="form-control" id="email" autocomplete="on" v-model="dataSignup.email" />
                </div>
                
                <div class="form-group">
                    <label for="password">
                        Mot de passe
                    </label>
                    <input type="password" class="form-control" id="password" autocomplete="off" v-model="dataSignup.password" />
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
import axios from "axios";

export default {
    name: "Signup",
    data() {
            return {
                dataSignup: {
                        username: null,
                        email: null,
                        password: null
                },
            };
    },
    methods: 
    {
        signup() 
        {
            const username = this.dataSignup.username;
            const email = this.dataSignup.email;
            const password = this.dataSignup.password;

            const regexPassword = /^[A-Za-z0-9]\w{6,15}$/;
            const regexEmail = /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
            const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,15}$/;

                if(
                    (this.dataSignup.email !== null ||
                    this.dataSignup.username !== null ||
                    this.dataSignup.password !== null ) &&
                    (regexPassword.test(this.dataSignup.password) && regexEmail.test(this.dataSignup.email) && usernameRegex.test(this.dataSignup.username)) ) 
                {
                    axios.post(`http://localhost:3000/api/auth/signup`,
                        {
                           username,email,password
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    )
                    .then(res => {
                    if(res.status === 201) {
                        location.href = '/';
                    }
                    })
                    .catch((error) => {
                        if (error.response.status === 401) {
                             this.message = "Email non disponible.";
                        }  
                    });
                }
        }
    }
};
</script>
<style>
   @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';
</style>
