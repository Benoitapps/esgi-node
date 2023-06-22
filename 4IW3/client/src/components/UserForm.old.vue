<script setup>
import { reactive, ref } from 'vue'

const formData = reactive({
  lastname: '',
  firstname: '',
  email: '',
  password: ''
})

const errors = ref(null)

function handleSubmit(event) {
  let hasError = false
  fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then((response) => {
      if (response.status === 422) {
        hasError = true
      }
      return response.json()
    })
    .then((data) => {
      if (hasError) {
        errors.value = data
      } else {
        console.log(data)
        event.target.reset()
      }
    })
}

const numberInput = ref('')
</script>
<template>
  <form @submit.prevent="handleSubmit">
    <label for="lastname">Lastname</label>
    <input
      :value="formData.lastname"
      @input="formData.lastname = $event.target.value"
      type="text"
      id="lastname"
      name="lastname"
    />
    <label for="firstname">Firstname</label>
    <input
      :value="formData.firstname"
      @input="formData.firstname = $event.target.value"
      type="text"
      id="firstname"
      name="firstname"
    />
    <label for="email">Email</label>
    <input
      :value="formData.email"
      @input="formData.email = $event.target.value"
      type="email"
      id="email"
      name="email"
    />
    <label for="password">Password</label>
    <input v-model="formData.password" type="password" id="password" name="password" />
    <input v-model.number.lazy.trim="numberInput" type="text" id="numberInput" name="numberInput" />
    <input type="submit" value="Submit" />
    {{ errors }}
  </form>
  {{ formData }}
  {{ numberInput }} {{ typeof numberInput }}
  {{ errors }}
</template>
