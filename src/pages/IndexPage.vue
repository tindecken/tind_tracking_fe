<template>
  <q-page padding class="q-pa-md">
    <div class="q-mx-auto" style="max-width: 500px">
      <q-card class="q-pa-md">
        <q-card-section>
          <div class="text-h6">Add Transaction</div>
        </q-card-section>

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
            <q-checkbox v-model="form.isNhi" label="Nhi" class="q-mr-md" />
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
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useSpreadSheetStore } from 'src/stores/spreadsheet';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const spreadSheetStore = useSpreadSheetStore();
const form = ref({
  day: null as number | null,
  note: '',
  price: null as number | null,
  isNhi: false,
  isPayByCash: false,
});

const formValid = computed(() => {
  return form.value.day !== null && form.value.note.trim() !== '' && form.value.price !== null;
});

const onSubmit = async () => {
  try {
    const response = await spreadSheetStore.getPerDay();
    console.log('response', response);
    $q.notify({
      type: 'positive',
      message: 'Per day updated successfully!',
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
