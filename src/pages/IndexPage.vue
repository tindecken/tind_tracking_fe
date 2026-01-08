<template>
  <q-page padding class="q-pa-md">
    <div class="q-mx-auto" style="max-width: 500px">
      <q-tabs v-model="tab" no-caps class="shadow-2">
        <q-tab name="summary" label="Summary" />
        <q-tab name="addTransaction" label="Add Transaction" />
        <q-tab name="transactions" label="Transactions" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="summary" class="q-pl-none q-pr-none">
          <summary-report></summary-report>
        </q-tab-panel>

        <q-tab-panel name="addTransaction" class="q-pl-none q-pr-none">
          <div class="q-gutter-sm q-mb-sm">
            <q-radio v-model="radio" val="default" label="Default" />
            <q-radio v-model="radio" val="mustPay" label="For Must Pay" />
            <q-radio v-model="radio" val="cashWithdrawal" label="Withdraw" />
            <q-radio v-model="radio" val="reconcilliation" label="Reconcilliation" />
          </div>
          <q-card v-if="radio === 'default'" class="q-pa-xs">
            <add-transaction></add-transaction>
          </q-card>
          <q-card v-if="radio === 'mustPay'" class="q-pa-xs">
            <add-transaction-for-mustpay></add-transaction-for-mustpay>
          </q-card>
          <q-card v-if="radio === 'cashWithdrawal'" class="q-pa-xs">
            <cash-withdrawal></cash-withdrawal>
          </q-card>
          <q-card v-if="radio === 'reconcilliation'" class="q-pa-xs">
            <reconcilliation></reconcilliation>
          </q-card>
        </q-tab-panel>
        <q-tab-panel name="transactions" class="q-pl-none q-pr-none">
          <div class="q-gutter-sm q-mb-sm">
            <q-radio v-model="transactionType" val="default" label="Default" />
            <q-radio v-model="transactionType" val="nhi" label="Nhi" />
          </div>
          <transaction-list v-if="transactionType === 'default'"></transaction-list>
          <nhi-transaction-list v-else></nhi-transaction-list>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AddTransaction from 'src/components/AddTransaction.vue';
import AddTransactionForMustpay from 'src/components/AddTransactionForMustpay.vue';
import SummaryReport from 'src/components/SummaryReport.vue';
import TransactionList from 'src/components/TransactionList.vue';
import NhiTransactionList from 'src/components/NhiTransactionList.vue';
import CashWithdrawal from 'src/components/CashWithdrawal.vue';
import Reconcilliation from 'src/components/Reconcilliation.vue';

const tab = ref('summary');
const radio = ref('default');
const transactionType = ref('default');
</script>
