<template>
  <slot :theme="theme" :setThemeValue="setThemeValue"></slot>
</template>

<script setup>
import { provide, reactive } from 'vue';

const theme = reactive({
  main: {
    color: 'red',
    backgroundColor: 'blue'
  },
  button: {
    backgroundColor: 'red',
    color: 'white'
  }
});

function setThemeValue(path, value) {
  const pathArray = path.split('.');
  let current = theme;
  for (let i = 0; i < pathArray.length - 1; i++) {
    current = current[pathArray[i]];
  }
  current[pathArray[pathArray.length - 1]] = value;
}

function getThemeValue(path) {
  const pathArray = path.split('.');
  let current = theme;
  for (let i = 0; i < pathArray.length - 1; i++) {
    current = current[pathArray[i]];
  }
  return current[pathArray[pathArray.length - 1]];
}

provide('theme', theme);
provide('setThemeValue', setThemeValue);
provide('getThemeValue', getThemeValue);

</script>
