<template>
        <main class="main main--connect">
        <form v-on:submit.prevent="login" class="w-75 align-items-center form-block d-flex m-auto shadow rounded">
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
                    <input type="email" id="dataEmail" name="email" class="form-control" autocomplete="on" required v-model="inputLogin.email" />
                </div>
                <div class="form-group">
                    <label for="password">
                        Mot de passe
                    </label>
                    <input type="password" id="password" name="password" class="form-control" autocomplete="off" required v-model="inputLogin.password" />
                </div>
                <button type="submit" class="btn btn-primary">
                    Se connecter
                </button>
            </div>
        </form>
    </main>
</template>


<script>
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
            let loginDatas = {
                "email": this.inputLogin.email,
                "password": this.inputLogin.password
            }
            console.log(loginDatas)
            let url = "http://localhost:3000/users/login"
            let options = {
                method: "POST",
                body: JSON.stringify(loginDatas),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            fetch(url, options)
                .then(res => res.json())
                .then((res) => {
                    if (res.userId && res.token) {
                        localStorage.setItem("userId", res.userId)
                        localStorage.setItem("token", res.token)
                        localStorage.setItem("isAdmin", res.isAdmin);
                        console.log(localStorage)
                        this.$router.push("message");
                        alert(" Bienvenue sur Groupomania ");
                    } else {
                        alert(" Mot de passe incorrect ! ");
                    }
                })
                .catch(error => console.log(error))
        }
    }
}
</script>
<style>
   @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';
</style>
