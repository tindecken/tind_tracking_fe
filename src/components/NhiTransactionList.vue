<template>
  <q-table
    :rows="listNhiTransactions"
    :columns="columns"
    row-key="cellAddress"
    :pagination="pagination"
    :loading="loading"
    class="q-mt-md transaction-table"
    :title="'Spent: ' + formatNumber(totalNhiTransactionAmount)"
    flat
    bordered
  >
    <template v-slot:body-cell-isCashed="props">
      <q-td :props="props">
        <q-icon
          :name="props.value ? 'check_circle' : 'cancel'"
          :color="props.value ? 'positive' : 'negative'"
          size="1.5rem"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useSpreadSheetStore } from 'src/stores/spreadsheet';
import type { QTableColumn } from 'quasar';

const spreadSheetStore = useSpreadSheetStore();
const loading = ref(false);

const columns: QTableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left' as const,
    field: 'name',
    sortable: true,
    style: 'max-width: 165px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;',
    headerStyle: 'max-width: 165px;',
    classes: 'note-column q-padding',
    headerClasses: 'q-padding',
  },
  {
    name: 'amount',
    label: 'Amount',
    field: 'amount',
    align: 'right' as const,
    classes: 'q-padding',
    headerClasses: 'q-padding',
    sortable: true,
  },
];

const pagination = {
  rowsPerPage: 0, // 0 means show all rows
};

const formatNumber = (value: number | string): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

const listNhiTransactions = computed(() => {
  return spreadSheetStore.nhiTransactions.map((transaction) => ({
    ...transaction,
    amount: formatNumber(transaction.amount),
  }));
});
const totalNhiTransactionAmount = computed(() => spreadSheetStore.totalNhiTransactionAmount);

onMounted(async () => {
  loading.value = true;
  try {
    await spreadSheetStore.getNhiTransactions();
  } catch (error) {
    console.error('Failed to load transactions:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.hidden-column {
  display: none;
}

.transaction-table :deep(.q-table__top) {
  padding: 8px 16px;
}

.transaction-table :deep(.q-table__title) {
  font-size: 1rem;
  font-weight: 500;
}

.transaction-table :deep(.date-column) {
  max-width: 50px;
  width: 50px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.transaction-table :deep(.note-column) {
  max-width: 165px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.transaction-table :deep(.q-table__card) {
  box-shadow: none;
  border: 1px solid #e0e0e0;
}
.transaction-table :deep(.q-padding) {
  padding-left: 8px;
  padding-right: 8px;
}
</style>
