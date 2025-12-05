<template>
  <q-table
    title="Summary"
    :rows="summaryData"
    :columns="summaryColumns"
    :pagination="{ rowsPerPage: 0 }"
    hide-pagination
    hide-header
    flat
    bordered
    class="q-mb-md"
    :rows-per-page-options="[0]"
    dense
  >
    <template v-slot:body-cell-value="props">
      <q-td :props="props" class="text-right">
        {{ props.value }}
      </q-td>
    </template>
  </q-table>
  <q-table
    title="Must Pay"
    :rows="listMustPay"
    :columns="columns"
    row-key="cell"
    flat
    bordered
    class="q-mt-md"
    hide-pagination
    hide-header
    :rows-per-page-options="[0]"
    dense
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSpreadSheetStore } from 'src/stores/spreadsheet';
import type { QTableColumn } from 'quasar';

const spreadSheetStore = useSpreadSheetStore();

const summaryColumns: QTableColumn[] = [
  { name: 'label', label: 'Label', field: 'label', align: 'left' as const },
  { name: 'value', label: 'Value', field: 'value', align: 'right' as const },
];

const summaryData = computed(() => [
  { label: 'ATM', value: spreadSheetStore.atm },
  { label: 'Cash', value: spreadSheetStore.cash },
  { label: 'Day Left', value: spreadSheetStore.dayLeft },
  { label: 'Per Day', value: spreadSheetStore.perDay },
  { label: 'Nhi', value: spreadSheetStore.nhiRemaining },
]);

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
