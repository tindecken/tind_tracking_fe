<template>
  <q-form @submit="onSubmit" class="q-gutter-md">
    <q-input
      v-model.number="form.atm"
      type="number"
      label="Atm"
      :rules="[(val) => (val !== null && val !== '') || 'Required']"
    >
      <template v-slot:prepend>
        <q-icon name="attach_money" />
      </template>
    </q-input>
    <q-input
      v-model.number="form.cash"
      type="number"
      label="Cash"
      :rules="[(val) => (val !== null && val !== '') || 'Required']"
    >
      <template v-slot:prepend>
        <q-icon name="attach_money" />
      </template>
    </q-input>

    <div class="q-mt-lg">
      <q-btn
        label="Reconcilliate"
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
import type { ReconcilliationRequestModel } from 'src/models/ReconcilliationRequestModel';

const $q = useQuasar();
const spreadSheetStore = useSpreadSheetStore();
const currentDate = new Date();
const form = ref({
  atm: null as number | null,
  cash: null as number | null,
});
const isSubmitting = ref(false);

const formValid = computed(() => {
  return form.value.atm !== null && form.value.cash !== null;
});

const onSubmit = async () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;
  try {
    const requestModel: ReconcilliationRequestModel = {
      atm: form.value.atm!,
      cash: form.value.cash!,
    };
    const response = await spreadSheetStore.reconcilliation(requestModel);
    console.log('response', response);
    $q.notify({
      type: 'positive',
      message: 'Reconcilliation successfully!',
    });
    form.value = {
      atm: null,
      cash: null,
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
