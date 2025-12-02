import { defineStore } from 'pinia';
import { api } from '../boot/axios';
import type { GenericResponseData } from 'src/models/GenericResponseData';
import handleError from 'src/utils/handleError';

interface PerDayResponse {
  perDay: number;
}

export const useSpreadSheetStore = defineStore('spreadSheet', {
  state: () => {
    return {
      nhiRemaining: 0,
      perDay: 0,
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
  },
});
