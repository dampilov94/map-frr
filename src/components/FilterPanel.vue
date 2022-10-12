<template>
    <div class="filter-panel" v-show="showFilterPanel">
        <div class="filter-panel__header">
            <div class="row mb-4 mb-lg-5">
                <div class="col my-auto">
                    <a href="/index1.php">
                        <img src="./../assets/logo.png" alt="" class="filter-panel__logo d-none d-lg-block" />
                    </a>
                </div>
                <div class="col-auto">
                    <div class="filter-panel__close d-none d-lg-flex" @click="$emit('update:showFilterPanel', false)">
                        <img src="./../assets/sidebar/arrow-left.png" alt="" />
                    </div>
                    <button class="filter-panel__btn d-lg-none" @click="$emit('update:showFilterPanel', false)">
                        Применить фильтр
                    </button>
                </div>
            </div>
            <div class="form-group d-none d-lg-block">
                <input
                    type="search"
                    class="form-control custom-input"
                    v-model="inputSearch"
                    placeholder="Поиск объектов"
                />
            </div>
            <div class="form-group">
                <v-select
                    :options="formatingToOptions(districts, 'name', 'id')"
                    @select="selectedDistrict = $event"
                    :selected="selectedDistrict.name"
                    :nullOption="{ name: 'Все районы', value: null }"
                />
            </div>
        </div>

        <div class="search-results" v-if="inputSearch">
            <div class="search-results__text">
                {{ searchResultsText }}
            </div>
            <div class="filter-panel__body search-body custom-scroll">
                <div
                    class="search-result"
                    v-for="item in filteredObjects"
                    :key="item.id"
                    @click="$emit('selectObject', item)"
                    v-bind:class="[activeObject == item ? 'active' : '']"
                >
                    <div class="search-result__category">{{ item['category']['name'] }}</div>
                    <div class="search-result__title">{{ item['title'] }}</div>
                    <div class="search-result__address">{{ item['address'] }}</div>
                </div>
            </div>
        </div>

        <div class="filter-panel__body custom-scroll" v-else>
            <div class="accordion filter-accordion" id="filter-accordion">
                <div class="mb-3" v-for="item in allCategoryGroup" :key="item.id">
                    <div @click="showCollapse('accordion-' + item.id)" class="accordion-btn">
                        <label class="checkbox-btn" v-on:click.stop>
                            <input type="checkbox" :value="item.id" v-model="checkedCategoriesGroups" />
                            <div class="checkbox-btn__cont">
                                <i class="fa fa-map-o" aria-hidden="true"></i>
                            </div>
                        </label>
                        {{ item.name }}
                        <div class="accordion-btn__count">{{ countOfCategoryGroup(item.id) }}</div>
                    </div>
                    <div
                        class="collapse accordion-collapse show"
                        :id="'accordion-' + item.id"
                        data-bs-parent="#filter-accordion"
                    >
                        <div class="py-3" v-if="item.type == 'filter'">
                            <div class="form-group">
                                <v-select
                                    :options="formatingToOptions(allLandCategories, 'title', 'id')"
                                    @select="selectedLandCategories = $event"
                                    :selected="selectedLandCategories.name"
                                    :nullOption="{ name: 'Категория земель', value: null }"
                                />
                            </div>
                            <!-- <div class="form-group">
                                            <label>Тип</label>
                                            <div class="radio-bts">
                                                <div class="radio-bts__item">
                                                    <input
                                                        id="TypeArea-1"
                                                        type="radio"
                                                        :value="'greenfield'"
                                                        v-model="selectedTypeArea"
                                                    />
                                                    <label for="TypeArea-1">Greenfield</label>
                                                </div>
                                                <div class="radio-bts__item">
                                                    <input
                                                        id="TypeArea-2"
                                                        type="radio"
                                                        :value="'brownfield'"
                                                        v-model="selectedTypeArea"
                                                    />
                                                    <label for="TypeArea-2">Brownfield</label>
                                                </div>
                                            </div>
                                        </div> -->
                            <div class="form-group">
                                <label>Общая площадь(га)</label>
                                <div class="filter-slider">
                                    <Slider
                                        v-model="area"
                                        tooltipPosition="bottom"
                                        :min="areaMarks[0]"
                                        :max="areaMarks[1]"
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <v-select
                                    :options="formatingToOptions(allTypeOfOwnership, 'title', 'id')"
                                    @select="selectedTypeOfOwnership = $event"
                                    :selected="selectedTypeOfOwnership.name"
                                    :nullOption="{ name: 'Форма собственности', value: null }"
                                />
                            </div>
                            <div class="form-group">
                                <label>До Улан-Удэ (км)</label>
                                <div class="filter-slider">
                                    <Slider
                                        tooltipPosition="bottom"
                                        v-model="distances"
                                        :min="distancesMarks[0]"
                                        :max="distancesMarks[1]"
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="category-checkbox" v-for="ch in item.child" :key="ch.id">
                                    <input type="checkbox" :value="ch.id" v-model="checkedChildCategories" />
                                    <div class="category-checkbox__btn">
                                        <img
                                            :src="
                                                ch['img']
                                                    ? 'https://invest-buryatia.ru' + ch['img']
                                                    : getIcon(ch['type'])
                                            "
                                        />
                                    </div>
                                    <div class="category-checkbox__text">
                                        {{ ch.name }}
                                    </div>
                                    <div class="category-checkbox__count">
                                        {{ countOfCategory(ch.id) }}
                                    </div>
                                </label>
                            </div>
                            <button class="btn btn-light" @click="resetFilterChildCategories">
                                Сбросить фильтр категорий
                            </button>
                        </div>
                        <div class="py-3 px-2" v-else>
                            <div v-for="obj in freeCategory(item.child[0].id)" v-bind:key="obj.id">
                                <div class="free-category-item" @click="$emit('selectObject', obj)">
                                    {{ obj.title }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="search-panel" v-show="showSearchPanel">
        <div
            class="search-panel__close"
            @click="$emit('update:activeObject', null), (inputSearch = ''), $emit('update:showSearchPanel', false)"
        >
            <i class="fa fa-times" aria-hidden="true"></i>
        </div>
        <div class="search-panel__header">
            <input
                type="search"
                class="form-control custom-input search-panel__input"
                v-model="inputSearch"
                placeholder="Поиск объектов"
            />

            <div class="search-panel__nav" v-if="inputSearch">
                <div class="search-panel__text">
                    {{ searchResultsText }}
                </div>
                <a class="search-panel__nav-btn" data-bs-toggle="collapse" href="#search-panel-body">
                    <!-- todo: searchPanelBody не используется -->
                    <span v-if="searchPanelBody">Показать на карте</span>
                    <span v-else>Показать списком</span>
                </a>
            </div>
        </div>
        <div class="collapse" id="search-panel-body">
            <div class="search-panel__body custom-scroll">
                <div
                    class="search-result"
                    v-for="item in searchResults"
                    :key="item.id"
                    @click="$emit('selectObject', item), hideCollapse('search-panel-body')"
                    v-bind:class="[activeObject == item ? 'active' : '']"
                >
                    <div class="search-result__category">{{ item['category']['name'] }}</div>
                    <div class="search-result__title">{{ item['title'] }}</div>
                    <div class="search-result__address">{{ item['address'] }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import vSelect from './v-select'
import Slider from '@vueform/slider'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { mapGetters, mapActions } from 'vuex'

export default {
    emits: [
        'update:showFilterPanel',
        'update:showSearchPanel',
        'update:selectedDistrict',
        'update:activeObject',
        'update:filteredObjects',
        'selectObject',
    ],
    props: {
        showFilterPanel: Boolean,
        showSearchPanel: Boolean,
        districts: Array,
        allObjects: Array,
        filteredObjects: Array,
        activeObject: Object,
    },

    data() {
        return {
            inputSearch: '',
            searchResults: [],
            searchResultsText: '',
            searchPanelBody: false,

            checkedChildCategories: [],
            areaMarks: [0, 1],
            area: [0, 0],
            distancesMarks: [0, 1],
            distances: [0, 0],
            selectedDistrict: { name: 'Все районы', value: null },
            selectedLandCategories: { name: 'Категория земель', value: null },
            selectedTypeArea: null,
            selectedTypeOfOwnership: { name: 'Форма собственности', value: null },
            checkedCategoriesGroups: [],
            // todo: дубликат
            iconsMarker: {
                default: require('./../assets/icons/land.png'),
                CATEGORY_76: require('./../assets/icons/land.png'),
                CATEGORY_83: require('./../assets/icons/building.png'),
                CATEGORY_57: require('./../assets/icons/place.png'),
                CATEGORY_71: require('./../assets/icons/place.png'),
            },
        }
    },

    created: function () {
        this.debouncedSearch = _.debounce(this.getSearchResults, 500)
    },

    async mounted() {
        const myCollapsible = document.getElementById('search-panel-body')
        myCollapsible.addEventListener('shown.bs.collapse', () => {
            this.searchPanelBody = true
        })

        myCollapsible.addEventListener('hidden.bs.collapse', () => {
            this.searchPanelBody = false
        })

        await this.fetchCategoryGroup()
        await this.fetchTypeOfOwnership()

        let areaMax = 0
        let distanceMax = 0

        this.allObjects.forEach((item) => {
            if (+item.distanceToUU >= distanceMax) {
                distanceMax = +item.distanceToUU
            }
            if (+item.area >= areaMax) {
                areaMax = +item.area
            }

            // Все дочерние категории записываются в выбранные категории
            if (this.checkedChildCategories.indexOf(item.category.id) == -1) {
                this.checkedChildCategories.splice(this.checkedChildCategories.length, 1, item.category.id)
            }

            // Все родительние категории записываются в выбранные категории
            if (this.checkedCategoriesGroups.indexOf(item.category.parentId) == -1) {
                this.checkedCategoriesGroups.splice(this.checkedCategoriesGroups.length, 1, item.category.parentId)
            }
        })

        this.distancesMarks.splice(1, 1, distanceMax)
        this.areaMarks.splice(1, 1, areaMax)

        setTimeout(() => {
            this.distances.splice(1, 1, distanceMax)
            this.area.splice(1, 1, areaMax)
        }, 0)
    },

    computed: {
        ...mapGetters(['allCategoryGroup', 'allTypeOfOwnership', 'allLandCategories']),

        findObjects() {
            if (this.inputSearch) {
                return this.searchResults
            } else {
                return this.filteredByAll
            }
        },

        filteredObjectsByMainParams() {
            return this.allObjects.filter((item) => {
                return (
                    (item.municipalArea == this.selectedDistrict.value || this.selectedDistrict.value == null) && //Фильтер по району municipalArea
                    (item.landCategory == this.selectedLandCategories.value ||
                        this.selectedLandCategories.value == null) && // Фильтер по категории земель
                    //(item.typeArea.toLowerCase() == this.selectedTypeArea || this.selectedTypeArea == null) && // Фильтер по типу
                    +item.area.replace(',', '.') >= this.area[0] &&
                    +item.area.replace(',', '.') <= this.area[1] && // Фильтер по площади
                    item.distanceToUU >= this.distances[0] &&
                    item.distanceToUU <= this.distances[1] && // Фильтер по дистанции до уу
                    (item.typeOfOwnership.id == this.selectedTypeOfOwnership.value ||
                        this.selectedTypeOfOwnership.value == null) // Фильтер по форме собственности
                )
            })
        },

        filteredByCheckedChildCategories() {
            return this.filteredObjectsByMainParams.filter((item) => {
                return this.checkedChildCategories.indexOf(item.category.id) != -1
            })
        },

        filteredByAll() {
            return this.filteredByCheckedChildCategories.filter((item) => {
                return this.checkedCategoriesGroups.indexOf(item.category.parentId) != -1
            })
        },
    },

    methods: {
        ...mapActions(['fetchCategoryGroup', 'fetchTypeOfOwnership']),
        formatingToOptions(options, name, value) {
            let newArr = options.map((item) => {
                return { name: item[name], value: item[value] }
            })

            return newArr
        },

        // todo: дубликат
        getIcon(category_type) {
            if (!this.iconsMarker[category_type]) {
                return this.iconsMarker['default']
            } else {
                return this.iconsMarker[category_type]
            }
        },

        showCollapse(id) {
            var myCollapse = document.getElementById(id)
            const bsCollapse = new bootstrap.Collapse(myCollapse)
            bsCollapse.show()
        },

        hideCollapse(id) {
            var myCollapse = document.getElementById(id)
            const bsCollapse = new bootstrap.Collapse(myCollapse)
            bsCollapse.hide()
        },

        getSearchResults() {
            this.searchResults = []

            const search = this.inputSearch.toLowerCase()

            if (search) {
                this.allObjects.filter((item) => {
                    let item_as_str = JSON.stringify(item).toLowerCase()

                    if (item_as_str.indexOf(search) != -1) {
                        this.searchResults.push(item)
                    }
                })

                this.searchResultsText = `Найдено ${this.searchResults.length} объектов`
            }
        },

        countOfCategory(id) {
            let arrCategory = this.filteredObjectsByMainParams.filter((item) => {
                return +item.category.id == +id
            })

            return arrCategory.length
        },

        countOfCategoryGroup(id) {
            let arrCategory = this.filteredObjectsByMainParams.filter((item) => {
                return +item.category.parentId == +id
            })

            return arrCategory.length
        },

        resetFilterChildCategories() {
            this.checkedChildCategories = [undefined]
        },
    },

    watch: {
        inputSearch: function () {
            this.searchResultsText = 'Ожидаю, когда вы закончите печатать...'
            this.debouncedSearch()
        },

        findObjects(val) {
            this.$emit('update:filteredObjects', val)
        },
    },

    components: {
        vSelect,
        Slider,
    },
}
</script>
