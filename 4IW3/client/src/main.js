import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import TestPlugin from './plugins/TestPlugin'

const app = createApp(App);
app.use(TestPlugin, {test: "test"});
app.mount('#app');
