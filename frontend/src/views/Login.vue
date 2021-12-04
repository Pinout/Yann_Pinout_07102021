<template>
        <main class="main main--connect">
        <form class="w-75 align-items-center form-block d-flex m-auto shadow rounded">
            <div class="form-block--left d-flex flex-column justify-content-center block-demi-container p-3 text-right align-self-stretch">
              <img class="logo align-self-end" src="../assets/icon.svg" alt="Logo Groupomania" />
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
                        Email
                    </label>
                    <input type="email" id="dataEmail" name="email" class="form-control" autocomplete="on" required v-model="dataLogin.email" />
                </div>
                <div class="form-group">
                    <label for="password">
                        Mot de passe
                    </label>
                    <input type="password" id="password" name="password" class="form-control" autocomplete="off" required v-model="dataLogin.password" />
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
export default {
    name: "Login",
    data() {
        return {
            dataLogin: {
                email: "",
                password: ""
            }
        }
    },
    methods: 
    {
        login()
        {
            const email = this.datalogin.email;
            const password = this.dataLogin.password;
            axios.post(`http://localhost:3000/api/auth/login`,
                {
                    email,password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data));
                location.reload();
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    this.message = "Utilisateur inconnu.";
                }
                if (error.response.status === 401) {
                    this.message = "Email ou mot de passe invalide.";
                }
                if (error.response.status === 500) {
                    this.message = "Erreur serveur.";
                }
            });
        }
    }
}

</script>
<style>
   @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';
</style>
