import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'

import StreamItem from './components/StreamItem.vue'

const app = createApp(App)
app.use(createPinia())
app.component('StreamItem', StreamItem)
app.mount('#app')
