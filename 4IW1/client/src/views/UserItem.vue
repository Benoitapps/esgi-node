<template>
  <li @click.self="$emit('select', user)">
    {{ user.lastname }} {{ user.firstname }} {{ user.email }}
    <span @click.self="$emit('delete', user)">X</span>
  </li>
</template>

<script setup>
defineProps({
  user: Object
});
defineEmits(['select', 'delete']);
</script>
