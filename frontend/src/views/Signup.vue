<template>
     
          <div class="blocsignup">          
            <h2>Pour rejoindre la communauté, merci de remplir ce formulaire</h2>
            <form v-on:submit.prevent="signup" id="form-signup" >
              <div class="form-group">
                <label for="lastname">Nom :</label>
                <input type="text" id="lastname" name="lastname" class="form-control" required 
                pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$" v-model="inputSignup.lastname"/>
              </div>
              <div class="form-group">
                <label for="firstname">Prénom :</label>
                <input type="text" id="firstname" name="firstname" class="form-control" required 
                pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$" v-model="inputSignup.firstname"/>
              </div>
              <div class="form-group">
                <label for="job">Fonction :</label>
                <input type="text" id="job" name="job" class="form-control" required
                pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$" v-model="inputSignup.jobtitle"/>
              </div> 
              <div class="form-group">
                <label for="email">E-mail :</label>
                <input type="email" id="email" name="email" class="form-control" required 
                pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}" v-model="inputSignup.email"/>
              </div>
              <div class="form-group">
                <label for="password">⚠️ Mot de passe :</label>
                <input type="password" id="password" name="password" class="form-control" required
                pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" v-model="inputSignup.password"/>
              </div>  
              <p>⚠️ Minimum 8 caractères dont 1 Majuscule, 1 minuscule et un chiffre</p>
              <button>Connect</button>                                       
            </form> 
             
              <nav class="navlogsign"><p>Vous avez déjà un compte ? <router-link to="/">Connectez-vous</router-link></p></nav> 
          </div> 
</template>


<script>
export default {
    name: 'Signup',
    data() {
        return {
            inputSignup: {
                lastname: "",
                firstname: "",
                job: "",
                email: "",
                password: ""
            }
        }
    },
    methods: {
        signup() {
            let inputDatas = {
                "lastname": this.inputSignup.lastname,
                "firstname": this.inputSignup.firstname,
                "job": this.inputSignup.job,
                "email": this.inputSignup.email,
                "password": this.inputSignup.password
            }
            console.log(inputDatas)
            let url = "http://localhost:3000/api/user/signup"
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
                    localStorage.setItem("userId", res.userId);
                    localStorage.setItem("token", res.token);
                    console.log(localStorage)
                    this.$router.push("/");
                    alert(" Bienvenue sur Groupomania! Connectez-vous dès à présent !");
                    /*} */
                })
                .catch(error => console.log(error))
        }
    }
}