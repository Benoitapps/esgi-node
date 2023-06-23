<script setup>
import { reactive } from 'vue';

const defaultValue = {
  lastname: '',
  firstname: '',
  email: '',
  password: ''
};
const formData = reactive(defaultValue);

function handleSubmit(event) {
  console.log(formData);
  Object.assign(formData, defaultValue);
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <label for="lastname">Lastname</label>
    <input
      :value="formData.lastname"
      @input="formData.lastname = $event.target.value"
      type="text"
      id="lastname"
    />
    <label for="firstname">Firstname</label>
    <input v-model.lazy="formData.firstname" type="text" id="firstname" />
    <label for="email">Email</label>
    <input v-model.trim="formData.email" type="email" id="email" />
    <label for="password">Password</label>
    <input v-model.number="formData.password" type="password" id="password" />
    <button type="submit">Submit</button>
  </form>
  {{ formData }}
</template>
