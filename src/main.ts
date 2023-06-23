import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
    faArrowUp, 
    faChevronUp, 
    faChevronDown, 
    faMagnifyingGlass, 
    faArrowDown, 
    faComment, 
    faCircleNotch,
    faRing,
    faMessage,
} from '@fortawesome/free-solid-svg-icons'

import type { Settings } from './models/settings';

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)

library.add(faMagnifyingGlass);
library.add(faChevronUp);
library.add(faChevronDown);
library.add(faArrowUp);
library.add(faArrowDown);
library.add(faComment);
library.add(faCircleNotch);
library.add(faRing);
library.add(faMessage);



// We add _settings to window
fetch('/settings.json').then((response) => {
    return response.json()
}).then((settings: Settings) => {
    window._settings = settings
    app.use(createPinia())
    app.use(router)
    app.mount('#app')
})





// We extend window to include _settings
declare global {
    interface Window {
        _settings: Settings,
    }
}
