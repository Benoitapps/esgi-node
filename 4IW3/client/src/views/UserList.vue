<script setup>
import UserForm from '../components/UserForm.vue';
import { reactive, ref, onMounted } from 'vue';

const users = reactive([]);
const isLoading = ref(true);
const initialUser = ref(null);

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
});

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
</script>

<template>
  <UserForm :on-submit="initialUser === null ? addUser : editUser" :initialValues="initialUser" />
  <ul v-if="!isLoading">
    <li v-for="user in users" :key="user.id" @click="initialUser = user">
      {{ user.firstname }} {{ user.lastname }} <a @click.prevent="deleteUser(user)">X</a>
    </li>
  </ul>
  <p v-else>Loading....</p>
</template>

<style scoped>
li {
  color: red;
}
</style>
