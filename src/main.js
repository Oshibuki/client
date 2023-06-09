import { createApp } from 'vue'
import pinia from './stores'
import axios from './utils/httpClient'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'

// import.meta.globEager('./assets/js/*');


// import.meta.globEager('./assets/img/*');
// import.meta.globEager('./assets/sounds/*');

const app = createApp(App)
app.use(pinia)
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')

//jquery
import $ from 'jquery';
window.$ = $;
window.jQuery = $
//jquery-ui
import 'jquery-ui-dist/jquery-ui'
import 'jquery-ui-dist/jquery-ui.min.css'
//bootstrap3
import 'bootstrap3/dist/js/bootstrap.min.js'
//admin-lte
// import 'admin-lte/dist/js/adminlte.min.js'
import '@/assets/js/adminlte.js';
// //tooltipster
// import 'tooltipster/dist/js/tooltipster.bundle.min.js'
// import 'tooltipster/dist/css/tooltipster.bundle.min.css'
// import 'tooltipster/dist/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-borderless.min.css'
// //tooltipster-scrollabletip
// import 'tooltipster-scrollabletip/tooltipster-scrollableTip.min.js'
// //emojionearea
// import 'emojionearea/dist/emojionearea.min.js'
// import 'emojionearea/dist/emojionearea.min.css'

//确保adminlte导入在bootstrap后面
import.meta.globEager(['./assets/css/*','!./assets/css/AdminLTE.css']);
import './assets/css/AdminLTE.css'
