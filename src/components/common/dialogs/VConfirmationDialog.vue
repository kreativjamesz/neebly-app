<template>
  <v-dialog
    v-model="confirmation.show"
    max-width="340"
  >
    <v-card :prepend-icon="confirmation.icon" :title="confirmation.title" :text="confirmation.text">
      <template v-slot:actions>
        <v-btn class="ml-auto" color="green" @click="handleConfirm">Yes</v-btn>
        <v-btn class="ml-auto" color="black" @click="handleCancel">No</v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { useConfirmationStore } from '@/stores/confirmation';

// State
const confirmationStore = useConfirmationStore();
// Assuming confirmation is a ref or reactive object
const confirmation = ref({
  show: false,
  icon: 'mdi-alert',
  title: 'Title',
  text: 'Text',
});

// Emits
const emit = defineEmits(['confirm', 'cancel']);

const handleConfirm = () => {
  emit('confirm');
  confirmationStore.closeConfirmation(); // Ensure the dialog closes after confirmation
};

const handleCancel = () => {
  emit('cancel');
  confirmationStore.closeConfirmation(); // Ensure the dialog closes after cancellation
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
