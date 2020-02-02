<template>
  <div class="game-height game-width d-inline-block">
    <div class="space-above-scale"></div>
    <div class="text-center">
      <Scale/>    
    </div>
    <button @click="end">end</button>
  </div>
</template>

<script>
import Scale from './Scale.vue'

export default {
  name: 'Game',
  props: {
    msg: String
  },
  components: {
    Scale
  },
  data() {
    return {
      timer: '',
      ticks: 0,
      isEnded: false
    }
  },
  mounted () {
    this.startGame();
  },
  methods: {
    startGame() {
      const self = this;
      this.timer = setInterval(function() {
        console.log(`ticks count: ${self.ticks}`);
        self.$store.commit('incrementTimer');
        self.endGame();
      }, 1000);
    },
    endGame() {
      if (this.isEnded) {
        clearInterval(this.timer);
      }
    },
    end() {
      this.isEnded = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.space-above-scale {
  height: 300px;
}
.game-height {
  height: 500px;
  background-color: lightgrey;
}
.game-width {
  width: 500px;
}
.d-inline-block {
  display: inline-block;
}
</style>
