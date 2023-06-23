<script setup>
const { title, variant } = defineProps({
  title: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    default: 'default',
    validator: (val) => ['default', 'square', 'round'].includes(val)
  }
});

const style = {};
let titleDisplayed = title;

switch (variant) {
  case 'square':
    style.borderRadius = '0';
    break;
  case 'round':
    style.borderRadius = '50%';
    titleDisplayed = title[0];
    break;
  default:
    style.borderRadius = '15px';
    break;
}
</script>

<template>
  <button v-bind:style="style" class="btn">{{ titleDisplayed.toUpperCase() }}</button>
</template>

<style scoped>
.btn {
  background-color: #4caf50;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
}
</style>
