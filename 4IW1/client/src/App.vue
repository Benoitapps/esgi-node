<script setup>
import Button from './components/Button.vue';
import HelloWorld from './components/HelloWorld.vue';
import TheWelcome from './components/TheWelcome.vue';

// Vue2
// import HelloWorld from './components/HelloWorld.vue';
// import TheWelcome from './components/TheWelcome.vue';
// export default {
//   components: {
//     HelloWorld,
//     TheWelcome,
//   },
// };
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <HelloWorld msg="You did it2!" />
      <Button title="Click 1" />
      <Button title="Click 2" variant="round" />
      <Button title="Click 3" variant="square" />
    </div>
  </header>

  <main>
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
