import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    filteredProducts: [],
    filtered: false,
    filter: {
      price: [],
      category: 0,
      search: '',
    },
    sort: {
      desc: true,
      active: false
    }
  },
  getters: {
    products: state => {
      return state.products
    },
    filteredProducts: state => {
      return state.filteredProducts
    },
    filtered: state => {
      return state.filtered
    },
    filter: state => {
      return state.filter
    },
    sort: state => {
      return state.sort
    }
  },
  mutations: {
    setProducts: (state, payload) => {
      state.products = payload;
    },
    setFilteredProducts: (state, payload) => {
      state.filteredProducts = payload;
    },
    switchFilter: (state, payload) => {
      state.filtered = payload
      
      if (!state.filtered) {
        state.filteredProducts = []
      }
    },
    updateFilter: (state, payload) => {
      state.filter = payload;
    },
    updateSort: (state, payload) => {
      state.sort = payload;
    }
  },
  actions: {
    getProducts: async (context, payload) => {
      let products = await fetch('https://mocki.io/v1/3a4f1bc7-954b-4af5-a459-b85950dd700f').then(response => response.json())
      context.commit('setProducts', products)
    }
  }
})
