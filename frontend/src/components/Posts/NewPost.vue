<template>
        <main class="new-post">
        <form  class="w-75 align-items-center form-block d-flex m-auto shadow rounded">
            <div class="form-block--left d-flex flex-column justify-content-center block-demi-container p-3 text-right align-self-stretch">
              <img class="logo align-self-end" src="../../assets/icon.svg" alt="Logo Groupomania" />
              <p>
                  <small>
                    Bienvenue !
                    Créez une publication
                  </small>
                </p>
            </div>

            <div class="block-demi-container p-3">
                <div class="form-group">
                    <label for="title">
                        Titre
                    </label>
                    <input type="title" id="title" name="title" class="form-control" autocomplete="on" maxlength="12" required v-model="input.title" />
                </div>

                <div class="form-group">
                    <label for="content">
                        Contenu
                    </label>
                    <input type="content" id="content" name="content" class="form-control" autocomplete="off" maxlength="100" required v-model="input.content" />
                </div>

                <div class="form-group">
                    <label for="file" class="custom-file-upload">
                        Ajoutez une image
                    </label>
                    <input type="file"  id="file" ref="file" @change="onFileSelected" name="file" class="form-control" accept="image/jpg, image/jpeg, image/gif, image/png" autocomplete="off" />
                    
                    <div class="image-preview" v-if="imageData.length > 0" >
                        <img class="preview" :src="imageData">
                    </div>

                </div>
                <button type="submit" @click=" createPost()" class="btn btn-primary create-post">
                    Créer le post
                </button>
            </div>
        </form>
    </main>
</template>


<script>
import axios from "axios";
//import router from '../../router';
var FormData = require('form-data');

export default {
    name: 'NewPost',
    data() {
        return {
            input: {
                id: this.$user.userId,
                title: "",
                content: "",
                author: this.$user.username,
                file: null//document.getElementById("file").value,
            },
            imageData:"",
        };
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
        createPost() {
            //FormData = require('form-data');
            var formData = new FormData();
            formData.append("id", this.$user.userId);
            formData.append("title", /*this.title.value);*/document.getElementById("title").value);
            formData.append("content", /*this.content.value);*/document.getElementById("content").value);
            formData.append("author", this.$user.username);
            formData.append("file", this.file);/*document.getElementById("file").value);*/

                /*id: this.$user.userId,
                title: document.getElementById('title').value,
                content: document.getElementById('content').value,
                author: this.$user.username,
                file: document.getElementById('file').value
            }*/
            axios.post("http://localhost:3000/posts", formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${this.$token}`
                }
            })
                .then(() => {
                    alert("Post créé"); 
                    location.reload();
                })
                .catch( () => (alert("Une erreur dans vos saisies")) );
        }
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
</style>
