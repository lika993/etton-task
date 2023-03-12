<template>
  <aside class="filter">
    <div class="search-wrap">
      <input type="search" v-model="filter.search" class="search custom-field" placeholder="Поиск">
      <i class="search-btn"></i>
    </div>
    <div>
      <custom-select
        :options="filterOptions"
        class="select"
        :selectedOption="filter.category"
        @selected="selected($event)"
      ></custom-select>
      <label for="free" class="checkbox-wrap">
        <input class="checkbox" type="checkbox" id="free" value="free" v-model="filter.price">
        <i class="checkbox-pseudo"></i>
        <span>Бесплатные</span>
      </label>
      <label for="paid" class="checkbox-wrap">
        <input class="checkbox" type="checkbox" id="paid" value="paid" v-model="filter.price">
        <i class="checkbox-pseudo"></i>
        <span>Не бесплатные</span>
      </label>
      <div class="btn-list">
        <button class="btn btn--default" @click="applyFilter">Применить</button>
        <button v-if="filterVisible" @click="resetFilter" class="btn btn-reset">Сброс</button>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/filter'
</style>

<script>
import CustomSelect from '@/components/CustomSelect.vue'
export default {
  props: {
    opened: {
      type: Boolean
    }
  },
  components: {
    CustomSelect
  },
  computed: {
    products() {
      return this.$store.getters.products
    },
    filteredProducts() {
      return this.$store.getters.filteredProducts
    },
    filter: {
      get: function () {
        return this.$store.getters.filter
      },
      set: function (val) {
        this.$store.commit('updateFilter', val)
      }
    },
    filterVisible() {
      return this.filter.price.length || this.filter.category || this.filter.search
    }
  },
  data () {
    return {
      filterOptions: [
        { 'id': 1, 'label': 'Беспородные' },
        { 'id': 2, 'label': 'Породистые' },
        { 'id': 3, 'label': 'Титулованные' },
        { 'id': 4, 'label': 'Пусечки бусечки' }
      ]
    }
  },
  mounted() {
   
  },
  methods: {
    selected ($event) {
      this.filter.category = $event
      this.$store.commit('updateFilter', this.filter)
    },
    free (price) {
      return price === 0
    },
    paid (price) {
      return price > 0
    },
    searchByFilterApply (products, str) {
      return !str ? products : products.filter(item => item.title.toLowerCase().includes(str.toLowerCase()))
    },
    resetFilter () {
      this.$store.commit('updateFilter', {
        price: [],
        category: null,
        search: ''
      })
      this.$store.commit('switchFilter', false)
      this.toggleFilterByMobileCase(false)
    },
    filterByPrice (products) {
      if (this.filter.price.length === 2 || this.filter.price.length === 0) {
        return products
      }
      return products.filter((product) => {
        return this[this.filter.price[0]](product.price)
      })
    },
    filterByCategory (products, category) {
      return products.filter((product) => {
        return !this.filter.category ? product : product.categories.includes(category)
      })
    },
    toggleFilterByMobileCase(val) {
      if (document.documentElement.clientWidth <= 580) {
        this.$emit('toggleFilter', val)
      }
    },
    applyFilter () {
      let products = [...this.products]
      products = this.searchByFilterApply(products, this.filter.search)
      products = this.filterByPrice(products)
      products = this.filterByCategory(products, this.filter.category)
      this.$store.commit('setFilteredProducts', products)
      this.$store.commit('switchFilter', true)
      this.toggleFilterByMobileCase(false)
    }
  }
}
</script>
