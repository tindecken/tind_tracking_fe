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

    <q-select v-model="mustPay" :options="options" label="Must Pay" option-value="cell">
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section>
            <q-item-label>{{ scope.opt.name }} - {{ scope.opt.amount }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
      <template v-slot:selected-item="scope">
        <span>{{ scope.opt.name }} - {{ scope.opt.amount }}</span>
      </template>
    </q-select>

    <q-input
      v-model.number="form.amount"
      type="number"
      label="Amount"
      :rules="[(val) => (val !== null && val !== '') || 'Required']"
    >
      <template v-slot:prepend>
        <q-icon name="attach_money" />
      </template>
    </q-input>

    <div class="q-mt-md">
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
import type { AddTransactionForMustPayRequestModel } from 'src/models/AddTransactionForMustPayRequestModel';
import type { MustPayModel } from 'src/models/MustPayModel';

const $q = useQuasar();
const spreadSheetStore = useSpreadSheetStore();
const currentDate = new Date();
const form = ref({
  day: currentDate.getDate(),
  amount: null as number | null,
  isPayByCash: false,
});
const mustPay = ref<MustPayModel | null>(null);
const options = computed(() => spreadSheetStore.listMustPay as MustPayModel[]);

const formValid = computed(() => {
  return form.value.day !== null && form.value.amount !== null && mustPay.value !== null;
});

const onSubmit = () => {
  try {
    const requestModel: AddTransactionForMustPayRequestModel = {
      day: form.value.day.toString(),
      amount: Number(form.value.amount),
      isPaybyCash: form.value.isPayByCash,
      mustPay: {
        name: mustPay.value!.name,
        amount: Number(mustPay.value!.amount),
        cell: mustPay.value!.cell,
      },
    };
    console.log('request model', requestModel);
    // const response = await spreadSheetStore.addTransaction(requestModel);
    // console.log('response', response);
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
