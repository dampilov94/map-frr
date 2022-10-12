<template>
    <div class="object-details" v-if="activeObject">
        <div class="object-card-prev">
            <div class="object-card-prev__btn" @click="fullscreenObject = true">
                <i class="fa fa-arrows-alt" aria-hidden="true"></i>
            </div>
            <div class="object-card-prev__category">{{ activeObject['category']['name'] }}</div>
            <div class="object-card-prev__title">{{ activeObject['title'] }}</div>
            <div class="object-card-prev__address">{{ activeObject['address'] }}</div>
        </div>

        <div class="object-card custom-scroll" v-bind:class="{ fullscreen: fullscreenObject }" v-if="activeObject">
            <div class="object-card__category">
                {{ activeObject['category']['name'] }}
            </div>
            <a href="#" class="object-card__close" @click.prevent="close()">
                <img src="./../assets/img/card/close-line.png" alt="" />
            </a>

            <div class="object-card__gallery">
                <div class="card-gallery" v-if="activeObject['photos']">
                    <div class="card-gallery__main">
                        <a :href="activeObject['photos'][0]" data-fancybox="gallery">
                            <img :src="activeObject['photos'][0]" alt="" />
                        </a>
                    </div>
                    <div class="card-gallery__thumbs">
                        <div class="row">
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
            <div class="row">
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
            <div class="row">
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
                <div class="prop-icon" title="Электричество" v-bind:class="{ has: activeObject['powerSupply'] }">
                    <img src="./../assets/img/card/light.png" alt="" />
                </div>
                <div class="prop-icon" title="Газ" v-bind:class="{ has: activeObject['gasSupply'] }">
                    <img src="./../assets/img/card/gas.png" alt="" />
                </div>
                <div class="prop-icon" title="Водоснабжение" v-bind:class="{ has: activeObject['waterSupply'] }">
                    <img src="./../assets/img/card/water.png" alt="" />
                </div>
                <!-- вместо транспорт инет -->
                <div
                    class="prop-icon"
                    title="Интернет"
                    v-bind:class="{ has: activeObject['transportInfrastructureAvailability'] }"
                >
                    <img src="./../assets/img/card/enet.png" alt="" />
                </div>

                <div class="prop-icon" title="Водоотведение" v-bind:class="{ has: activeObject['waterDisposal'] }">
                    <img src="./../assets/img/card/water-out.png" alt="" />
                </div>
                <div class="prop-icon" title="Теплоснабжение" v-bind:class="{ has: activeObject['heatSupply'] }">
                    <img src="./../assets/img/card/heating.png" alt="" />
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
                    <div class="row">
                        <div class="col-auto my-auto">
                            <div class="card-manager__image">
                                <img :src="activeObject['manager']['photo']" class="img-fluid" />
                            </div>
                        </div>
                        <div class="col my-auto">
                            <div class="card-data-block__title">
                                {{ activeObject['manager']['dolg'] }}
                            </div>
                            <div class="card-data-block__text mb-2">
                                {{ activeObject['manager']['name'] }}
                            </div>
                            <div v-if="activeObject.manager.phone">
                                <a
                                    :href="`tel:${activeObject.manager.phone.replace(/\s/g, '')}`"
                                    class="card-data-block__text"
                                >
                                    <i class="fa fa-phone" aria-hidden="true"></i>
                                    {{ activeObject['manager']['phone'] }}
                                </a>
                            </div>
                            <a :href="`mailto:${activeObject['manager']['email']}`" class="card-data-block__text">
                                <i class="fa fa-envelope" aria-hidden="true"></i>{{ activeObject['manager']['email'] }}
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

            <div @click="fullInfoModal = true" class="object-card__btn">
                <span> Показать полную информацию </span>
            </div>
        </div>
    </div>

    <teleport to="body">
        <app-modal v-model:open="fullInfoModal" scrollable size="lg">
            <template #header>
                <h5 class="custom-modal__title">Полная информация об объекте</h5>
                <div class="custom-modal__header-btn" @click="callPrint()">
                    <i class="fa fa-print" aria-hidden="true"></i>
                </div>
            </template>
            <template #default>
                <div id="print-content" v-if="activeObject">
                    <table border="1" style="text-align: left; border-collapse: collapse" class="table table-bordered">
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
            </template>
        </app-modal>
    </teleport>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppModal from './ui/AppModal'
import { Fancybox } from '@fancyapps/ui/src/Fancybox/Fancybox.js'

export default {
    emits: ['update:activeObject'],
    props: {
        activeObject: Object,
    },

    components: { AppModal },

    data() {
        return {
            fullInfoModal: false,
            fullscreenObject: false,
        }
    },

    async mounted() {
        await this.fetchLandCategories()

        Fancybox.bind('[data-fancybox]', {})
    },

    computed: {
        ...mapGetters(['allDistricts', 'allLandCategories']),
    },

    methods: {
        ...mapActions(['fetchLandCategories']),

        close() {
            this.$emit('update:activeObject', null)
            this.fullscreenObject = false
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

        callPrint() {
            let prtContent = document.getElementById('print-content')
            let WinPrint = window.open('', '', 'left=50,top=50,width=800,height=640,toolbar=0,scrollbars=1,status=0')
            WinPrint.document.write(prtContent.innerHTML)
            WinPrint.document.close()
            WinPrint.focus()
            WinPrint.print()
            WinPrint.close()
        },
    },
}
</script>
