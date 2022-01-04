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
                    <input type="file" id="imgUrl" name="imgUrl" class="form-control" autocomplete="off" />
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
import router from '../../router';

export default {
    name: 'Modify',
    data() {
        return {
            input: {
                title: "",
                content: "",
                imgUrl: null
            }
        }
    },

    
    methods: {
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
                    router.push("/");
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