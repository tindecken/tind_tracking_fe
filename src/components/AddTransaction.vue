<template>
  <q-form @submit="onSubmit" class="q-gutter-md">
    <q-input
      v-model="form.day"
      type="number"
      label="Day"
      :rules="[
        (val) => !!val || 'Required',
        (val) => (val >= 1 && val <= 31) || 'Day must be between 1 and 31',
      ]"
    />

    <q-input v-model="form.note" label="Note" :rules="[(val) => !!val || 'Required']" />

    <q-input
      v-model.number="form.price"
      type="number"
      label="Price"
      :rules="[(val) => (val !== null && val !== '') || 'Required']"
    >
      <template v-slot:prepend>
        <q-icon name="attach_money" />
      </template>
    </q-input>

    <div class="q-mt-md">
      <q-checkbox v-model="form.isCountForNhi" label="Nhi" class="q-mr-md" />
      <q-checkbox v-model="form.isPayByCash" label="Pay By Cash" />
    </div>

    <div class="q-mt-lg">
      <q-btn label="Add" type="submit" color="primary" class="full-width" :disable="!formValid" />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useSpreadSheetStore } from 'src/stores/spreadsheet';
import { useQuasar } from 'quasar';
import type { AddTransactionRequestModel } from 'src/models/AddTransactionRequestModel';

const $q = useQuasar();
const spreadSheetStore = useSpreadSheetStore();
const currentDate = new Date();
const form = ref({
  day: currentDate.getDate(),
  note: '',
  price: null as number | null,
  isCountForNhi: false,
  isPayByCash: false,
});
const tab = ref('summary');
const radio = ref('default');

const formValid = computed(() => {
  return form.value.day !== null && form.value.note.trim() !== '' && form.value.price !== null;
});

const onSubmit = async () => {
  try {
    const requestModel: AddTransactionRequestModel = {
      day: form.value.day.toString(),
      note: form.value.note,
      price: form.value.price!,
      isCountForNhi: form.value.isCountForNhi,
      isPaybyCash: form.value.isPayByCash,
    };
    const response = await spreadSheetStore.addTransaction(requestModel);
    console.log('response', response);
    $q.notify({
      type: 'positive',
      message: 'Add transaction successfully!',
    });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : typeof err === 'object' && err !== null && 'message' in err
          ? String(err.message)
          : 'An unknown error occurred';

    $q.notify({
      type: 'negative',
      message: errorMessage,
    });
  }
};
</script>
