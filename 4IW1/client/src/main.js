import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import TestPlugin from './plugins/TestPlugin';

const myApp = createApp(App);
myApp.use(TestPlugin, { coucou: 'coucou' });
myApp.mount('#app');
