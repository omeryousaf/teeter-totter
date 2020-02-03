<template>
  <div id="app">
    <h1>Welcome to The Teeter Totter Game!</h1>
    <div class="text-center">
      <Game/>
    </div>
  </div>
</template>

<script>
import Game from './components/Game.vue'

export default {
  name: 'app',
  components: {
    Game
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.text-center {
  text-align: center;
}
</style>
