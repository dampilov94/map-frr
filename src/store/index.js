import { createStore as _createStore } from 'vuex'

import districts from './modules/districts'
import landCategories from './modules/land-categories'
import typeOfOwnership from './modules/type-of-ownership'
import objects from './modules/objects'
import categoryGroup from './modules/category-group'

export function createStore() {
    return _createStore({
        state: {
            b24form: `<script data-b24-form="click/6/web2kh" data-skip-moving="true"> (function(w,d,u){ var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/180000|0); var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h); })(window,document,'https://cdn-ru.bitrix24.ru/b12985966/crm/form/loader_6.js'); </script>
        <a href="#" class="d-block object-card__btn mb-3"><span>Проект заинтересовал</span></a>
        `,
        },
        mutations: {},
        actions: {},
        getters: {
            b24form(state) {
                return state.b24form
            },
        },
        modules: {
            districts,
            landCategories,
            typeOfOwnership,
            objects,
            categoryGroup,
        },
    })
}
