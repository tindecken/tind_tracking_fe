<template>
  <q-table
    :rows="listTransactions"
    :columns="columns"
    row-key="cellAddress"
    :pagination="pagination"
    :loading="loading"
    class="q-mt-md"
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
    style: 'width: 50px;',
    headerStyle: 'width: 50px;',
  },
  {
    name: 'note',
    required: true,
    label: 'Note',
    align: 'left' as const,
    field: 'note',
    sortable: true,
    style: 'width: 150px;',
    headerStyle: 'width: 150px;',
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
</style>
