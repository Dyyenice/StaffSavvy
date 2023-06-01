import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { aliases, fa } from 'vuetify/iconsets/fa'
import 'vuetify/styles'

import { createVuetify } from 'vuetify/lib/framework.mjs'

export default createVuetify(
 {
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
},
 }
)