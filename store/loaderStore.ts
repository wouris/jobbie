import { defineStore } from 'pinia';

export const useLoaderStore = defineStore('loaderStore', {
  state: (): {
    showLoader: boolean,
  } => ({
    showLoader: true,
  }),
  getters: {
    shouldShowLoader: state => state.showLoader,
  },
  actions: {
    setShowLoader (value: boolean) {
      this.showLoader = value;
    },
  },
});
