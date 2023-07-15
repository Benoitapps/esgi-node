<template>
  <slot :user="user"></slot>
</template>

<script setup>
import { onMounted, provide, ref } from 'vue';
import { userKey, loginKey, logoutKey, registerKey } from './AuthProviderKeys';
const user = ref(null);

onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    user.value = JSON.parse(atob(token.split('.')[1]));
  }
});

function login({ email, password }) {
  let hasError = false;
  return fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((response) => {
      if (response.status === 422) {
        hasError = true;
      }
      return response.json();
    })
    .then((data) => {
      if (hasError) {
        return Promise.reject(data);
      } else {
        const token = data.token;
        localStorage.setItem('token', token);
        user.value = JSON.parse(atob(token.split('.')[1]));
        return Promise.resolve(data);
      }
    });
}

function logout() {
  localStorage.removeItem('token');
  user.value = null;
}

function register(data) {
  let hasError = false;
  return fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((response) => {
      if (response.status === 422) {
        hasError = true;
      }
      return response.json();
    })
    .then((data) => {
      if (hasError) {
        return Promise.reject(data);
      } else {
        return Promise.resolve(data);
      }
    });
}

provide(userKey, user);
provide(loginKey, login);
provide(logoutKey, logout);
provide(registerKey, register);
</script>
