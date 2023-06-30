import { defineStore } from 'pinia';

export const useHeaderStore = defineStore('headerStore', {
  state: (): {
    showIcons: boolean,
  } => ({
    showIcons: false,
  }),
  getters: {
    shouldShowIcons: state => state.showIcons,
  },
  actions: {
    setShowIcons (value: boolean) {
      this.showIcons = value;
    },
  },
});