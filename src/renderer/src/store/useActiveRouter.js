import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useActiveRouter = defineStore('activeActiveRouter', () => {
    return {
        firstMenu: ref(''),
        secondMenu: ref(''),
        currentRoutePath: ref('')
    };
});
