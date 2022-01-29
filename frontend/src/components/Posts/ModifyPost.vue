<template>
        <main class="main main--connect">
        <form  v-on:submit.prevent="modifyPost" class="w-50 align-items-center justify-content-center form-block d-flex m-auto shadow rounded">
            

            <div class="block-demi-container p-3">
                <div class="form-group">
                    <label for="etitle">
                        Titre
                    </label>
                    <input type="title" id="title" name="title" class="form-control" autocomplete="on" maxlength="30" required v-model="input.title" />
                </div>

                <div class="form-group">
                    <label for="content">
                        Contenu
                    </label>
                    <textarea type="text" id="content" name="content" class="form-control" autocomplete="off" maxlength="200" required v-model="input.content" />
                </div>

                <div class="form-group">
                        <label tabindex="0" for="file" class="custom-file-upload">
                            Image
                        </label>
                        <input type="file"  id="file" ref="fileUpload" @change="onFileSelected" name="file" class="form-control" accept="image/jpg, image/jpeg, image/gif, image/png" autocomplete="off" />  

                    <div class="image-preview " v-if="imageData != undefined" >
                        <img class="preview post-img" :src="imageData"/>
                    </div>

                </div>
                <button  class="btn btn-primary bouton-marge">
                    Modifier le post
                </button>
               
            </div>
        </form>
    </main>
</template>


<script>
import axios from "axios";
//import router from '../../router';

export default {
    name: 'Modify',
    data() {
        return {
            input:{
                title: JSON.parse(localStorage.postTitle),
                content: JSON.parse(localStorage.postContent),
                file: JSON.parse(localStorage.postImg),
            },
            imageData: JSON.parse(localStorage.postImg),
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
        
        modifyPost() {
            var formData = new FormData();
            //var file = document.getElementById("file").value;
            formData.append("title", /*this.title.value);*/document.getElementById("title").value);
            formData.append("content", /*this.content.value);*/document.getElementById("content").value);
            if(localStorage.postImg != null ) {
                formData.append("file", this.file);
            }
            

            const postId = JSON.parse(localStorage.postId);
            if(confirm("Modification en cours...")) {
                axios.put(`http://localhost:3000/posts/${postId}`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${this.$token}`
                    }
                })
                    .then(() => {
                        localStorage.removeItem("postId");
                        localStorage.removeItem("postTitle");
                        localStorage.removeItem("postContent");
                        localStorage.removeItem("postImg");
                        location.href = "/profile";
                    })
                    .catch( () => (alert("Une erreur dans vos saisies")) );
            }
        },
    }
}
</script>
<style>
   @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';

    button {
      margin-right: 2rem;
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
    .bouton-marge {
        margin-right: 0 !important;
    }
</style>