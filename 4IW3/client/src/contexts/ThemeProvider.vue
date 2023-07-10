<script setup>
import { provide, reactive } from 'vue';
import { themeKey, themeSetValueKey } from './themeKeys.js';

const theme = reactive({
  main: 'green',
  wrapper: {
    backgroundColor: 'red'
  },
  button: {
    variant: 'round',
    backgroundColor: 'magenta'
  }
});

function setValue(path, value) {
  const pathArray = path.split('.');
  let current = theme;
  for (let i = 0; i < pathArray.length - 1; i++) {
    current = current[pathArray[i]];
  }
  current[pathArray[pathArray.length - 1]] = value;
}

provide(themeKey, theme);
provide(themeSetValueKey, setValue);
</script>

<template>
  <slot :theme="theme" :setThemeValue="setValue"></slot>
</template>
