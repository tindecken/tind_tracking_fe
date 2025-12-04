<template>
  <div class="row justify-between q-mb-md">
    <div class="text-h6">ATM: {{ atm }}</div>
    <div class="text-h6">Cash: {{ cash }}</div>
  </div>
  <div class="row justify-between">
    <div class="text-h6">Perday: {{ perDay }}</div>
    <div class="text-h6">Nhi: {{ nhiRemaining }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useSpreadSheetStore } from 'src/stores/spreadsheet';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const spreadSheetStore = useSpreadSheetStore();

const perDay = computed(() => spreadSheetStore.perDay);
const nhiRemaining = computed(() => spreadSheetStore.nhiRemaining);
const cash = computed(() => spreadSheetStore.cash);
const atm = computed(() => spreadSheetStore.atm);
</script>
