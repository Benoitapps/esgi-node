<script setup>
import { reactive, ref, onMounted, provide } from 'vue';
import { userManagerKey, userManagerUsersKey, userManagerIsLoadingKey } from './userManagerKeys.js';
const users = reactive([]);
const isLoading = ref(true);

function addUser(user) {
  let hasError = false;
  return fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
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
        users.push(data);
      }
    });
}

function editUser(user) {
  let hasError = false;
  return fetch(`http://localhost:3000/users/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
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
        users.push(data);
      }
    });
}

onMounted(() => {
  fetchUsers();
});

function fetchUsers() {
  fetch('http://localhost:3000/users')
    .then((response) => response.json())
    .then((data) => {
      users.push(...data);
      isLoading.value = false;
    })
    .catch((error) => {
      alert(error.message);
      isLoading.value = false;
    });
}

function deleteUser(user) {
  fetch(`http://localhost:3000/users/${user.id}`, {
    method: 'DELETE'
  }).then((response) => {
    if (response.status === 204) users.splice(users.indexOf(user), 1);
    else {
      alert('An error occured');
    }
  });
}

provide(userManagerKey, {
  addUser,
  editUser,
  deleteUser,
  fetchUsers
});

provide(userManagerUsersKey, users);
provide(userManagerIsLoadingKey, isLoading);
</script>

<template>
  <template v-if="!isLoading">
    <slot></slot>
  </template>
  <p v-else>Loading....</p>
</template>

<style scoped>
li {
  color: red;
}
</style>
