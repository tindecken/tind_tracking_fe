<template>
  <q-page padding class="q-pa-md">
    <div class="q-mx-auto" style="max-width: 500px">
      <q-tabs v-model="tab" no-caps class="shadow-2">
        <q-tab name="summary" label="Summary" />
        <q-tab name="addTransaction" label="Add Transaction" />
        <q-tab name="mustPay" label="Must Pay" />
        <q-tab name="transactions" label="Transactions" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="summary">
          <div class="text-h6">Summary</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="addTransaction">
          <div class="q-gutter-sm q-mb-sm">
            <q-radio v-model="radio" val="default" label="Default" />
            <q-radio v-model="radio" val="mustPay" label="For Must Pay" />
          </div>
          <q-card v-if="radio === 'default'" class="q-pa-md">
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
                <q-btn
                  label="Add"
                  type="submit"
                  color="primary"
                  class="full-width"
                  :disable="!formValid"
                />
              </div>
            </q-form>
          </q-card>
          <q-card v-if="radio === 'mustPay'" class="q-pa-md">
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
                <q-checkbox v-model="form.isPayByCash" label="Pay By Cash" />
              </div>

              <div class="q-mt-lg">
                <q-btn
                  label="Add"
                  type="submit"
                  color="primary"
                  class="full-width"
                  :disable="!formValid"
                />
              </div>
            </q-form>
          </q-card>
        </q-tab-panel>

        <q-tab-panel name="mustPay">
          <div class="text-h6">Must Pay</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
        <q-tab-panel name="transactions">
          <div class="text-h6">Transactions</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
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
