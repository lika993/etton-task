<template>
  <div class="product">
    <div class="container">
      <main class="content product-content">
        <div class="breadcrumbs">
          <div class="breadcrumbs-link" @click="$router.back()"><span>Вернуться в каталог</span></div>
        </div>
        <div class="product-info d-flex" v-if="product">
          <div class="product-info__img" :class="{'product-info__img--bordered': !product.img }" :style="product.img | imageBackgroundUrl">
          </div>
          <div class="product-info__details">
            <h1 class="headline headline--first product-info__details-title">
              {{ product.title }}
            </h1>
            <span class="product-info__price headline headline--first">
              14 900 ₽
            </span>
          </div>
        </div>
      </main>
    </div>
</div>
</template>
<style lang="scss" scoped>
@import '@/assets/scss/product';
</style>

<script>
import { imageBackgroundUrl } from '@/filters/ImageBackgroundUrl.js'

export default {
  filters: {
    imageBackgroundUrl
  },
  computed: {
    product() {
      let product = this.$store.getters.products.find((product) => {
        return this.$route.params.id == product.id
      })
      return product
    }
  },
  mounted () {
    this.$store.dispatch('getProducts')
  }
}
</script>
