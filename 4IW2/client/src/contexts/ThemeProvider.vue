<script setup>
import { provide, reactive } from 'vue';

const theme = reactive({
  main: {
    backgroundColor: 'red',
    color: 'white'
  },
  button: {
    backgroundColor: 'cyan',
    color: 'white'
  }
});

provide('theme', theme);
provide('setThemeValue', (path, value) => {
  const paths = path.split('.');
  let current = theme;
  for (let i = 0; i < paths.length - 1; i++) {
    current = current[paths[i]];
  }
  current[paths[paths.length - 1]] = value;
});
provide('getThemeValue', (path) => {
  const paths = path.split('.');
  let current = theme;
  for (let i = 0; i < paths.length - 1; i++) {
    current = current[paths[i]];
  }
  return current[paths[paths.length - 1]];
});
</script>

<template>
  <slot :theme="theme"></slot>
</template>
