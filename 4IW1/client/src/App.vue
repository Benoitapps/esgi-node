<script setup>
import Button from './components/Button.vue';
import HelloWorld from './components/HelloWorld.vue';
import TheWelcome from './components/TheWelcome.vue';
import { ref, reactive, onMounted } from 'vue';
import UserForm from './components/UserForm.vue';
import LoginForm from './components/LoginForm.vue';
import UserList from './views/UserList.vue';
import Modal from './components/Modal.vue';
import ThemeProvider from './providers/ThemeProvider.vue';
import AuthProvider from './providers/AuthProvider.vue';
import Security from './views/Security.vue';
import SecuredZone from './views/SecuredZone.vue';

const isYellow = ref(false);

function handleClick1() {
  alert('You clicked me!');
}
function handleClick2(theme, setThemeValue) {
  setThemeValue('main.backgroundColor', theme.main.backgroundColor === 'blue' ? 'green' : 'blue');
}
function handleClick3() {
  isYellow.value = !isYellow.value;
}

// Vue2
// import HelloWorld from './components/HelloWorld.vue';
// import TheWelcome from './components/TheWelcome.vue';
// export default {
//   beforeCreate() {
//     console.log('beforeCreate');
//   },
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

function addUser(data) {
  let hasError = false;
  return fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((response) => {
      if (response.status === 422) {
        hasError = true;
      }
      return response.json();
    })
    .then((data) => {
      if (hasError) {
        return Promise.reject(data);
      } else {
        return Promise.resolve(data);
      }
    });
}

function handleHover() {
  console.log('hover');
}
function handleChange(e) {
  console.log('change', e);
}
</script>

<template>
  <ThemeProvider #default="{ theme, setThemeValue }">
    <AuthProvider #default="{ user }">
      <header :style="{ backgroundColor: isYellow ? 'yellow' : 'inherit' }">
        <img
          alt="Vue logo"
          class="logo"
          src="./assets/logo.svg"
          width="125"
          height="125"
          v-test:TREFDSB.click="'GDFSGDRS32534'"
        />
        <MyTest />

        <div class="wrapper">
          <HelloWorld v-if="addHello" msg="You did it!" />
          <HelloWorld v-show="showHello" msg="You did it2!" />
          <Button
            title="Open Modal"
            @click="handleClick1"
            @hover="handleHover"
            @change="handleChange"
          />
          <Button title="Toggle main theme" variant="round" @click="handleClick2(theme, setThemeValue)" />
          <Button title="Toggle yellow" variant="square" @click="handleClick3" />
          <Button
            v-for="(item, index) in arrayButtons"
            :key="index"
            :title="item.title"
            :variant="item.variant"
            @click="item.onClick"
          />
          <template v-for="(item, property, index) in objButtons" :key="property">
            <Button
              :title="item.title + '' + property + ' ' + index"
              :variant="item.variant"
              @click="item.onClick"
              v-if="!item.disabled"
            />
          </template>
          <Modal>
            <template #activator="{ openModal }">
              <Button title="Open Modal" @click="openModal" />
            </template>
            <template v-slot:actions="{ closeModal }">
              <Button title="Close From App" @click="closeModal" />
            </template>
            Content from App
            <template #close-icon="{ closeModal }">
              <Button title="X" @click="closeModal" />
            </template>
          </Modal>
          <Security v-if="user === null" />
          <SecuredZone v-else />
        </div>
      </header>

      <main :style="theme.main">
        <TheWelcome />
      </main>
    </AuthProvider>
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
