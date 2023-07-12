<script setup>
defineProps({
  open: Boolean
});

defineEmits(['close']);
</script>

<template>
  <div v-show="open" class="modal">
    <div class="backdrop" @click.self="$emit('close')"></div>
    <div class="modal-box">
      <div class="modal-title">Title</div>
      <div class="modal-content">Content</div>
      <div class="modal-actions"><button @click="$emit('close')">Close</button></div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  color: black;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1001;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1002;
  width: 100%;
  max-width: 500px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 1rem;
}

.modal-title {
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}

.modal-content {
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
}
</style>
