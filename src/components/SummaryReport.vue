<template>
  <div class="row justify-between q-mb-md">
    <div class="text-h6">ATM: {{ atm }}</div>
    <div class="text-h6">Cash: {{ cash }}</div>
    <div class="text-h6">Day Left: {{ dayLeft }}</div>
  </div>
  <div class="row justify-between">
    <div class="text-h6">Perday: {{ perDay }}</div>
    <div class="text-h6">Nhi: {{ nhiRemaining }}</div>
  </div>
  <q-table
    :rows="listMustPay"
    :columns="columns"
    row-key="cell"
    flat
    bordered
    class="q-mt-md"
    :rows-per-page-options="[20]"
    :pagination="{ rowsPerPage: 20 }"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSpreadSheetStore } from 'src/stores/spreadsheet';
const spreadSheetStore = useSpreadSheetStore();

const perDay = computed(() => spreadSheetStore.perDay);
const nhiRemaining = computed(() => spreadSheetStore.nhiRemaining);
const cash = computed(() => spreadSheetStore.cash);
const atm = computed(() => spreadSheetStore.atm);
const dayLeft = computed(() => spreadSheetStore.dayLeft);
const listMustPay = computed(() => spreadSheetStore.listMustPay);

const columns = [
  {
    name: 'cell',
    label: 'Cell',
    field: 'cell',
    align: 'left' as const,
    classes: 'hidden',
    headerClasses: 'hidden',
  },
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'left' as const,
  },
  {
    name: 'amount',
    label: 'Amount',
    field: 'amount',
    align: 'right' as const,
  },
];
</script>
