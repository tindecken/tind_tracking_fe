import { defineStore } from 'pinia';
import { api } from '../boot/axios';
import type { GenericResponseData } from 'src/models/GenericResponseData';
import handleError from 'src/utils/handleError';
import type { PerDayResponse } from 'src/models/PerDayResponse';
import type { AddTransactionRequestModel } from 'src/models/AddTransactionRequestModel';
import type { AddTransactionResponse } from 'src/models/AddTransactionResponse';
import type { GetMustPayResponse } from 'src/models/GetMustPayResponse';

export const useSpreadSheetStore = defineStore('spreadSheet', {
  state: () => {
    return {
      nhiRemaining: 0,
      perDay: 0,
      listMustPay: [] as GetMustPayResponse,
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
  },
});
