<template>
    <div id="invest-map">
        <div id="modal-1" class="modal custom-modal" tabindex="-1">
            <div class="modal-dialog modal-dialog-scrollable modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="custom-modal__title">Полная информация об объекте</h5>
                        <div class="custom-modal__header-btn" @click="callPrint()">
                            <i class="fa fa-print" aria-hidden="true"></i>
                        </div>
                        <div class="custom-modal__header-btn" @click="hideModal('modal-1')">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div id="print-content" v-if="activeObject">
                            <table
                                border="1"
                                style="text-align: left; border-collapse: collapse"
                                class="table table-bordered"
                            >
                                <tbody>
                                    <tr v-if="activeObject['category']['name']">
                                        <th>Категория</th>
                                        <td>{{ activeObject['category']['name'] }}</td>
                                    </tr>
                                    <tr v-if="activeObject['typeObject']">
                                        <th>Тип объекта</th>
                                        <td>{{ activeObject['typeObject'] }}</td>
                                    </tr>
                                    <tr v-if="activeObject['title']">
                                        <th>Название</th>
                                        <td>{{ activeObject['title'] }}</td>
                                    </tr>
                                    <tr v-if="activeObject['landCategory']">
                                        <th>Категория земель</th>
                                        <td>{{ getLangCategory(activeObject['landCategory']) }}</td>
                                    </tr>
                                    <tr v-if="activeObject['landTenure']">
                                        <th>Вид права владения землей</th>
                                        <td>{{ activeObject['landTenure'] }}</td>
                                    </tr>
                                    <tr v-if="activeObject['municipalArea']">
                                        <th>Муниципальное образование</th>
                                        <td>{{ getMunicipalArea(activeObject['municipalArea']) }}</td>
                                    </tr>
                                    <tr v-if="activeObject['owner']">
                                        <th>Собственник</th>
                                        <td>{{ activeObject['owner'] }}</td>
                                    </tr>
                                    <tr v-if="activeObject['typeOfOwnership']['title']">
                                        <th>Форма собственности</th>
                                        <td>{{ activeObject['typeOfOwnership']['title'] }}</td>
                                    </tr>
                                    <tr v-if="activeObject['specialPurpose']">
                                        <th>
                                            Целевое (приоритетное) назначение земельного участка, имеющиеся ограничения
                                            использования
                                        </th>
                                        <td>{{ activeObject['specialPurpose'] }}</td>
                                    </tr>
                                    <tr v-if="activeObject['area']">
                                        <th>Общая площадь(га)</th>
                                        <td>{{ activeObject['area'] }}</td>
                                    </tr>
                                    <tr v-if="activeObject['free_area']">
                                        <th>Свободная площадь(га)</th>
                                        <td>{{ activeObject['free_area'] }}</td>
                                    </tr>
                                    <tr v-if="activeObject['cadastralNumber']">
                                        <th>Кадастровый номер земельного участка</th>
                                        <td>{{ activeObject['cadastralNumber'] }}</td>
                                    </tr>
                                    <tr v-if="activeObject['expandability']">
                                        <th>Возможность расширения</th>
                                        <td v-if="activeObject['expandability']">Да</td>
                                        <td v-else>Нет</td>
                                    </tr>
                                    <tr>
                                        <th>Газоснабжение</th>
                                        <td v-if="activeObject['gasSupply']">
                                            {{ activeObject['gasSupply'] }}
                                        </td>
                                        <td v-else>-</td>
                                    </tr>
                                    <tr>
                                        <th>Теплоснабжение</th>
                                        <td v-if="activeObject['heatSupply']">
                                            {{ activeObject['heatSupply'] }}
                                        </td>
                                        <td v-else>-</td>
                                    </tr>
                                    <tr>
                                        <th>Электроснабжение</th>
                                        <td v-if="activeObject['powerSupply']">
                                            {{ activeObject['powerSupply'] }}
                                        </td>
                                        <td v-else>-</td>
                                    </tr>
                                    <tr>
                                        <th>Водоснабжение</th>
                                        <td v-if="activeObject['waterSupply']">
                                            {{ activeObject['waterSupply'] }}
                                        </td>
                                        <td v-else>-</td>
                                    </tr>
                                    <tr>
                                        <th>Водоотведение</th>
                                        <td v-if="activeObject['waterDisposal']">
                                            {{ activeObject['waterDisposal'] }}
                                        </td>
                                        <td v-else>-</td>
                                    </tr>
                                    <tr v-if="activeObject['transportInfrastructureAvailability']">
                                        <th>Наличие транспортной инфраструктуры</th>
                                        <td>{{ activeObject['transportInfrastructureAvailability'] }}</td>
                                    </tr>

                                    <tr v-if="activeObject['privileges']">
                                        <th>Льготы и преференции</th>
                                        <td>{{ activeObject['privileges'] }}</td>
                                    </tr>

                                    <tr v-if="activeObject['provisionTerms']">
                                        <th>Условия предоставления инвестору</th>
                                        <td>{{ activeObject['provisionTerms'] }}</td>
                                    </tr>
                                    <tr v-if="activeObject['dopInfo']">
                                        <th>Дополнительная информация</th>
                                        <td v-html="activeObject['dopInfo']"></td>
                                    </tr>
                                    <tr v-if="activeObject['contact']">
                                        <th>Контактное лицо</th>
                                        <td>{{ activeObject['contact'] }}</td>
                                    </tr>
                                    <tr v-if="activeObject['phone']">
                                        <th>Телефон</th>
                                        <td>{{ activeObject['phone'] }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="modal-share-new" class="modal custom-modal modal-share">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="custom-modal__title">Поделиться картой</h5>
                        <div class="custom-modal__header-btn" @click="hideModal('modal-share-new')">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div class="modal-share__field">
                            {{ shareLink }}
                        </div>
                        <div class="modal-share__btn" @click="copyShareLink(), hideModal('modal-share-new')">
                            Скопировать ссылку <i class="fa fa-clone" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="modal-select-map" class="modal custom-modal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="custom-modal__title">Выбрать карту</h5>

                        <div class="custom-modal__header-btn" @click="hideModal('modal-select-map')">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div class="modal-body">
                        <ul class="select-map">
                            <li
                                class="select-map-item"
                                @click="setActiveTileLayer(item)"
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
                    </div>
                </div>
            </div>
        </div>

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

        <l-map
            style="height: 100%; width: 100%"
            :zoom="zoom"
            :center="center"
            @update:zoom="zoomUpdated"
            @update:center="centerUpdated"
            @click="handleMapClick"
            :noBlockingAnimations="true"
            :options="{ zoomControl: false }"
        >
            <l-tile-layer
                v-if="activeTileLayer"
                :url="activeTileLayer.url"
                :subdomains="activeTileLayer.subdomains"
            ></l-tile-layer>
            <l-control-zoom position="topright"></l-control-zoom>

            <v-marker-cluster>
                <div v-for="item in findObjects" :key="item.id">
                    <div v-if="Array.isArray(item.coords[0])">
                        <l-polygon
                            :lat-lngs="poligonReqFormat(item['coords'])"
                            :fillOpacity="0.2"
                            :weight="3"
                            color="#29d321"
                            fillColor="#29d321"
                            :visible="item == activeObject ? true : false"
                        >
                            <l-popup :content="item['title']" />
                        </l-polygon>
                        <l-marker :lat-lng="polygonCenter(item['coords'])" @click="showObjectInfo(item)">
                            <l-icon :icon-size="iconSize" class-name="icon-base">
                                <img
                                    :src="
                                        item['category']['img']
                                            ? 'https://invest-buryatia.ru' + item['category']['img']
                                            : getIcon(item['category']['type'])
                                    "
                                />
                            </l-icon>
                        </l-marker>
                    </div>
                    <div v-else>
                        <l-marker
                            v-if="item['coords'].length == 2"
                            :lat-lng="item['coords']"
                            @click="showObjectInfo(item)"
                        >
                            <l-icon :icon-size="iconSize" class-name="icon-base">
                                <img
                                    :src="
                                        item['category']['img']
                                            ? 'https://invest-buryatia.ru/' + item['category']['img']
                                            : getIcon(item['category']['type'])
                                    "
                                />
                            </l-icon>
                        </l-marker>
                    </div>
                </div>
            </v-marker-cluster>

            <!-- Полигоны районов -->
            <div v-if="showDistricts">
                <l-polygon
                    v-for="item in allDistricts"
                    :key="item.id"
                    :lat-lngs="item['geometry']['coordinates']"
                    :fillOpacity="0"
                    @click="focusedDistrict = item.id"
                    :weight="item.id == focusedDistrict ? 3 : 1"
                >
                    <l-popup :content="item.name" />
                </l-polygon>
            </div>
        </l-map>

        <div class="panels">
            <div class="panels__item">
                <div class="nav-desktop" v-show="!showFilterPanel">
                    <div class="nav-desktop__logo">
                        <img src="./assets/img/logo-mini.png" class="img-fluid" alt="" />
                    </div>
                    <div class="nav-desktop__item" @click="showFilterPanel = true">
                        <i class="fa fa-search" aria-hidden="true"></i>
                    </div>
                    <div class="nav-desktop__item" @click="showFilterPanel = true">
                        <i class="fa fa-sliders" aria-hidden="true"></i>
                    </div>
                    <div class="nav-desktop__toggler" @click="showFilterPanel = true">
                        <i class="fa fa-chevron-right" aria-hidden="true"></i>
                    </div>
                </div>
                <div class="nav-mobile" v-show="!showFilterPanel && !showSearchPanel">
                    <nav class="navbar navbar-light bg-light navbar-expand">
                        <div class="navbar-nav w-100 justify-content-between">
                            <li class="nav-item">
                                <a class="nav-link" @click.prevent="showFilterPanel = true">
                                    <i class="fa fa-sliders" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" @click.prevent="showSearchPanel = true">
                                    <i class="fa fa-search" aria-hidden="true"></i>
                                </a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" @click.prevent="showModal('modal-share-new')" target="_self"
                                    ><i class="fa fa-share" aria-hidden="true"></i
                                ></a>
                            </li>
                            <li class="nav-item dropdown dropup">
                                <a
                                    class="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i class="fa fa-list" aria-hidden="true"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <a class="dropdown-item" href="https://invest-buryatia.ru/" target="_blank"
                                            >Инвестиционный портал
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#" @click.prevent="showBuryatia()"
                                            >К республике Бурятия
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#" @click.prevent="showModal('modal-select-map')"
                                            >Выбрать карту
                                        </a>
                                    </li>
                                    <li><a class="dropdown-item" href="#">Изменить язык</a></li>
                                </ul>
                            </li>
                        </div>
                    </nav>
                </div>
            </div>
            <div class="panels__item">
                <div class="filter-panel" v-show="showFilterPanel">
                    <div class="filter-panel__header">
                        <div class="form-row mb-4 mb-lg-5">
                            <div class="col my-auto">
                                <a href="/index1.php">
                                    <img src="./assets/logo.png" alt="" class="filter-panel__logo d-none d-lg-block" />
                                </a>
                            </div>
                            <div class="col-auto">
                                <div class="filter-panel__close d-none d-lg-flex" @click="showFilterPanel = false">
                                    <img src="./assets/sidebar/arrow-left.png" alt="" />
                                </div>
                                <button class="filter-panel__btn d-lg-none" @click="showFilterPanel = false">
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
                            <!-- <v-select
                                :options="formatingToOptions(allDistricts, 'name', 'id')"
                                @select="selectedDistrict = $event"
                                :selected="selectedDistrict.name"
                                :nullOption="{ name: 'Все районы', value: null }"
                            /> -->
                        </div>
                    </div>

                    <div class="search-results" v-if="inputSearch">
                        <div class="search-results__text">
                            {{ searchResultsText }}
                        </div>
                        <div class="filter-panel__body search-body custom-scroll">
                            <div
                                class="search-result"
                                v-for="item in searchResults"
                                :key="item.id"
                                @click="showObjectInfo(item)"
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
                            <div class="accordion-item mb-3" v-for="item in allCategoryGroup" :key="item.id">
                                <a data-bs-toggle="collapse" :href="'#accordion-' + item.id" class="accordion-btn">
                                    <label class="checkbox-btn" v-on:click.stop>
                                        <input type="checkbox" :value="item.id" v-model="checkedCategoriesGroups" />
                                        <div class="checkbox-btn__cont"></div>
                                    </label>
                                    {{ item.name }}
                                    <div class="accordion-btn__count">{{ countOfCategoryGroup(item.id) }}</div>
                                </a>
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
                                                <!-- todo: Не работает -->
                                                <vue-slider
                                                    v-model="area"
                                                    :min="areaMarks[0]"
                                                    :max="areaMarks[1]"
                                                    :tooltip="'always'"
                                                    :lazy="true"
                                                    :height="10"
                                                    :tooltip-placement="'bottom'"
                                                    :dot-size="[30, 30]"
                                                ></vue-slider>
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
                                        <!-- <div class="form-group">
                                            <label>До Улан-Удэ (км)</label>
                                            <div class="filter-slider">
                                                <vue-slider
                                                    v-model="distances"
                                                    :min="distancesMarks[0]"
                                                    :max="distancesMarks[1]"
                                                    :tooltip="'always'"
                                                    :lazy="true"
                                                    :height="10"
                                                    :tooltip-placement="'bottom'"
                                                    :dot-size="[30, 30]"
                                                ></vue-slider>
                                            </div>
                                        </div> -->
                                        <div class="form-group">
                                            <label class="category-checkbox" v-for="ch in item.child" :key="ch.id">
                                                <input
                                                    type="checkbox"
                                                    :value="ch.id"
                                                    v-model="checkedChildCategories"
                                                />
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
                                            <div class="free-category-item" @click="showObjectInfo(obj)">
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
                        @click=";(activeObject = null), (inputSearch = ''), (showSearchPanel = false)"
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
                                @click="showObjectInfo(item), hideCollapse('search-panel-body')"
                                v-bind:class="[activeObject == item ? 'active' : '']"
                            >
                                <div class="search-result__category">{{ item['category']['name'] }}</div>
                                <div class="search-result__title">{{ item['title'] }}</div>
                                <div class="search-result__address">{{ item['address'] }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panels__item">
                <div class="object-card-prev" v-if="activeObject">
                    <div class="object-card-prev__btn" @click="fullscreenObject = true">
                        <i class="fa fa-arrows-alt" aria-hidden="true"></i>
                    </div>
                    <div class="object-card-prev__category">{{ activeObject['category']['name'] }}</div>
                    <div class="object-card-prev__title">{{ activeObject['title'] }}</div>
                    <div class="object-card-prev__address">{{ activeObject['address'] }}</div>
                </div>

                <div
                    class="object-card custom-scroll"
                    v-bind:class="{ fullscreen: fullscreenObject }"
                    v-if="activeObject"
                >
                    <div class="object-card__category">
                        {{ activeObject['category']['name'] }}
                    </div>
                    <a href="#" class="object-card__close" @click.prevent="closeObjectInfo(activeObject)">
                        <img src="./assets/img/card/close-line.png" alt="" />
                    </a>

                    <div class="object-card__gallery">
                        <div class="card-gallery" v-if="activeObject['photos']">
                            <div class="card-gallery__main">
                                <a :href="activeObject['photos'][0]" data-fancybox="gallery">
                                    <img :src="activeObject['photos'][0]" alt="" />
                                </a>
                            </div>
                            <div class="card-gallery__thumbs">
                                <div class="form-row">
                                    <div
                                        class="col-3"
                                        v-for="(item, index) in activeObject['photos']"
                                        :key="index"
                                        v-show="index != 0"
                                    >
                                        <a :href="item" data-fancybox="gallery" v-if="index != 0">
                                            <img :src="item" alt="" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="object-card__name">
                        {{ activeObject['title'] }}
                    </div>
                    <div class="object-card__typearea card-data-block">
                        <span class="card-badge">
                            {{ activeObject['typeArea'] }}
                        </span>
                    </div>
                    <div class="form-row">
                        <div class="col-6">
                            <div class="card-data-block">
                                <div class="card-data-block__title">Общая площадь(га)</div>
                                <div class="card-data-block__text">
                                    {{ activeObject['area'] }}
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="card-data-block">
                                <div class="card-data-block__title">Свободная площадь(га)</div>
                                <div class="card-data-block__text">
                                    {{ activeObject['free_area'] }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-6">
                            <div class="card-data-block">
                                <div class="card-data-block__title">Адрес:</div>
                                <div class="card-data-block__text">
                                    {{ activeObject['address'] }}
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="card-data-block">
                                <div class="card-data-block__title">Кадастровый номер</div>
                                <div class="card-data-block__text">
                                    {{ activeObject['cadastralNumber'] }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card-data-block object-card__icons">
                        <div
                            class="prop-icon"
                            title="Электричество"
                            v-bind:class="{ has: activeObject['powerSupply'] }"
                        >
                            <img src="./assets/img/card/light.png" alt="" />
                        </div>
                        <div class="prop-icon" title="Газ" v-bind:class="{ has: activeObject['gasSupply'] }">
                            <img src="./assets/img/card/gas.png" alt="" />
                        </div>
                        <div
                            class="prop-icon"
                            title="Водоснабжение"
                            v-bind:class="{ has: activeObject['waterSupply'] }"
                        >
                            <img src="./assets/img/card/water.png" alt="" />
                        </div>
                        <!-- вместо транспорт инет -->
                        <div
                            class="prop-icon"
                            title="Интернет"
                            v-bind:class="{ has: activeObject['transportInfrastructureAvailability'] }"
                        >
                            <img src="./assets/img/card/enet.png" alt="" />
                        </div>

                        <div
                            class="prop-icon"
                            title="Водоотведение"
                            v-bind:class="{ has: activeObject['waterDisposal'] }"
                        >
                            <img src="./assets/img/card/water-out.png" alt="" />
                        </div>
                        <div
                            class="prop-icon"
                            title="Теплоснабжение"
                            v-bind:class="{ has: activeObject['heatSupply'] }"
                        >
                            <img src="./assets/img/card/heating.png" alt="" />
                        </div>
                    </div>

                    <div class="card-data-block">
                        <div class="card-data-block__title">Категория земель</div>
                        <div class="card-data-block__text">
                            {{ getLangCategory(activeObject['landCategory']) }}
                        </div>
                    </div>
                    <div class="card-data-block">
                        <div class="card-data-block__title">Форма собственности</div>
                        <div class="card-data-block__text">
                            {{ activeObject['typeOfOwnership']['title'] }}
                        </div>
                    </div>
                    <div class="card-data-block" v-if="activeObject['manager']['name']">
                        <div class="card-data-block__title">Контактное лицо</div>
                        <div class="card-manager">
                            <div class="form-row">
                                <div class="col-auto my-auto">
                                    <div class="card-manager__image">
                                        <img :src="activeObject['manager']['photo']" class="img-fluid" />
                                    </div>
                                </div>
                                <div class="col my-auto">
                                    <div class="card-data-block__title">{{ activeObject['manager']['dolg'] }}</div>
                                    <div class="card-data-block__text mb-2">
                                        {{ activeObject['manager']['name'] }}
                                    </div>
                                    <a
                                        :href="`tel:${del_spaces(activeObject.manager.phone)}`"
                                        class="card-data-block__text"
                                    >
                                        <i class="fa fa-phone" aria-hidden="true"></i>
                                        {{ activeObject['manager']['phone'] }}
                                    </a>
                                    <a
                                        :href="`mailto:${activeObject['manager']['email']}`"
                                        class="card-data-block__text"
                                    >
                                        <i class="fa fa-envelope" aria-hidden="true"></i
                                        >{{ activeObject['manager']['email'] }}
                                    </a>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="card-data-block__text">
                            {{ activeObject['contact'] }}
                        </div>
                        <div class="card-data-block__phone">
                            {{ activeObject['phone'] }}
                        </div> -->
                    </div>

                    <div class="card-data-block" v-if="activeObject['privileges']">
                        <div class="card-data-block__title">Льготы и преференции</div>
                        <div class="card-data-block__text">
                            {{ activeObject['privileges'] }}
                        </div>
                    </div>

                    <div class="card-data-block">
                        <div class="card-data-block__title">Дополнительная информация</div>
                        <div class="card-data-block__text" v-html="activeObject['dopInfo']"></div>
                    </div>

                    <div v-html-js="{ html: b24form }"></div>

                    <div @click="showModal('modal-1')" class="object-card__btn">
                        <span> Показать полную информацию </span>
                    </div>
                </div>
            </div>
        </div>

        <div class="top-panel">
            <div class="top-panel-item" title="Инвестиционный портал">
                <a href="https://invest-buryatia.ru/" class="top-panel__btn show-site" target="_blank"></a>
            </div>
            <div class="top-panel-item" title="К Республике Бурятия">
                <button class="top-panel__btn show-bur" @click="showBuryatia()"></button>
            </div>
            <div class="top-panel-item" title="Поделиться">
                <button class="top-panel__btn show-share" @click="showModal('modal-share-new')"></button>
            </div>
            <div class="top-panel-item" title="Выбрать карту">
                <button
                    class="top-panel__btn show-layers"
                    data-bs-toggle="collapse"
                    data-bs-target="#top-panel-collapse-1"
                ></button>

                <div class="top-panel-item__content">
                    <div class="collapse" id="top-panel-collapse-1">
                        <ul class="panel-list">
                            <li
                                class="panel-list-item"
                                @click="setActiveTileLayer(item)"
                                v-for="(item, index) in tileLayers"
                                :key="index"
                                v-bind:class="[activeTileLayer == item ? 'active' : '']"
                            >
                                {{ item.name }}
                            </li>
                            <li
                                class="panel-list-item"
                                v-bind:class="{ active: showDistricts }"
                                @click="showDistricts = !showDistricts"
                            >
                                Районы
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import './assets/styles/index.scss'
import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'
import { Fancybox } from '@fancyapps/ui/src/Fancybox/Fancybox.js'
import vSelect from './components/v-select'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'

// На замену
import { LMap, LTileLayer, LMarker, LIcon, LPolygon, LPopup, LControlZoom } from 'vue2-leaflet'
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'

export default {
    name: 'App',
    components: {
        vSelect,
        LMap,
        LTileLayer,
        LMarker,
        LIcon,
        LPolygon,
        LPopup,
        LControlZoom,
        VMarkerCluster: Vue2LeafletMarkerCluster,
    },
    data() {
        return {
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
            activeTileLayer: null,
            zoom: 6,
            showDistricts: true,
            focusedDistrict: null,
            center: [],
            centerBuryatia: [53.328248, 108.837283],
            bounds: null,
            iconSize: [40, 40],
            iconsMarker: {
                default: require('./assets/icons/land.png'),
                CATEGORY_76: require('./assets/icons/land.png'),
                CATEGORY_83: require('./assets/icons/building.png'),
                CATEGORY_57: require('./assets/icons/place.png'),
                CATEGORY_71: require('./assets/icons/place.png'),
            },

            activeObject: null,
            fullscreenObject: false,

            // Поля фильтров
            showFilterPanel: false,
            showSearchPanel: false,

            inputSearch: '',
            searchResults: [],
            searchResultsText: '',
            searchPanelBody: false,

            selectedDistrict: { name: 'Все районы', value: null },
            selectedLandCategories: { name: 'Категория земель', value: null },

            selectedTypeArea: null,

            areaMarks: [0, 1],
            area: [0, 0],

            selectedTypeOfOwnership: { name: 'Форма собственности', value: null },

            distancesMarks: [0, 1],
            distances: [0, 0],

            checkedChildCategories: [],
            checkedCategoriesGroups: [],
        }
    },
    methods: {
        ...mapActions([
            'fetchDistricts',
            'fetchLandCategories',
            'fetchTypeOfOwnership',
            'fetchCategoryGroup',
            'fetchObjects',
        ]),

        showModal(id) {
            const myModal = new bootstrap.Modal(document.getElementById(id))

            myModal.show()
        },

        hideModal(id) {
            const truck_modal = document.querySelector('#' + id)
            const modal = bootstrap.Modal.getInstance(truck_modal)
            modal.hide()
        },

        showToast(id) {
            const toastLive = document.getElementById(id)
            const toast = new bootstrap.Toast(toastLive)

            toast.show()
        },

        hideCollapse(id) {
            var myCollapse = document.getElementById(id)
            const bsCollapse = new bootstrap.Collapse(myCollapse)
            bsCollapse.hide()
        },

        zoomUpdated(zoom) {
            this.zoom = zoom
        },
        centerUpdated(center) {
            this.center = center
        },

        copyShareLink() {
            try {
                navigator.clipboard.writeText(this.shareLink)
                this.showToast('liveToast')
            } catch (e) {
                console.log('Ошибка ' + e.name + ':' + e.message + '\n' + e.stack)
            }
        },

        formatingToOptions(options, name, value) {
            let newArr = options.map((item) => {
                return { name: item[name], value: item[value] }
            })

            return newArr
        },

        showBuryatia() {
            this.zoom = 6
            // if (this.activeObject && !this.showFilterPanel) {
            //     this.center = [53.328248, 108.837283 - 6]
            //     return
            // }
            // if (this.activeObject && this.showFilterPanel) {
            //     this.center = [53.328248, 108.837283 - 8]
            //     this.zoom = 6
            //     return
            // }
            this.center = [53.328248, 108.837283]
        },

        callPrint() {
            let prtContent = document.getElementById('print-content')
            let WinPrint = window.open('', '', 'left=50,top=50,width=800,height=640,toolbar=0,scrollbars=1,status=0')
            WinPrint.document.write(prtContent.innerHTML)
            WinPrint.document.close()
            WinPrint.focus()
            WinPrint.print()
            WinPrint.close()
        },

        showObjectInfo(item) {
            this.activeObject = item
            this.zoom = 16

            setTimeout(() => {
                if (Array.isArray(item.coords[0])) {
                    this.center = this.offsetingCenter(this.polygonCenter(item['coords']))
                } else {
                    this.center = this.offsetingCenter(item['coords'])
                }
                this.zoom = 18
            }, 1)
        },

        closeObjectInfo(item) {
            this.activeObject = null
            this.fullscreenObject = false
            this.zoom = 11
            setTimeout(() => {
                if (Array.isArray(item.coords[0])) {
                    this.center = this.offsetingCenter(this.polygonCenter(item['coords']))
                } else {
                    this.center = this.offsetingCenter(item['coords'])
                }

                this.zoom = 8
            }, 1)
        },

        offsetingCenter(coord) {
            if (window.innerWidth < 992) {
                return coord
            }

            if (this.showFilterPanel) {
                return [coord[0], coord[1] - 0.002]
            }

            return [coord[0], coord[1] - 0.0015]
        },

        handleMapClick() {
            this.focusedDistrict = null
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

        getIcon(category_type) {
            if (!this.iconsMarker[category_type]) {
                return this.iconsMarker['default']
            } else {
                return this.iconsMarker[category_type]
            }
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

        setActiveTileLayer(item) {
            this.activeTileLayer = null

            setTimeout(() => {
                this.activeTileLayer = item
            }, 0)
        },

        getLangCategory(id) {
            let lcat = this.allLandCategories.find((item) => {
                return item.id == id
            })

            if (lcat) {
                return lcat.title
            } else {
                return '-'
            }
        },
        getMunicipalArea(id) {
            let ma = this.allDistricts.find((item) => {
                return item.id == +id
            })

            if (ma) {
                return ma.name
            } else {
                return '-'
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

        del_spaces: function (value) {
            if (!value) {
                return value
            }

            return value.replace(/\s/g, '')
        },

        resetFilterChildCategories() {
            console.log('this.checkedChildCategories', this.checkedChildCategories)
            this.checkedChildCategories = [undefined]
        },
    },
    computed: {
        ...mapGetters([
            'allDistricts',
            'allLandCategories',
            'allTypeOfOwnership',
            'allCategoryGroup',
            'allObjects',
            'b24form',
        ]),

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

    watch: {
        inputSearch: function () {
            this.searchResultsText = 'Ожидаю, когда вы закончите печатать...'
            this.debouncedSearch()
        },
    },

    created: function () {
        this.debouncedSearch = _.debounce(this.getSearchResults, 500)
        this.activeTileLayer = this.tileLayers[0]
        this.center = this.centerBuryatia
    },

    async mounted() {
        await this.fetchDistricts()
        await this.fetchLandCategories()
        await this.fetchTypeOfOwnership()
        await this.fetchCategoryGroup()
        await this.fetchObjects()

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
            this.zoomUpdated(+zoom)
            this.centerUpdated([lat, lng])
        }

        if (window.innerWidth >= 992) {
            this.showFilterPanel = true
        }

        // Fancybox
        Fancybox.bind('[data-fancybox]', {})
    },
}
</script>
