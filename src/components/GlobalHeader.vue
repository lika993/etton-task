<template>
  <header class="header d-flex ai-ctr">
    <div class="container d-flex ai-ctr">
      <a href="/" class="header__logo">
        <img src="../assets//images/logo.svg" alt="">
      </a>
      <nav class="header-nav">
        <ul class="header-menu d-flex">
          <li v-for="route in routes" class="header-menu__item">
            <router-link :class="{'header-menu__link--active' :  route.names.includes($route.name)}" class="header-menu__link" :to="route.path">
              {{ route.label }}</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
<style lang="scss" scoped>
@import '@/assets/scss/header';
</style>
<script>
export default {
  data() {
    return {
      routes: [
        {
          names: [
            'home'
          ],
          label: 'Главная',
          path: '/'
        },
        {
          names: [
            'catalog', 'product'
          ],
          label: 'Каталог',
          path: '/catalog'
        }
      ]
    }
  }
}
</script>
