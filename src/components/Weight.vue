<template>
	<div :class="{right: 'right'}" :style="{ position: 'absolute', left: leftOffset + 'px', top: topOffset + 'px' }">{{mass}},{{torque}}</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Weight',
  props: {
    id: Number,
    right: Boolean,
    shape: String
  },
  data() {
    return {
      mass: Math.ceil(Math.random() * 10),
      leftOffset: 0,
      topOffset: 0,
      torque: 0,
      hasHitTheScale: false
    }
  },
  computed: mapState(['timer', 'scaleCenter', 'isLeftKeyPressed', 'isRightKeyPressed']),
  watch: {
    timer: function() {
      this.fall();
    },
    isLeftKeyPressed: function() {
      if(!this.right) {
        if(this.leftOffset > this.scaleCenter.x - 250) {
          this.leftOffset -= 5;
        }
      }
    },
    isRightKeyPressed: function() {
      if(!this.right) {
        if(this.leftOffset < this.scaleCenter.x) {
          this.leftOffset += 5;
        }
      }
    }
  },
  created() {
    this.leftOffset = this.right ? this.scaleCenter.x + Math.round(Math.random() * 250) : this.scaleCenter.x - Math.round(Math.random() * 250);
  },
  methods: {
    fall() {
      if(this.scaleCenter.y - this.topOffset < 5) {
        this.computeTorque();
        return;
      }
      this.topOffset += 1;
    },
    computeTorque() {
      const distanceFromPivotX = Math.abs(this.leftOffset - this.scaleCenter.x)/50;
      this.torque = Math.round(this.mass * distanceFromPivotX);
      if(this.right) {
        if(this.hasHitTheScale) {
          return;
        }
        this.$store.commit('setTorqueRight', this.torque);
        this.hasHitTheScale = true;
      } else {
        this.$store.commit('setTorqueLeft', this.torque);
        this.hasHitTheScale = true;
      }
    }
  }
}
</script>

<style scoped>
	.right {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		display: inline-block;
		background-color: red;
    position: absolute;
	}
</style>