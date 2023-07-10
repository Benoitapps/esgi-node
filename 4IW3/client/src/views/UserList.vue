<script setup>
import UserForm from '../components/UserForm.vue';
import { reactive, ref, onMounted, inject } from 'vue';
import UserItem from '../components/UserItem.vue';
import { userManagerKey, userManagerUsersKey } from '../contexts/userManagerKeys';

const initialUser = ref(null);

const { addUser, editUser, deleteUser } = inject(userManagerKey);
const users = inject(userManagerUsersKey);

const handleSubmit = (data) => {
  if (initialUser === null) addUser(data);
  else editUser(data);
};
</script>

<template>
  <UserForm @submit="handleSubmit" :initialValues="initialUser" />
  <!-- UserForm
    @submit="initialUser === null ? addUser($event) : editUser($event)"
    :initialValues="initialUser"
  /-->
  <ul>
    <UserItem
      v-for="user in users"
      :key="user.id"
      :user="user"
      @select="initialUser = $event"
      @delete="deleteUser"
    />
  </ul>
</template>

<style scoped>
li {
  color: red;
}
</style>
