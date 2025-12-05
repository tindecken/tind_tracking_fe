<template>
  <div class="row q-col-gutter-sm">
    <div class="col-auto">
      <q-table
        title="Summary"
        :rows="summaryData"
        :columns="summaryColumns"
        :pagination="{ rowsPerPage: 0 }"
        hide-pagination
        hide-header
        hide-no-data
        flat
        bordered
        :rows-per-page-options="[0]"
        style="width: 160px"
      >
        <template v-slot:body="props">
          <q-tr
            :props="props"
            :class="{ 'bg-grey-2': props.rowIndex % 2 === 0, 'bg-white': props.rowIndex % 2 !== 0 }"
          >
            <q-td>{{ props.row.label }}</q-td>
            <q-td class="text-right">{{ props.row.value }}</q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <div class="col-auto">
      <q-table
        title="Must Pay"
        :rows="listMustPay"
        :columns="columns"
        row-key="cell"
        flat
        bordered
        hide-pagination
        hide-header
        hide-no-data
        :rows-per-page-options="[0]"
        style="width: 160px"
      >
        <template v-slot:body="props">
          <q-tr
            :props="props"
            :class="{ 'bg-grey-2': props.rowIndex % 2 === 0, 'bg-white': props.rowIndex % 2 !== 0 }"
          >
            <q-td>{{ props.row.name }}</q-td>
            <q-td class="text-right">{{ props.row.amount }}</q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSpreadSheetStore } from 'src/stores/spreadsheet';
import type { QTableColumn } from 'quasar';

const formatNumber = (value: number | string): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

const spreadSheetStore = useSpreadSheetStore();

const summaryColumns: QTableColumn[] = [
  { name: 'label', label: 'Label', field: 'label', align: 'left' as const },
  { name: 'value', label: 'Value', field: 'value', align: 'right' as const },
];

const summaryData = computed(() => [
  { label: 'ATM', value: formatNumber(spreadSheetStore.atm) },
  { label: 'Cash', value: formatNumber(spreadSheetStore.cash) },
  { label: 'Day Left', value: spreadSheetStore.dayLeft },
  { label: 'Per Day', value: formatNumber(spreadSheetStore.perDay) },
  { label: 'Nhi', value: formatNumber(spreadSheetStore.nhiRemaining) },
]);

const listMustPay = computed(() => {
  return spreadSheetStore.listMustPay.map((item) => ({
    ...item,
    amount: formatNumber(item.amount),
  }));
});

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
