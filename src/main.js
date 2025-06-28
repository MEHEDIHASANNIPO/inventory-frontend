import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

/** FontAwesome Library */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

/** VeeValidation Library */
import VeeValidatePlugin from '@/utilis/validation'

/** SweetAlert Library */
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

/** FontAwesome Icon */
library.add(fas, fab, far)
app.component('font-awesome-icon', FontAwesomeIcon)

/** VeeValidate Plugin */
app.use(VeeValidatePlugin)

/** SweetAlert */
app.use(VueSweetalert2, {
  confirmButtonColor: '#43b9b2',
  cancelButtonColor: '#f43f5e',
});

app.mount('#app')
