<script setup>
import { reactive, ref } from 'vue';

const props = defineProps({
  onSubmit: Function
});

const formData = reactive({
  lastname: '',
  firstname: '',
  email: '',
  password: ''
});
const errors = ref({});

const isSubmitting = ref(false);

function handleSubmit() {
  isSubmitting.value = true;
  props
    .onSubmit(formData)
    .catch((_errors) => {
      errors.value = _errors;
    })
    .finally(() => {
      isSubmitting.value = false;
    });
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input
      :value="formData.lastname"
      @input="formData.lastname = $event.target.value"
      type="text"
      id="lastname"
      name="lastname"
      placeholder="lastname"
    />
    <p v-if="errors.lastname">{{ errors.lastname }}</p>
    <input
      :value="formData.firstname"
      @input="formData.firstname = $event.target.value"
      type="text"
      id="firstname"
      name="firstname"
      placeholder="firstname"
    />
    <p v-if="errors.firstname">{{ errors.firstname }}</p>
    <input v-model.trim="formData.email" type="email" id="email" name="email" placeholder="email" />
    <p v-if="errors.email">{{ errors.email }}</p>
    <input
      :value="formData.password"
      @input="formData.password = $event.target.value"
      type="password"
      id="password"
      name="password"
      placeholder="password"
    />
    <p v-if="errors.password">{{ errors.password }}</p>
    <button :disabled="isSubmitting" type="submit">Submit</button>
  </form>
</template>
