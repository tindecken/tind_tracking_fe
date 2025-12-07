<template>
  <q-form @submit="onSubmit" class="q-gutter-md">
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
    <q-select v-model="fare" :options="fareOptions" label="Fare"> </q-select>
    <div class="q-mt-lg">
      <q-btn
        label="Withdraw"
        type="submit"
        color="primary"
        class="full-width"
        :disable="!formValid || isSubmitting"
        :loading="isSubmitting"
      />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useSpreadSheetStore } from 'src/stores/spreadsheet';
import { useQuasar } from 'quasar';
import type { CashWithDrawalRequestModel } from 'src/models/CashWithDrawalRequestModel';

const $q = useQuasar();
const spreadSheetStore = useSpreadSheetStore();
const form = ref({
  amount: null as number | null,
});
const fare = ref(1);
const fareOptions = [1, 3];
const isSubmitting = ref(false);

const formValid = computed(() => {
  return form.value.amount !== null;
});

const onSubmit = async () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;
  try {
    const requestModel: CashWithDrawalRequestModel = {
      amount: Number(form.value.amount),
      fare: fare.value,
    };
    console.log('request model', requestModel);
    const response = await spreadSheetStore.cashWithdrawal(requestModel);
    console.log('response', response);
    $q.notify({
      type: 'positive',
      message: `Withdraw ${fare.value} successfully!`,
    });
    form.value = {
      amount: null,
    };
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
  } finally {
    isSubmitting.value = false;
  }
};
</script>
