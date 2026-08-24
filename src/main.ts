import { createApp } from 'vue'
import './style.css'
import { viewport } from './directives/viewport.ts'
import router from './router/index.ts'
import App from './App.vue'
const app = createApp(App)
app.use(router)
app.directive('viewport', viewport)
app.mount('#app')
if (import.meta.env.DEV) {
  app.config.performance = true
}