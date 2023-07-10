<script setup>
defineProps({
  user: Object
});
defineEmits(['delete', 'select']);
</script>

<template>
  <li @click="$emit('select', user)">
    {{ user.firstname }} {{ user.lastname }} <a @click.prevent="$emit('delete', user)">X</a>
  </li>
</template>
