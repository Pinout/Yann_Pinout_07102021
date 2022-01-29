<template>
    <div>
        <article id="profil" class="profil">
            <div class="addImg">
                    
                    <label  tabindex="0" @keypress="displayUpload" v-if="!user.imgProfil" for="file" class="rounded-circle fichier">
                        Ajoutez une photo
                    </label>
                    <label  tabindex="0" @keypress="displayUpload" v-if="user.imgProfil && !imageData" for="file" class="rounded-circle">
                        <img  :src="user.imgProfil" class="rounded-circle img-profil" alt="image de profil"/>
                    </label>
                     
                    <input type="file" id="file" ref="file"  @change="onFileSelected" name="file" class="form-control" accept="image/jpg, image/jpeg, image/png" autocomplete="off" />

                    <input type="file" id="fileAccess" ref="file"   @change="onFileSelected" name="file"  accept="image/jpg, image/jpeg, image/png" autocomplete="off" />
                 

                <div class="image-preview" v-if="imageData.length > 0" >
                    <img class="preview" :src="imageData"/>
                </div>
                <button v-if="imageData" type="submit" @click="addImg()" class="btn btn-primary create-post"> 
                    Télécharger
                </button>

            </div>

         
          <span>
            <h4> nom d'utilisateur : {{this.$user.username}}    </h4> 
          </span>
          <span>
            <h4> email : {{this.$user.email}}   </h4>   
          </span>
          
            <router-link class="link profil-footer" to="/modifyUser"> Modifier profil </router-link> 
           
        </article>
        
        <br>  
        
<br><br><br>
        <h2> Vos posts : </h2>

        <div class="posts" v-for="post in posts" :key="post.authorId">
            <article class="post" v-if="post.authorId==$user.userId">
                <div class="post-header">
                    <img v-if="post.authorImg" :src="post.authorImg" class="rounded-circle img-profil-post" alt="image de profil"/>
                  <span class="post-info"> {{post.author}} <br> {{convertDate(post.updatedAt)}} </span>
                  <div class="post-modif-suppr">
                    <a tabindex="0" type="submit" @keypress="modifyPost(post)" @click="modifyPost(post)" class="post-modify" 
                        v-if="post.authorId == $user.userId || $user.isAdmin == 1">
                        &#9881; 
                    </a>
                    <a tabindex="0" class="post-modify" @keypress="deletePost(post)" @click="deletePost(post)"> &#128465; </a>
                  </div>
                </div> 
                <h2 class="post-title">    {{post.title}}     </h2>
                <div class="post-content"> {{ post.content }} </div>
                <div class="container-img">
                    <img class="post-img" v-if="post.imgUrl" :src="post.imgUrl" alt="image d'un post"/>  
                </div>
            </article>
          </div>

        <button tabindex="0" class="btn btn-danger bouton-suppr" @click="deleteUser()"> Supprimer le compte </button>

    </div>
</template>

<script>
import axios from 'axios';
import router from '../../router';
import Vue from 'vue'
import moment from 'moment'


export default {
  name: 'UserProfile',

data() {
    return {
        posts: [],
        user: [],
        file: "",
        imageData: "",
    };
  },

  mounted(){
    this.getAllPosts();
    this.getUser();
    Vue.prototype.$token = JSON.parse(localStorage.user).token;
    Vue.prototype.$user = JSON.parse(localStorage.user);
    },

  methods: {
    convertDate(date){
        if (date) {
            return moment(String(date)).format('DD/MM/YYYY à h:mm:ss')
        }
    },

    displayUpload() {
        document.getElementById("fileAccess").style.display = "block" ;
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

    addImg() {
        var formData = new FormData();

        formData.append("file", this.file);

            axios.put(`http://localhost:3000/users/img/${this.$user.userId}`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${this.$token}`
                }
            })
                .then(() => {
                    //alert("Image enregistrée"); 
                    location.reload();
                })
                .catch( () => (alert("Une erreur")) );
    },
            

    getAllPosts() {
      axios.get("http://localhost:3000/posts",
        {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.$token}`
            }
        })
      .then(res => { this.posts = res.data; })
    },

    deleteUser() {
        if (confirm("Supprimer votre compte ?")) {
            axios.delete(`http://localhost:3000/users/${this.$user.userId}`,
            {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${this.$token}`
                }
            }
            )
            .then(localStorage.removeItem('user'))
            .then(router.push("/"));
        }
    },

    modifyPost(post) {
        localStorage.setItem("postId", JSON.stringify(post.id));
        localStorage.setItem("postTitle", JSON.stringify(post.title));
        localStorage.setItem("postContent", JSON.stringify(post.content));
        localStorage.setItem("postImg", JSON.stringify(post.imgUrl));

        router.push("/modifyPost");
    },

    deletePost(post) {
        if (confirm("Voulez-vous supprimer ce post ?")) {
            axios.delete(`http://localhost:3000/posts/${post.id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                })
                .then(() => { 
                    location.reload();
                })
                .catch( () => (alert("Une erreur dans la suppression du post")) ); 
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
    }
  }
}
</script>

<style scoped>
    @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';
    label {
        background-color: #e4e1e1;
        border-radius: 50%;
        width: 150px;
        height: 150px;
        padding: 3rem 1rem 1rem 1rem;
        cursor: pointer;
        text-align: center;
    }
    label:hover {
        background-color: #9dc7e8;
    }
    button {
      margin-bottom: 1rem;
      margin-top: 1rem;
    }
    h3 { margin: 0.5rem; }

    .fichier:hover {
        background-color: #ff6848;
    }
    .preview {
        border-radius: 50%;
        width: 200px;
        height: 200px;
    }
    #file {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
    #fileAccess { display: none; }
    .file-upload {
        border: 1.8px solid #ccc;
        display: inline-block;
        padding: 20px 12px;
        cursor: pointer;
        background-color: #f2efef;
        text-align: center;
    }
    .addImg {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    .img-profil {
        width: 10rem;
        height: 10rem;
        margin-top: -3rem;
        margin-left: -1.3rem;
    }
    .img-profil:hover {
        filter: blur(0.8px);
    }
    .link {
        color: black;
        margin-right: 1rem;
        text-decoration: none;
    }
        .link:hover {
            color: #fd2d01;
        }

    .profil {
        position: relative;
        padding: 20px 20px 20px 30px;
        margin-bottom: 30px;
        /*border-left: 5px solid #0069d9;*/
        box-shadow: 0px 0px 50px -7px rgba(0,0,0,0.1);
        text-align: left;
        transition-duration: .1s;
        margin: 1rem;
        padding: 20px;
    }
    .profil-footer {
        display: flex;
        justify-content: flex-end;
        color: rgb(0, 0, 0);
    }
/* Posts */
   
    .post h2{
        margin-top: 7px;
    }
    .post-header{
        display: flex;
        justify-content: space-between;
        color: rgb(0, 0, 0);
        font-size: .8rem;
    }
    .post-modify{
        font-size: 2rem;
        margin-left: 1rem;
    }
        
    .post-title{
        color: black;
    }
    .post-content{
        font-size: .9rem;
    }
    .post-img{
      max-width: 100%;
      height: auto;
    }
    .bouton-suppr {
        margin: 3rem 0 1rem 0;
    }

</style>