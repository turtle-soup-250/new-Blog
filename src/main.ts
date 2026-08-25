import { createApp } from 'vue'
import './style.css'
import router from './router/index.ts'
import App from './App.vue'
const app = createApp(App)
app.use(router)
app.mount('#app')
if (import.meta.env.DEV) {
  app.config.performance = true
}