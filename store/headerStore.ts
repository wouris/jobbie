import {defineStore} from 'pinia';

export const useHeaderStore = defineStore('headerStore', {
    state: (): {
        showIcons: boolean,
        initial: boolean,
    } => ({
        showIcons: false,
        initial: true,
    }),
    getters: {
        shouldShowIcons: state => state.showIcons,
        isInitial: state => state.initial,
    },
    actions: {
        setShowIcons(value: boolean) {
            this.showIcons = value;
            this.initial = false
        },
        setInitial(value: boolean) {
            this.initial = value;
        },
    },
});