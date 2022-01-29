<template>
    <main class="new-post">
        <Login v-if="!connected"/>
        
        <form  v-if="connected" class=" align-items-center form-block d-flex justify-content-center m-auto shadow rounded flex-wrap">

            <div class="block-demi-container p-3">
                <div class="form-group">
                    <label for="title">
                        Titre
                    </label>
                    <input onkeydown="return event.key != 'Enter';" type="title" id="title" name="title" class="form-control" autocomplete="on" maxlength="30" required v-model="input.title" />
                </div>

                <div class="form-group">
                    <label for="content">
                        Contenu
                    </label>
                    <textarea type="text" id="content" name="content" class="form-control" autocomplete="off" maxlength="200" required v-model="input.content" />
                </div>

                <div class="form-group">
                    <label tabindex="0" for="file" class="custom-file-upload">
                        Ajoutez une image
                    </label>
                    <input type="file"  id="file" ref="file" @change="onFileSelected" name="file" class="form-control" accept="image/jpg, image/jpeg, image/gif, image/png" autocomplete="off" />
                    
                   

                </div>
                <button type="button" @click="createPost()" class="btn btn-primary create-post">
                    Créer le post
                </button>
            </div>
            <div class="block-demi-container p-3 post" v-if="input.title || input.content || imageData">
                <div>
                    <h2 class="post-title"> {{ input.title }}</h2>
                    <div class="post-content"> {{ input.content }}</div>
                </div>
                <div class="image-preview container-img" v-if="imageData.length > 0" >
                        <img class="preview post-img" :src="imageData">
                </div>
            </div>
        </form>
    </main>
</template>


<script>
import Login from '@/components/Users/Login.vue'
import axios from "axios";
import router from '../../router';
var FormData = require('form-data');

export default {
    name: 'NewPost',
    components: {
        Login
    },
    data() {
        return {
            input: {
                id: this.$user.userId,
                title: "",
                content: "",
                author: this.$user.username,
                file: null
            },
            imageData:"",
            user: [],
            connected: ""
        };
    },
    created() {
        this.getUser();
        this.checkConnected();
    },

    
    methods: {
        checkConnected(){
          if(localStorage.user !== undefined){
            this.connected = true;
            console.log('Utilisateur connecté !');
          }
          else if(localStorage.user == undefined){
            this.connected = false;
            console.log('Utilisateur non connecté !');
          }
        },

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
        createPost() {
            var formData = new FormData();
            formData.append("id", this.$user.userId);
            formData.append("title", /*this.title.value);*/document.getElementById("title").value);
            formData.append("content", /*this.content.value);*/document.getElementById("content").value);
            formData.append("author", this.$user.username);
            formData.append("authorImg", this.user.imgProfil);
            formData.append("file", this.file);/*document.getElementById("file").value);*/

            if(confirm("Création du post en cours...")) {
                axios.post("http://localhost:3000/posts", formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${this.$token}`
                    }
                })
                    .then(() => {
                        //location.href = "/";
                        router.push("/");
                    })
                    .catch( () => (alert("Une erreur dans vos saisies")) );
            }
        },

        getUser() {
            axios.get(`http://localhost:3000/users/${this.$user.userId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                })
                .then(res => { this.user = res.data });
        },
    }
}
</script>
<style>
   @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';

img.preview {
    width: 20rem;
}
.main {
    margin: auto;
}
.new-post{
    margin: 0 auto;
    padding: 20px;
    max-width: 850px;
}
.custom-file-upload {
    border: 1.8px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    background-color: #f2efef;
}
.custom-file-upload:hover {
    background-color: #e4e3e3;
}
input[type="file"] {
    display: none;
}
.create-post {
    margin-right: 0;
}
#content {
    height: 5rem;
}

</style>
