<template>
  <div class="game-height game-width d-inline-block">
    <div class="space-above-scale"></div>
    <Weight v-for="weight in weights" :key="weight.id" :id="weight.id" :right="weight.right"/>
    <Scale/>
    <button style="position: absolute; left: 50px; top: 50px" @click="togglePause">{{pauseOrResume}}</button>
    <h3 v-if="gameOver" style="color: yellow">Game Over</h3>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Scale from './Scale.vue'
import Weight from './Weight.vue'

export default {
  name: 'Game',
  props: {
    msg: String
  },
  components: {
    Scale,
    Weight
  },
  data() {
    return {
      timerHandle: '',
      ticks: 0,
      isPaused: false,
      weights: [],
      pauseOrResume: 'Pause',
      gameOver: false
    }
  },
  computed: mapState(['timer', 'scaleRotatedByDeg']),
  watch: {
    timer: function() {
      this.endGame();
    }
  },
  created() {
    window.addEventListener('keyup', this.onLeftOrRightKeyPress);
  },
  mounted () {
    this.startGame();
  },
  beforeDestroy: function () {
    window.removeEventListener('keyup', this.onLeftOrRightKeyPress);
  },
  methods: {
    onLeftOrRightKeyPress(event) {
      console.log(`event.keyCode: ${event.keyCode}`);
      if(event.keyCode === 37) {
        this.$store.commit('toggleLeftKeyPressed');
      }
      if(event.keyCode === 39) {
        this.$store.commit('toggleRightKeyPressed');
      }
    },
    startGame() {
      this.weights.push({
        id: this.weights.length + 1,
        shape: 'circle',
        right: true
      });
      this.weights.push({
        id: this.weights.length + 1,
        shape: 'circle',
        right: false
      });
      const self = this;
      this.timerHandle = setInterval(function() {
        console.log(`ticks count: ${self.ticks}`);
        self.$store.commit('incrementTimer');
      }, 10);
    },
    endGame() {
      if (this.isPaused) {
        console.log(`scaleRotatedByDeg: ${this.scaleRotatedByDeg}`);
        clearInterval(this.timerHandle);
      } else {
        // this.startGame();
        if (this.scaleRotatedByDeg > 30 || this.scaleRotatedByDeg < -30) {
          this.gameOver = true;
          // clearInterval(this.timerHandle);
        }
      }
    },
    togglePause() {
      this.isPaused = !this.isPaused;
      this.pauseOrResume = !this.isPaused ? 'Pause' : 'Resume';
      if(!this.isPaused) {
        this.startGame();
      }
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
