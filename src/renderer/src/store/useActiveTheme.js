import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useActiveTheme = defineStore('activeTheme', () => {
    return {
        theme: ref('light'),
        elIconColor: ref('white')
    };
});
