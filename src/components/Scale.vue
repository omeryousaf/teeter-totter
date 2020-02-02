<template>
	<div>
    <span :style="{ position: 'absolute', left: centerX + 'px', top: centerY + 'px', 'background-color': 'blue', width: '20px', height: '30px'}"></span>
		<div class="bar" :style="{ transform: 'rotate(' + scaleRotatedByDeg + 'deg)'}" ref="scaleElem" :class="{ 'trans-to-balance': scaleRotatedByDeg == 0 }"></div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Scale',
  data() {
    return {
      rotation: 0,
      centerX: 0,
      centerY: 0
    };
  },
  computed: mapState(['timer', 'scaleRotatedByDeg', 'torqueOnLeft', 'torqueOnRight']),
  watch: {
    timer: function() {
      this.updateBalance();
    }
  },
  mounted() {
    this.$store.commit('setScaleCenter', {
      x: this.$refs.scaleElem.getBoundingClientRect().left + this.$refs.scaleElem.offsetWidth/2,
      y: this.$refs.scaleElem.getBoundingClientRect().top
    });
    this.centerX = this.$refs.scaleElem.getBoundingClientRect().left + this.$refs.scaleElem.offsetWidth/2;
    this.centerY = this.$refs.scaleElem.getBoundingClientRect().top
  },
  methods: {
    updateBalance() {
      if (this.torqueOnLeft > this.torqueOnRight) {
        this.$store.commit('decrementRotation');
      } else if(this.torqueOnLeft < this.torqueOnRight) {
        this.$store.commit('incrementRotation');
      } else {
        this.$store.commit('setZeroRotation');
      }
    }
	}
}
</script>

<style scoped>
  div.trans-to-balance {
    transition: transform 2s ease-in-out;
  }
  div.bar {
    width: 500px;
    height: 10px;
    display: inline-block;
    background-color: green;
  }
</style>