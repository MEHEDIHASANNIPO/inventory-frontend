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

/** Filepond Library */
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

import * as FilePond from 'filepond'
import vueFilePond from 'vue-filepond'

import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'

/** Vue Pagination Library */
import Vpagination from '@hennge/vue3-pagination';
import '@hennge/vue3-pagination/dist/vue3-pagination.css';

import App from './App.vue'
import router from './router'

/** Filepond Instance */
FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
)

const FilePondComponent = vueFilePond(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
)

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

/** Filepond */
app.component('FilePond', FilePondComponent)

/** Vue Pagination */
app.component('v-pagination', Vpagination)

app.mount('#app')
