<script setup>
// Vue3 Composition API
import { reactive, ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import MyButton from './components/MyButton.vue';
import TheWelcome from './components/TheWelcome.vue';
import UserForm from './components/UserForm.vue';
import UserList from './views/UserList.vue';
import Modal from './components/Modal.vue';
import ThemeProvider from './contexts/ThemeProvider.vue';
import UserManager from './contexts/UserManager.vue';

// Vue2 ou Vue3 Options API
//export default {
//  components: {
//    HelloWorld,
//    TheWelcome
//  }
//}
const buttons = [
  { title: 'Click me 1', onClick: () => console.log('Click me 1') },
  { title: 'Click me 2', onClick: () => alert('coucou'), variant: 'round' },
  { title: 'Click me 3', onClick: () => confirm('?'), variant: 'square', disabled: true },
  { title: 'Click me 4', onClick: () => prompt('!') }
];
const objButtons = {
  button1: {
    title: 'test'
  },
  button2: {
    title: 'Toggle wrapper',
    variant: 'round',
    onClick: () =>
      (theme.wrapper.backgroundColor = theme.wrapper.backgroundColor === 'blue' ? 'green' : 'blue')
  },
  button3: {
    title: 'Toggle Main',
    variant: 'square',
    onClick: () => (theme.main === 'red' ? 'cyan' : 'red')
  },
  button4: {
    title: 'Toggle Yellow',
    onClick: () => {
      isYellow.value = !isYellow.value;
    }
  }
};
const showHelloWorld = false;
const deleteHelloWorld = true;

const test = '<h1>Test</h1>';
const isYellow = ref(true);
console.log(isYellow);
</script>

<template>
  <ThemeProvider #default="{ theme, setThemeValue }">
    <UserManager>
      <header :style="{ backgroundColor: isYellow ? 'yellow' : 'inherit' }">
        <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

        <div class="wrapper" :style="{ backgroundColor: theme.wrapper.backgroundColor }">
          <HelloWorld msg="You did it!" v-if="!deleteHelloWorld" v-show="showHelloWorld" />
          <MyButton
            title="toggle theme main value"
            :onClick="
              () =>
                theme.main === 'red' ? setThemeValue('main', 'cyan') : setThemeValue('main', 'red')
            "
          />
          <MyButton
            title="toggle theme wrapper background value"
            :onClick="
              () =>
                theme.wrapper.backgroundColor === 'magenta'
                  ? setThemeValue('wrapper.backgroundColor', 'green')
                  : setThemeValue('wrapper.backgroundColor', 'magenta')
            "
          />
          <template v-for="(item, index) in buttons" v-bind:key="index">
            <MyButton
              v-bind:title="item.title + ' ' + index"
              v-bind:variant="item.variant"
              v-bind:onClick="item.onClick"
              v-if="!item.disabled"
            />
          </template>
          <p v-html="test" />
          <br />
          <MyButton
            v-for="(item, key, index) in objButtons"
            v-bind:key="index"
            v-bind:title="item.title + ' ' + key + ' ' + index"
            v-bind:variant="item.variant"
            v-bind:onClick="item.onClick"
          />
        </div>
        <Modal>
          <template #activator="{ openModal }">
            <MyButton title="Open modal" :onClick="openModal" />
          </template>
          <template #actions="{ closeModal }"
            ><MyButton title="close" :onClick="closeModal" />
          </template>
          <template v-slot:title>Ma msuper modal</template>
          <h2>Test</h2>
        </Modal>
        <UserList />
      </header>

      <main :style="{ backgroundColor: theme.main }">
        <TheWelcome />
        <UserForm />
      </main>
    </UserManager>
  </ThemeProvider>
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
    flex-direction: column;
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
