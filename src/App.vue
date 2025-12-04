<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSpreadSheetStore } from './stores/spreadsheet';

const spreadsheetStore = useSpreadSheetStore();

onMounted(async () => {
  try {
    // Fetch both data in parallel
    await Promise.all([
      spreadsheetStore.getMustPay(),
      spreadsheetStore.getPerDay(),
      spreadsheetStore.getNhiRemaining(),
      spreadsheetStore.getHoangRemaining(),
      spreadsheetStore.getAllTransactions(),
    ]);
  } catch (error) {
    console.error('Failed to fetch initial data:', error);
  }
});
</script>
