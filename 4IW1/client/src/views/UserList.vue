<script setup>
import { reactive, onMounted, ref } from 'vue';
import UserForm from '../components/UserForm.vue';
import UserItem from './UserItem.vue';
const users = reactive([]);
const userSelected = ref(null);

onMounted(async () => {
  const response = await fetch('http://localhost:3000/users', {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  });
  const data = await response.json();
  users.push(...data);
});

async function deleteUser(user) {
  const response = await fetch('http://localhost:3000/users/' + user.id, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  });
  if (response.status === 204) {
    users.splice(users.indexOf(user), 1);
  }
}
async function editUser(user) {
  const response = await fetch('http://localhost:3000/users/' + user.id, {
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  if (response.ok) {
    users.splice(
      users.findIndex((_u) => _u.id === user.id),
      1,
      await response.json()
    );
  } else if (response.status === 422) {
    throw await response.json();
  } else {
    throw new Error('Error while fetching');
  }
}
</script>

<template>
  <ul>
    <slot name="item" v-for="user in users" :key="user.id"><UserItem @select="userSelected = $event" @delete="deleteUser($event)" :user="user" /></slot>
  </ul>
  <p>User selected : {{ userSelected }}</p>
  <UserForm v-if="userSelected" :on-submit="editUser" :initialValues="userSelected" />
</template>
