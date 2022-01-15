<template>
        <main class="main main--connect">
        <form  class="w-75 align-items-center form-block d-flex m-auto shadow rounded">
            <div class="form-block--left d-flex flex-column justify-content-center block-demi-container p-3 text-right align-self-stretch">
              <img class="logo align-self-end" src="../../assets/icon.svg" alt="Logo Groupomania" />
            </div>

            <div class="block-demi-container p-3">
                <div class="form-group">
                    <label for="etitle">
                        Titre
                    </label>
                    <input type="title" id="title" name="title" class="form-control" autocomplete="on" required v-model="input.title" />
                </div>

                <div class="form-group">
                    <label for="content">
                        Contenu
                    </label>
                    <input type="content" id="content" name="content" class="form-control" autocomplete="off" required v-model="input.content" />
                </div>

                <div class="form-group">
                    <label for="file">
                        Image
                    </label>
                    <input type="file"  id="file" ref="fileUpload" @change="onFileSelected" name="file" class="form-control" accept="image/jpg, image/jpeg, image/gif, image/png" autocomplete="off" />
                </div>
                <button type="submit" @click="modifyPost()" class="btn btn-primary">
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
            input: {
                title: JSON.parse(localStorage.postTitle),
                content: JSON.parse(localStorage.postContent),
                imgUrl: JSON.parse(localStorage.postImg),
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
        
        modifyPost() {
            const postId = JSON.parse(localStorage.postId);
            axios.put(`http://localhost:3000/posts/${postId}`, this.input,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.$token}`
                }
            })
                .then(() => {
                    alert("Post modifié");
                    localStorage.removeItem("postId");
                    localStorage.removeItem("postTitle");
                    localStorage.removeItem("postContent");
                    localStorage.removeItem("postImg");
                    //router.push("/");
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