import { createApp } from 'vue'
import './style.css'
import './reset.css'
import App from './App.vue'
import router from './routes/router'
import vSlide from '../directives/vSlide'

const app = createApp(App)
app.use(router)

vSlide(app)

app.mount('#app')
