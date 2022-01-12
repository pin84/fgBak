import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import './assets/css/icon.css'
import './assets/css/iconfont.css'



// import Vue from 'vue'

const app = createApp(App)

// debugger
// app.prototype.$get = 'get';
// Vue.prototype.$post = 'post';


installElementPlus(app)
app
    .use(store)
    .use(router)
    .mount('#app')


