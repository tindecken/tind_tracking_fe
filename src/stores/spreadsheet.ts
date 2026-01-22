import { defineStore } from 'pinia';
import { api } from '../boot/axios';
import type { GenericResponseData } from 'src/models/GenericResponseData';
import handleError from 'src/utils/handleError';
import type { PerDayResponse } from 'src/models/PerDayResponse';
import type { AddTransactionRequestModel } from 'src/models/AddTransactionRequestModel';
import type { AddTransactionResponse } from 'src/models/AddTransactionResponse';
import type { GetMustPayResponse } from 'src/models/GetMustPayResponse';
import type { GetNhiRemainingResponse } from 'src/models/GetNhiRemainingResponse';
import type { GetHoangRemainingResponse } from 'src/models/GetHoangRemainingResponse';
import type { TransactionModel } from 'src/models/TransactionModel';
import type { GetAllTransactionsResponse } from 'src/models/GetAllTransactionsResponse';
import type { AddTransactionForMustPayRequestModel } from 'src/models/AddTransactionForMustPayRequestModel';
import type { CashWithDrawalRequestModel } from 'src/models/CashWithDrawalRequestModel';
import type { GetNhiTransactionsResponse } from 'src/models/GetNhiTransactionsResponse';
import type { ReconcilliationRequestModel } from 'src/models/ReconcilliationRequestModel';
import { GiveNhiRequestModel } from 'src/models/GiveNhiRequestModel';

export const useSpreadSheetStore = defineStore('spreadSheet', {
  state: () => {
    return {
      atm: 0,
      cash: 0,
      dayLeft: 0,
      nhiRemaining: 0,
      perDay: 0,
      listMustPay: [] as GetMustPayResponse,
      listTransactions: [] as TransactionModel[],
      nhiTransactions: [] as {
        name: string;
        amount: number;
      }[],
      totalTransactionAmount: 0,
      totalNhiTransactionAmount: 0,
    };
  },
  getters: {},
  actions: {
    async getPerDay(): Promise<GenericResponseData<PerDayResponse> | undefined> {
      try {
        const axiosResponse = await api.get('/spreadsheet/perDay', {
          withCredentials: true,
        });
        const responseData = (await axiosResponse.data) as GenericResponseData<PerDayResponse>;
        console.log('responseData', responseData);
        this.$patch({
          perDay: responseData?.data?.perDay,
        });
        return responseData;
      } catch (error: any) {
        handleError(error);
      }
    },
    async getNhiRemaining(): Promise<GenericResponseData<GetNhiRemainingResponse> | undefined> {
      try {
        const axiosResponse = await api.get('/spreadsheet/nhiRemaining', {
          withCredentials: true,
        });
        const responseData =
          (await axiosResponse.data) as GenericResponseData<GetNhiRemainingResponse>;
        console.log('responseData', responseData);
        this.$patch({
          nhiRemaining: responseData?.data?.nhiRemaining,
        });
        return responseData;
      } catch (error: any) {
        handleError(error);
      }
    },
    async getHoangRemaining(): Promise<GenericResponseData<GetHoangRemainingResponse> | undefined> {
      try {
        const axiosResponse = await api.get('/spreadsheet/hoangRemaining', {
          withCredentials: true,
        });
        const responseData =
          (await axiosResponse.data) as GenericResponseData<GetHoangRemainingResponse>;
        console.log('responseData', responseData);
        this.$patch({
          atm: responseData?.data?.atm,
          cash: responseData?.data?.cash,
          dayLeft: responseData?.data?.dayLeft,
        });
        return responseData;
      } catch (error: any) {
        handleError(error);
      }
    },
    async addTransaction(
      model: AddTransactionRequestModel,
    ): Promise<GenericResponseData<AddTransactionResponse> | undefined> {
      try {
        const axiosResponse = await api.post('/spreadsheet/addTransaction', model);
        const responseData =
          (await axiosResponse.data) as GenericResponseData<AddTransactionResponse>;
        console.log('responseData', responseData);
        this.$patch({
          perDay: Number(responseData?.data?.perDayAfter),
        });
        return responseData;
      } catch (error: any) {
        handleError(error);
      }
    },
    async addTransactionForMustPay(
      model: AddTransactionForMustPayRequestModel,
    ): Promise<GenericResponseData<any> | undefined> {
      try {
        const axiosResponse = await api.post('/spreadsheet/addTransactionForMustPay', model);
        const responseData = (await axiosResponse.data) as GenericResponseData<any>;
        console.log('responseData', responseData);
        return responseData;
      } catch (error: any) {
        handleError(error);
      }
    },
    async cashWithdrawal(
      model: CashWithDrawalRequestModel,
    ): Promise<GenericResponseData<any> | undefined> {
      try {
        const axiosResponse = await api.post('/spreadsheet/cashWithdrawal', model);
        const responseData = (await axiosResponse.data) as GenericResponseData<any>;
        console.log('responseData', responseData);
        return responseData;
      } catch (error: any) {
        handleError(error);
      }
    },
    async reconcilliation(
      model: ReconcilliationRequestModel,
    ): Promise<GenericResponseData<any> | undefined> {
      try {
        const axiosResponse = await api.post('/spreadsheet/reconcilliation', model);
        const responseData = (await axiosResponse.data) as GenericResponseData<any>;
        console.log('responseData', responseData);
        return responseData;
      } catch (error: any) {
        handleError(error);
      }
    },
    async getMustPay(): Promise<GenericResponseData<GetMustPayResponse> | undefined> {
      try {
        const axiosResponse = await api.get('/spreadsheet/getMustPay', {
          withCredentials: true,
        });
        const responseData = (await axiosResponse.data) as GenericResponseData<GetMustPayResponse>;
        console.log('responseData', responseData);
        this.$patch({
          listMustPay: responseData?.data,
        });
        return responseData;
      } catch (error: any) {
        handleError(error);
      }
    },
    async getAllTransactions(): Promise<
      GenericResponseData<GetAllTransactionsResponse> | undefined
    > {
      try {
        const axiosResponse = await api.get('/spreadsheet/allTransactions');
        const responseData =
          (await axiosResponse.data) as GenericResponseData<GetAllTransactionsResponse>;
        console.log('responseData', responseData);
        this.$patch({
          listTransactions: responseData?.data?.transactions,
          totalTransactionAmount: responseData?.data?.total,
        });
        return responseData;
      } catch (error: any) {
        handleError(error);
      }
    },
    async getNhiTransactions(): Promise<
      GenericResponseData<GetNhiTransactionsResponse> | undefined
    > {
      try {
        const axiosResponse = await api.get('/spreadsheet/getNhiTransactions');
        const responseData =
          (await axiosResponse.data) as GenericResponseData<GetNhiTransactionsResponse>;
        console.log('responseData', responseData);
        this.$patch({
          nhiTransactions: responseData?.data?.transactions,
          totalNhiTransactionAmount: responseData?.data?.total,
        });
        return responseData;
      } catch (error: any) {
        handleError(error);
      }
    },
    async giveNhi(
      model: GiveNhiRequestModel,
    ): Promise<GenericResponseData<any> | undefined> {
      try {
        const axiosResponse = await api.post('/spreadsheet/giveNhi', model);
        const responseData = (await axiosResponse.data) as GenericResponseData<any>;
        console.log('giveNhi responseData', responseData);
        return responseData;
      } catch (error: any) {
        handleError(error);
      }
    },
  },
});
