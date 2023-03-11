<template>
  <div class="catalog">
    <div class="container">
      <h1 class="headline headline--first catalog__headline">Каталог</h1>
      <button class="btn filters-switcher btn--default" @click="filterOpened = !filterOpened">
        Фильтры
      </button>
      <div class="catalog-columns d-flex">
        <products-filter :class="{'opened': filterOpened}"></products-filter>
        <main class="content catalog__content">
          <div class="catalog-sort-panel d-flex ai-ctr jc-end">
            <span class="d-flex ai-ctr" @click="sort"><i class="catalog-sort-panel-icon" :class="{'catalog-sort-panel-icon--up': !sortData.desc}"></i><span>По цене</span></span>
          </div>
          <div class="catalog-list d-flex ai-fx-start f-wrap">
            <h2 class="headline headline--second" v-if="!sorted.length">Сожалеем, но таких котиков нет :(</h2>
            <router-link :to="`/catalog/${product.id}`" v-for="product in sorted" :key="product.id" class="catalog-list__item">
              <div class="catalog-list__item-img" :class="{'catalog-list__item-img--bordered': !product.img}" :style="product.img | imageBackgroundUrl">
              </div>
              <div class="catalog-list__item-content">
                <div class="catalog-list__item-title">
                  {{ product.title }}
                </div>
                <div class="catalog-list__item-price" :class="{'catalog-list__item-price--free': !product.price}">
                  {{ product.price | priceFormatted }}
                </div>
              </div>
            </router-link>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/catalog';
</style>

<script>
import ProductsFilter from '@/components/Catalog/ProductsFilter.vue'
import { priceFormatted } from '@/filters/PriceFilter.js'
import { imageBackgroundUrl } from '@/filters/ImageBackgroundUrl.js'

export default {
  name: 'CatalogView',
  components: {
    ProductsFilter
  },
  filters: {
    priceFormatted,
    imageBackgroundUrl
  },
  data () {
    return {
      sortDirectionDown: true,
      filterOpened: false
    }
  },
  computed: {
    products() {
      return this.$store.getters.products
    },
    filteredProducts() {
      return !this.$store.getters.filteredProducts.length && !this.$store.getters.filtered ? this.products : this.$store.getters.filteredProducts 
    },
    sorted() {
      return !this.sortData.active ? this.filteredProducts : this.filteredProducts.sort((a, b) => {
        return this.sortData.desc ? b.price - a.price : a.price - b.price
      })
    },
    sortData:  {
      get: function () {
        return this.$store.getters.sort
      },
      set: function (val) {
        this.$store.commit('updateSort', val)
      }
    }
  },
  methods: {
    sort () {
      this.sortData.desc = !this.sortData.desc
      this.sortData.active = true
      this.$store.commit('updateSort', this.sortData)
    }
  },
  mounted () {
    this.$store.dispatch('getProducts')
  },
  watch: {
   
  }
}
</script>
