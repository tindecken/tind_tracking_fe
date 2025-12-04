<template>
  <q-table
    :rows="listTransactions"
    :columns="columns"
    row-key="cellAddress"
    :pagination="pagination"
    :loading="loading"
    class="q-mt-md transaction-table"
    title="Transactions"
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
    name: 'date',
    required: true,
    label: 'Date',
    align: 'left',
    field: 'date',
    sortable: true,
    style: 'max-width: 80px;',
    headerStyle: 'max-width: 80px;',
    classes: 'date-column',
    headerClasses: 'date-column',
  },
  {
    name: 'note',
    required: true,
    label: 'Note',
    align: 'left' as const,
    field: 'note',
    sortable: true,
    style: 'max-width: 165px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;',
    headerStyle: 'max-width: 165px;',
    classes: 'note-column',
  },
  {
    name: 'price',
    label: 'Price',
    field: 'price',
    align: 'right' as const,
    sortable: true,
  },
  {
    name: 'isCashed',
    label: 'Cashed',
    field: 'isCashed',
    align: 'center' as const,
    sortable: true,
  },
];

const pagination = {
  rowsPerPage: 0, // 0 means show all rows
};

const listTransactions = computed(() => spreadSheetStore.listTransactions);

onMounted(async () => {
  loading.value = true;
  try {
    await spreadSheetStore.getAllTransactions();
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
  max-width: 80px;
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
</style>
