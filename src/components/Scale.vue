<template>
	<div>
		<Weight right="true"/>
		<div class="bar" @click="rotateByXDeg" :style="{ transform: 'rotate(' + rotation + 'deg)'}"></div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import Weight from './Weight.vue';

export default {
  name: 'Scale',
  props: {
    msg: String
  },
  components: {
    Weight
  },
  data() {
    return {
      rotation: 0
    };
  },
  computed: mapState(['timer']),
  watch: {
    timer: function() {
      this.updateBalance();
    }
  },
  methods: {
    rotateByXDeg() {
      this.rotation++;
    },
    updateBalance() {
      this.rotateByXDeg();
    }
	}
}
</script>

<style scoped>
	div.bar {
		width: 500px;
		height: 10px;
		display: inline-block;
		background-color: green;
	}
</style>