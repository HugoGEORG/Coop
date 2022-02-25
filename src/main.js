import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

Vue.prototype.$api = axios.create({
    baseURL: 'https://allweb.fun/coop/api/',
    params: {},
    headers: { 'Authorization': "a7c437de963b978f864ee8c98fe0e63188c0c90d" }
});

Vue.prototype.$api.interceptors.request.use(function(config) {
    if (store.state.connexionToken) {
        config.params.token = store.state.connexionToken
    }
    return config
});

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')