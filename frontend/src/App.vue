<script>
import HomeLink from './components/HomeLink.vue'

export default {
  name: 'App',
  components: {
    HomeLink
  }
}
</script>

<template>
  <div id="app">
    <nav>
      <HomeLink />
      <a href="/about">À propos</a>
      <a href="/contact">Contact</a>
    </nav>
    <p> Bienvenue </p>
  </div>
</template>
