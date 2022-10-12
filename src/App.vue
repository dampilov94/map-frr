<template>
    <div id="invest-map">
        <the-topbar
            @mapToBuryatia="showBuryatia"
            :layers="tileLayers"
            @shareModal="shareModal = true"
            v-model:activeLayer="activeTileLayer"
            v-model:districts="showDistricts"
        />
        <teleport to="body">
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
                            @click="activeTileLayer = item"
                            v-for="(item, index) in tileLayers"
                            :key="index"
                            v-bind:class="[activeTileLayer == item ? 'active' : '']"
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

        <div class="position-fixed top-0 end-0 p-3" style="z-index: 999999">
            <div
                id="liveToast"
                class="toast align-items-center text-white bg-success border-0"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div class="d-flex">
                    <div class="toast-body">Ссылка скопирована.</div>
                    <button
                        type="button"
                        class="btn-close btn-close-white me-2 m-auto"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                    ></button>
                </div>
            </div>
        </div>

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
                    :showDistricts="showDistricts"
                    :activeLayer="activeTileLayer"
                    v-model:zoom="zoom"
                    v-model:center="center"
                />
            </div>
        </div>
    </div>
</template>

<script>
// [] Вынести компоненты
// [] Переписать код

import { mapGetters, mapActions } from 'vuex'

import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'

import AppModal from './components/ui/AppModal'
import TheTopbar from './components/TheTopbar'
import TheNavbar from './components/TheNavbar'
import TheMap from './components/TheMap'
import FilterPanel from './components/FilterPanel.vue'
import ObjectDetails from './components/ObjectDetails.vue'

export default {
    name: 'App',
    components: {
        AppModal,
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

            activeTileLayer: null,
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
        ...mapGetters(['allDistricts', 'allObjects']),

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
        ...mapActions(['fetchDistricts', 'fetchObjects']),

        showToast(id) {
            const toastLive = document.getElementById(id)
            const toast = new bootstrap.Toast(toastLive)

            toast.show()
        },

        copyShareLink() {
            try {
                navigator.clipboard.writeText(this.shareLink)
                this.showToast('liveToast')
            } catch (e) {
                console.log('Ошибка ' + e.name + ':' + e.message + '\n' + e.stack)
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
                    this.center = [...this.polygonCenter(item['coords'])]
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

        poligonReqFormat(polygon) {
            let reqFormat = []
            polygon[0].forEach((element) => {
                reqFormat.push([element['latitude'], element['longitude']])
            })

            return reqFormat
        },

        polygonCenter(polygon) {
            let reqFormat = this.poligonReqFormat(polygon)
            let polygonLength = reqFormat.length
            let polygonPoints = reqFormat || []

            let x = 0,
                y = 0,
                area = 0,
                i,
                j,
                f,
                point1,
                point2

            for (i = 0, j = polygonLength - 1; i < polygonLength; j = i, i += 1) {
                point1 = polygonPoints[i]
                point2 = polygonPoints[j]
                f = point1[0] * point2[1] - point2[0] * point1[1]

                x += (point1[0] + point2[0]) * f
                y += (point1[1] + point2[1]) * f

                area += point1[0] * point2[1]
                area -= point1[1] * point2[0]
            }

            area /= 2

            f = area * 6

            return [x / f, y / f]
        },
    },

    watch: {
        activeObject(val, oldVal) {
            if (!val && oldVal) {
                this.zoom = 11
                setTimeout(() => {
                    if (Array.isArray(oldVal.coords[0])) {
                        this.center = [...this.polygonCenter(oldVal['coords'])]
                    } else {
                        this.center = [...oldVal['coords']]
                    }

                    this.zoom = 8
                }, 1)
            }
        },
    },

    created: function () {
        this.activeTileLayer = this.tileLayers[0]
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
