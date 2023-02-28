import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)

import './scss/base.scss'

import '../src/components/components'
