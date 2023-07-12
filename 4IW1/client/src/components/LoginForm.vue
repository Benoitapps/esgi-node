<script setup>
import { reactive, ref } from 'vue';

const props = defineProps({
  onSubmit: Function
});

const formData = reactive({
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
