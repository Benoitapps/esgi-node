<template>
  Connected as {{ user.email }}
  <Button title="Logout" @click="logout" />
  <h1>User list (li)</h1>
  <UserList />
  <h1>User list (span)</h1>
  <UserList>
    <template #item>
      <span>Custom item</span>
    </template>
  </UserList>
</template>

<script setup>
import { inject } from 'vue';
import Button from '@/components/Button.vue';
import UserList from '@/views/UserList.vue';
import { userKey, logoutKey } from '@/providers/AuthProviderKeys';

const user = inject(userKey);
const logout = inject(logoutKey);
</script>
