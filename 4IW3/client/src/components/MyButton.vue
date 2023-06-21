<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => {
      return ['default', 'square', 'round'].includes(value)
    }
  },
  onClick: {
    type: Function,
    default: () => {}
  }
})

const style = {}
let realTitle = props.title
switch (props.variant) {
  case 'square':
    style.borderRadius = '0px'
    break
  case 'round':
    style.borderRadius = '50%'
    realTitle = realTitle[0].toUpperCase()
    break
}
</script>

<template>
  <button v-on:click="onClick" v-bind:style="style" class="btn" type="button">
    {{ realTitle }}
  </button>
</template>

<style scoped>
.btn {
  padding: 0.5rem 1rem;
  border: 1px solid black;
  border-radius: 10px;
  background-color: blue;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
</style>
