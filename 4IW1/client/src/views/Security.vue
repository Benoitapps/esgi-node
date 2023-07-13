<template>
  <h1>Login</h1>
  <LoginForm :on-submit="login" />
  <h1>Register</h1>
  <UserForm :on-submit="register" />
</template>

<script setup>
import { inject } from 'vue';
import { loginKey, registerKey } from '@/providers/AuthProviderKeys';
import LoginForm from '@/components/LoginForm.vue';
import UserForm from '@/components/UserForm.vue';

const login = inject(loginKey);
const register = inject(registerKey);
</script>
