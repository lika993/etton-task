<template>
  <div id="app">
      <header-global></header-global>
      <router-view/>
      <footer-global></footer-global>
  </div>
</template>

<script>
import FooterGlobal from '@/components/GlobalFooter.vue'
import HeaderGlobal from '@/components/GlobalHeader.vue'

export default {
  name: 'HomeView',
  components: {
    FooterGlobal,
    HeaderGlobal
  }
}
</script>
