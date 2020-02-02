<template>
	<div :class="{right: 'right'}"></div>
</template>

<script>
export default {
  name: 'Weight',
  props: {
    right: String
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
		right: 29%;
    bottom: 6%;
    position: absolute;
	}
</style>