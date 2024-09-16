import 'reflect-metadata';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createInjector } from '@/utils/di';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';

import App from './App.vue';
import router from './router';
import { AppConfig } from '@/services/AppConfig';
import { ApiService } from '@/services/ApiService';

import 'vuetify/styles';
import '@/assets/style.scss';

const injector = createInjector({
  services: [AppConfig, ApiService],
});

const vuetify = createVuetify({
  icons: { defaultSet: 'mdi', aliases, sets: { mdi } },
});

(async () => {
  try {
    const config = injector.get(AppConfig);
    await config.init();

    const app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(injector);
    app.use(vuetify);

    app.mount('#app');
  } catch (e) {
    alert('Error: ' + e);
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
})();
