<template>
    <main class="main main--connect">
         <form v-on:submit.prevent="signup" class="w-75 align-items-center form-block  m-auto shadow rounded">
            <div class="form-block--left d-flex align-items-center flex-column justify-content-center block-demi-container p-3 text-right align-self-stretch">
              <img class="logo-connexion" src="../../assets/icon-above-font.svg" alt="Logo Groupomania" />
              <p>
                  <small>
                      Vous avez déjà un compte ?
                      <router-link to="/login"> Connectez-vous </router-link>
                  </small>
                </p>
            </div>
            <div class="block-demi-container p-3 text">
                <div class="form-group">
                    <label for="username">
                        
                    </label>
                    <input type="text" placeholder="Nom d'utilisateur" class="form-control" id="username" autocomplete="on" v-model="input.username" />
                </div>

                <div class="form-group">
                    <label for="email">
                    
                    </label>
                    <input type="email" placeholder="Email" class="form-control" id="email" autocomplete="on" v-model="input.email" />
                </div>
                
                <div class="form-group">
                    <label for="password">
                       
                    </label>
                    <input type="password" placeholder="Mot de passe" class="form-control" id="password" autocomplete="off" v-model="input.password" />

                </div>

                <div class="form-group">
                    <label for="password">
                       
                    </label>
                    <input type="password" placeholder="Confirmez le mot de passe" class="form-control" id="password2" autocomplete="off"  />
                </div>
                <!--<p> (Au moins 7 caractères) </p> -->
                
                <button type="submit" class="btn btn-primary">
                    S'inscrire
                </button>
            </div>
        </form>
    </main>
</template>

<script>
import axios from "axios";
import router from "../../router";
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
            const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,15}$/;
            const regexEmail = /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
            const regexPassword = /^[A-Za-z0-9]\w{6,15}$/;
                if(
                    (this.input.username != "" &&
                    this.input.email != "" &&
                    this.input.password != "" ) &&
                    (regexPassword.test(this.input.password) && regexEmail.test(this.input.email) && usernameRegex.test(this.input.username)) ) 
                {
                    if(document.getElementById("password").value == document.getElementById("password2").value){
                        axios.post("http://localhost:3000/users/signup", this.input)
                        .then(() => {
                            alert("Bienvenue");
                            localStorage.clear();
                            router.push("/login");
                        })
                        .catch(() => (alert("Erreur")));
                    } else {
                        alert("Vérifiez les champs mot de passe");
                    }     
                } else { alert("Problème avec les saisies"); }
        }
    }
}
</script>
<style>
   @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';

   .logo-connexion {
        width: 30%;
        height: auto;
   }

</style>
