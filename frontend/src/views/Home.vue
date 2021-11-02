<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logos/icon-above-font.png">
    <HelloWorld msg="Bienvenue sur Groupomania"/>
  </div>
</template>

<script>
import signup from '@/components/signup.vue'
import login from '@/components/login.vue'
export default {
  name: 'Home',
  components: {
    signupModal,
    loginModal
  },
  props: ['userData'],
  beforeCreate() {
    if(this.userData)return this.$router.push('/about')
  },
  data() {
    return {
      authType: 1, // Login (default)
      aliasLogin: ''
    }
  },
  methods: {
    sessionAlias(email) {
      this.authType = 1;
      this.aliasLogin = email
    }
  }
}
</script>
