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
                    <input type="username" id="dataUsername" name="username" class="form-control" autocomplete="on" required v-model="input.username" />
                </div>

                <div class="form-group">
                    <label for="password">
                        Mot de passe
                    </label>
                    <input type="password" id="password" name="password" class="form-control" autocomplete="off" required v-model="input.password" />
                </div>

                <div class="form-group">
                    <label for="file">
                        Image de profil
                    </label>
                    <input type="file"  id="file" ref="fileUpload" @change="onFileSelected" name="file" class="form-control" accept="image/jpg, image/jpeg, image/gif, image/png" autocomplete="off" />
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
                imgProfil: null,
            },
            imageData:"",
        }
    },

    
    methods: {
        onFileSelected: function(event) {
            this.file = event.target.files[0];
            // Preview de l'image
            var input = event.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.imageData = e.target.result;
                }
                reader.readAsDataURL(input.files[0]);
            }
        },

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