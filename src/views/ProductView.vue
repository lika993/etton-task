<template>
  <div class="product">
    <div class="container">
      <main class="content product-content">
        <div class="breadcrumbs">
          <div class="breadcrumbs-link" @click="$router.back()"><span>Вернуться в каталог</span></div>
        </div>
        <div class="product-info d-flex">
          <div class="product-info__img" :class="{'product-info__img--bordered': !product.img}" :style="product.img | imageBackgroundUrl">
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
  data () {
    return {
      product: {}
    }
  },
  filters: {
    imageBackgroundUrl
  },
  mounted () {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => {
        this.product = data.find((product) => {
          return this.$route.params.id == product.id
        })
      })
  }
}
</script>
