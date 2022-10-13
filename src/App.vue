<template>
    <the-topbar @mapToBuryatia="showBuryatia" @shareModal="shareModal = true" v-model:districts="showDistricts" />
    <teleport to="body">
        <app-message />
        <app-modal v-model:open="shareModal" scrollable centered size="lg">
            <template #header>
                <h5 class="custom-modal__title">Поделиться картой</h5>
            </template>
            <template #default="{ close }">
                <div class="modal-share">
                    <div class="modal-share__field">
                        {{ shareLink }}
                    </div>
                    <div class="modal-share__btn" @click="copyShareLink(), close()">
                        Скопировать ссылку <i class="fa fa-clone" aria-hidden="true"></i>
                    </div>
                </div>
            </template>
        </app-modal>
        <app-modal v-model:open="selectMapModal" centered>
            <template #header>
                <h5 class="custom-modal__title">Выбрать карту</h5>
            </template>
            <template #default>
                <ul class="select-map">
                    <li
                        class="select-map-item"
                        @click="setActiveLayer(item)"
                        v-for="item in tileLayers"
                        :key="item"
                        v-bind:class="[activeLayer.name == item.name ? 'active' : '']"
                    >
                        {{ item.name }}
                    </li>
                    <li
                        class="select-map-item"
                        v-bind:class="{ active: showDistricts }"
                        @click="showDistricts = !showDistricts"
                    >
                        Районы
                    </li>
                </ul>
            </template>
        </app-modal>
    </teleport>

    <div class="row g-0 h-100">
        <div class="col-auto">
            <div class="panels">
                <div class="panels__item">
                    <the-navbar
                        v-model:showFilterPanel="showFilterPanel"
                        v-model:showSearchPanel="showSearchPanel"
                        @mapToBuryatia="showBuryatia"
                        @shareModal="shareModal = true"
                        @selectMapModal="selectMapModal = true"
                    />
                </div>
                <div class="panels__item">
                    <filter-panel
                        v-model:showFilterPanel="showFilterPanel"
                        v-model:showSearchPanel="showSearchPanel"
                        v-model:activeObject="activeObject"
                        v-model:filteredObjects="filteredObjects"
                        :districts="allDistricts"
                        :allObjects="allObjects"
                        @selectObject="showObjectInfo"
                    />
                </div>
                <div class="panels__item">
                    <object-details v-model:activeObject="activeObject" />
                </div>
            </div>
        </div>
        <div class="col">
            <the-map
                :markers="filteredObjects"
                :districts="allDistricts"
                :showDistricts="showDistricts"
                v-model:zoom="zoom"
                v-model:center="center"
                @selectObject="showObjectInfo"
            />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppModal from './components/ui/AppModal'
import AppMessage from './components/ui/AppMessage'
import TheTopbar from './components/TheTopbar'
import TheNavbar from './components/TheNavbar'
import TheMap from './components/TheMap'
import FilterPanel from './components/FilterPanel.vue'
import ObjectDetails from './components/ObjectDetails.vue'

export default {
    name: 'App',
    components: {
        AppModal,
        AppMessage,
        TheTopbar,
        TheNavbar,
        FilterPanel,
        ObjectDetails,
        TheMap,
    },
    data() {
        return {
            showFilterPanel: false,
            showSearchPanel: false,
            shareModal: false,
            selectMapModal: false,
            filteredObjects: [],
            activeObject: null,

            tileLayers: [
                {
                    name: 'Схема',
                    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    subdomains: ['a', 'b', 'c'],
                },
                // {
                //     name: 'Схема',
                //     url: 'https://api.mapbox.com/styles/v1/investmapbur/ckrbvfgm10xfu17o58y6iv5vn/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaW52ZXN0bWFwYnVyIiwiYSI6ImNrcmJ1MXhyMjBlZm0zMHBlY3dxZ2N0cm0ifQ.zHcxNLF7KSfDvDCtM963Iw',
                //     subdomains: [],
                // },
                {
                    name: 'Спутник',
                    url: 'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
                    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                },
                {
                    name: 'Гибрид',
                    url: 'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
                    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                },
            ],

            zoom: 6,
            showDistricts: true,
            center: [53.328248, 108.837283],
        }
    },

    computed: {
        ...mapGetters(['allDistricts', 'allObjects', 'layers', 'activeLayer']),

        shareLink() {
            if (this.activeObject) {
                return `${window.location.host}${location.pathname}?object=${this.activeObject.id}`
            }

            if (this.center[0] && this.center[1]) {
                return `${window.location.host}${location.pathname}?zoom=${this.zoom}&lat=${this.center[0]}&lng=${this.center[1]}`
            } else {
                return `${window.location.host}${location.pathname}?zoom=${this.zoom}&lat=${this.center.lat}&lng=${this.center.lng}`
            }
        },
    },

    methods: {
        ...mapActions(['setMessage', 'setActiveLayer', 'fetchDistricts', 'fetchObjects']),

        copyShareLink() {
            try {
                navigator.clipboard.writeText(this.shareLink)

                this.setMessage({
                    text: 'Ссылка скопирована.',
                    type: 'success',
                })
            } catch (e) {
                this.setMessage({
                    text: 'Ошибка ' + e.name + ':' + e.message,
                    type: 'danger',
                })
            }
        },

        showBuryatia() {
            this.zoom = 6
            this.center = [53.328248, 108.837283]
        },

        showObjectInfo(item) {
            this.activeObject = item
            this.zoom = 16

            setTimeout(() => {
                if (Array.isArray(item.coords[0])) {
                    // todo: polygonCenter на этой странице нет
                    // this.center = [...this.polygonCenter(item['coords'])]
                } else {
                    this.center = [...item['coords']]
                }
                this.zoom = 18
            }, 1)
        },

        freeCategory(category_id) {
            return this.allObjects.filter((item) => {
                return category_id == item.category.id
            })
        },
    },

    watch: {
        activeObject(val, oldVal) {
            if (!val && oldVal) {
                this.zoom = 11
                setTimeout(() => {
                    if (Array.isArray(oldVal.coords[0])) {
                        // todo: polygonCenter на этой странице нет
                        // this.center = [...this.polygonCenter(oldVal['coords'])]
                    } else {
                        this.center = [...oldVal['coords']]
                    }

                    this.zoom = 8
                }, 1)
            }
        },
    },

    async mounted() {
        await this.fetchDistricts()
        await this.fetchObjects()

        let urlParams = new URLSearchParams(window.location.search)
        if (urlParams.has('object')) {
            let id = urlParams.get('object')
            let obj = this.allObjects.find((item) => {
                return item.id == id
            })

            this.showObjectInfo(obj)
        }

        if (urlParams.has('zoom') && urlParams.has('lat') && urlParams.has('lng')) {
            let zoom = urlParams.get('zoom')
            let lat = urlParams.get('lat')
            let lng = urlParams.get('lng')
            this.zoom = +zoom
            this.center = [lat, lng]
        }

        if (window.innerWidth >= 992) {
            this.showFilterPanel = true
        }
    },
}
</script>

<style lang="scss" scoped>
.panels {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    top: 0;
    left: 0;
    margin: 0;
    z-index: 1000;

    a {
        text-decoration: none;
    }

    &__item {
        flex: 0 0 auto;
        width: auto;
        max-width: 100%;
    }
}
</style>
