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
  },
  onClick: {
    type: Function,
    default: () => {}
  }
});

const emit = defineEmits(['click', 'hover', 'change']);

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

//function handleClick() {
//  alert('You clicked me!');
//}

// Vue2
// export default {
//   name: 'Button',
//   props: {
//     title: {
//       type: String,
//       required: true
//     },
//     variant: {
//       type: String,
//       default: 'default',
//       validator: (val) => ['default', 'square', 'round'].includes(val)
//     }
//   },
//   methods() {
//     handleClick() {
//       alert('You clicked me!');
//     }
//   },
//   computed() {
//     style() {
//       const style = {};
//       switch (this.variant) {
//         case 'square':
//           style.borderRadius = '0';
//           break;
//         case 'round':
//           style.borderRadius = '50%';
//           break;
//         default:
//           style.borderRadius = '15px';
//           break;
//       }
//       return style;
//     },
//     titleDisplayed() {
//       if (this.variant === 'round') {
//         return this.title[0];
//       }
//       return this.title;
//     }
//   }
// };

function handleClick(event) {
  emit('change', Object.assign(event, { value: title }));
}
</script>

<template>
  <button
    v-bind:style="style"
    class="btn"
    v-on:click="$emit('click')"
    @mouseover="$emit('hover')"
    @click="handleClick"
  >
    {{ titleDisplayed.toUpperCase() }}
  </button>
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
