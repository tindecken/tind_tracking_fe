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
            <add-transaction></add-transaction>
          </q-card>
          <q-card v-if="radio === 'mustPay'" class="q-pa-md">
            <add-transaction-for-mustpay></add-transaction-for-mustpay>
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
import { ref } from 'vue';
import AddTransaction from 'src/components/AddTransaction.vue';
import AddTransactionForMustpay from 'src/components/AddTransactionForMustpay.vue';

const tab = ref('summary');
const radio = ref('default');
</script>
