<template>
        <main class="main main--connect">
        <form v-on:submit.prevent="create" class="w-75 align-items-center form-block d-flex m-auto shadow rounded">
            <div class="form-block d-flex flex-column justify-content-center block-demi-container p-3 text-right  align-self-stretch">
              <img class="logo align-self-end" src="../assets/icon.svg" alt="Logo Groupomania" />
            </div>

            <div class="block-demi-container p-3">
                <div class="form-group">
                    <label for="etitle">
                        Titre
                    </label>
                    <input type="title" id="title" name="title" class="form-control" autocomplete="on" required v-model="input.title" />
                </div>

                <div class="form-group">
                    <label for="author">
                        Auteur
                    </label>
                    <input type="author" id="author" name="author" class="form-control" autocomplete="off" required v-model="input.author" />
                </div>

                <div class="form-group">
                    <label for="content">
                        Contenu
                    </label>
                    <input type="content" id="content" name="content" class="form-control" autocomplete="off" required v-model="input.content" />
                </div>
                <button type="submit" class="btn btn-primary">
                    Créer le post
                </button>
            </div>
        </form>
    </main>
</template>


<script>
import axios from "axios";

export default {
    name: 'NewPost',
    data() {
        return {
            input: {
                title: "",
                content: "",
                author: ""
            }
        }
    },
    methods: {
        NewPost() {
             axios.post("http://localhost:3000/posts/posts", this.input)
                .then(() => { alert("Post créé"); })
                .catch( () => (alert("Une erreur dans vos saisies")) );
        }
    }
}
</script>
<style>
   @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';
</style>
