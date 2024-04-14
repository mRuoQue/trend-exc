import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import vSlide from '../directives/vSlide'

const app = createApp(App)
vSlide(app)

app.mount('#app')
