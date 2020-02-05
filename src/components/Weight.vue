<template>
	<div :class="[{right: 'right'}, shape]" :style="{ position: 'absolute', left: leftOffset + 'px', top: topOffset + 'px', width: shape !== 'triangle' ? width + 'px' : '0', height: shape !== 'triangle' ? height + 'px' : '0', 'background-color': shape !== 'triangle' ? color : '', 'border-left': shape == 'triangle' ? height/2 + 'px solid transparent' : '', 'border-right': shape == 'triangle' ? height/2 + 'px solid transparent' : '', 'border-bottom': shape == 'triangle' ? height + 'px solid ' + color : '', transform: 'rotate(' + scaleRotatedByDeg + 'deg)', 'transform-origin': (scaleCenter.x - leftOffset) + 'px ' + (scaleCenter.y - topOffset) + 'px' }">{{mass}}kg</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Weight',
  props: {
    id: Number,
    right: Boolean
  },
  data() {
    const shapeId = Math.round(Math.random() * 2);
    const shape = shapeId === 2 ? 'circle' : (shapeId === 1 ? 'rectangle' : 'triangle');
    const mass = Math.ceil(Math.random() * 10);
    return {
      mass: mass,
      shape: shape,
      color: 'blue',
      width: mass * 5,
      height: mass * 5,
      leftOffset: 0,
      topOffset: 0,
      torque: 0,
      hasHitTheScale: false
    }
  },
  computed: mapState(['timer', 'scaleCenter', 'isLeftKeyPressed', 'isRightKeyPressed', 'scaleRotatedByDeg', 'lastWeightColor']),
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
    this.color = this.lastWeightColor === 'blue' ? 'red' : 'blue';
    this.height = this.shape === 'triangle' ? this.height * 2 : this.height;
    this.$store.commit('setLastWeightColor', this.color);
    this.leftOffset = this.right ? this.scaleCenter.x + Math.round(Math.random() * 250) - this.width : this.scaleCenter.x - Math.round(Math.random() * 250);
  },
  methods: {
    fall() {
      if(this.scaleCenter.y - (this.topOffset + this.height) < 1) {
        this.computeTorque();
        return;
      }
      this.topOffset += 0.5;
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
		display: inline-block;
    position: absolute;
    color: white;
	}
	.circle {
		border-radius: 50%;
	}
</style>