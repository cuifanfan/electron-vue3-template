import { createI18n } from 'vue-i18n';
import cn from './languages/cn.js';
import en from './languages/en.js';

const i18n = createI18n({
    locale: localStorage.getItem('language') ?? 'cn',
    messages: {
        cn,
        en
    },
    // 支持組合式api
    legacy: false,
    // 全局注册$t方法
    globalInjection: true
});
export default i18n;
