<template>
  <div>
    <div class="game-height game-width d-inline-block">
      <div class="space-above-scale"></div>
      <Weight v-for="weight in weights" :key="weight.id" :id="weight.id" :right="weight.right"/>
      <Scale/>
      <div v-if="gameOver" style="color: orange; margin-top: 80px;">
        <h3>Game Over</h3>
        <div>Refresh page to Play again</div>
      </div>
    </div>
    <div>
      <button style="background-color: teal; color: white; font-size: 2em; border-radius: 3px;" @click="togglePause">{{pauseOrResume}}</button>
    </div>
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
  computed: mapState(['timer', 'scaleRotatedByDeg', 'scaleCenter']),
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
    startTimer() {
      const self = this;
      this.timerHandle = setInterval(function() {
        self.$store.commit('incrementTimer');
      }, 10);
    },
    startGame() {
      this.weights.push({
        id: this.weights.length + 1,
        right: true
      });
      this.weights.push({
        id: this.weights.length + 1,
        right: false
      });
      this.startTimer();
    },
    resumePlay() {
      this.startTimer();
    },
    endGame() {
      if (this.isPaused) {
        clearInterval(this.timerHandle);
      } else {
        if (this.scaleRotatedByDeg > 30 || this.scaleRotatedByDeg < -30) {
          this.gameOver = true;
          clearInterval(this.timerHandle);
          this.weights = [];
        }
      }
    },
    togglePause() {
      this.isPaused = !this.isPaused;
      this.pauseOrResume = !this.isPaused ? 'Pause' : 'Resume';
      if(!this.isPaused) {
        this.resumePlay();
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
