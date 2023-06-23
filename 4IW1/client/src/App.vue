<script setup>
import Button from './components/Button.vue';
import HelloWorld from './components/HelloWorld.vue';
import TheWelcome from './components/TheWelcome.vue';
import { ref, reactive } from 'vue';

const isYellow = ref(false);
const theme = reactive({
  main: {
    color: 'red',
    backgroundColor: 'blue'
  }
});

function handleClick1() {
  alert('You clicked me!');
}
function handleClick2() {
  theme.main.backgroundColor = theme.main.backgroundColor === 'blue' ? 'green' : 'blue';
}
function handleClick3() {
  isYellow.value = !isYellow.value;
}

// Vue2
// import HelloWorld from './components/HelloWorld.vue';
// import TheWelcome from './components/TheWelcome.vue';
// export default {
//   components: {
//     HelloWorld,
//     TheWelcome,
//   },
//   methods: {
//     handleClick1() {
//       alert('You clicked me!');
//     },
//     handleClick2() {
//       this.theme.main.backgroundColor = this.theme.main.backgroundColor === 'blue' ? 'green' : 'blue';
//     },
//     handleClick3() {
//       this.isYellow = !this.isYellow;
//     }
//   },
//   data() {
//      return {
//          isYellow: false,
//          theme: {
//              main: {
//                  color: 'red',
//                  backgroundColor: 'blue'
//              }
//          }
//      }
//   }
// };
const arrayButtons = [
  {
    title: 'Click 1',
    variant: 'default',
    onClick: handleClick1
  },
  {
    title: 'Toggle main theme',
    variant: 'round',
    onClick: handleClick2
  },
  {
    title: 'Toggle yellow',
    variant: 'square',
    onClick: handleClick3
  }
];
const objButtons = {
  button1: {
    title: 'Click 1',
    variant: 'default',
    onClick: handleClick1,
    disabled: true
  },
  button2: {
    title: 'Toggle main theme',
    variant: 'round',
    onClick: handleClick2
  },
  button3: {
    title: 'Toggle yellow',
    variant: 'square',
    onClick: handleClick3
  }
};

const addHello = ref(false);
const showHello = ref(false);
</script>

<template>
  <header :style="{ backgroundColor: isYellow ? 'yellow' : 'inherit' }">
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld v-if="addHello" msg="You did it!" />
      <HelloWorld v-show="showHello" msg="You did it2!" />
      <Button title="Click 1" :onClick="handleClick1" />
      <Button title="Toggle main theme" variant="round" :onClick="handleClick2" />
      <Button title="Toggle yellow" variant="square" :onClick="handleClick3" />
      <Button
        v-for="(item, index) in arrayButtons"
        :key="index"
        :title="item.title"
        :variant="item.variant"
        :onClick="item.onClick"
      />
      <template v-for="(item, property, index) in objButtons" :key="property">
        <Button
          :title="item.title + '' + property + ' ' + index"
          :variant="item.variant"
          :onClick="item.onClick"
          v-if="!item.disabled"
        />
      </template>
    </div>
  </header>

  <main :style="theme.main">
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
