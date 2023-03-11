<template>
  <div class="custom-select"
       :tabindex="tabindex"
       @blur="open = false"
       @keydown.space.prevent="toggleDropdown"
       @keydown.down.prevent="focusNext"
       @keydown.up.prevent="focusPrev"
       @keydown.enter="select(options[focusedIndex])"
  >
    <div class="selected custom-field" :class="{ open: open }" @click="toggleDropdown">
      {{ findSelectedById(selectedOption) }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="option.id"
        @click="select(option)"
        @keydown.enter.prevent="select(option)"
        @mouseover="focusOption(i)"
        :class="{ hover: i === focusedIndex }"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/select';
</style>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    default: {
      type: String,
      required: false,
      default: null
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0
    },
    selectedOption: {
      type: Number
    }
  },
  data () {
    return {
      placeholder: 'Выберите категорию',
      selected: null,
      open: false,
      focusedIndex: null
    }
  },
  mounted () {
    this.$emit('input', this.selected)
  },
  methods: {
    findSelectedById (id) {
      let option =  this.options.find((option) => option.id == id)
      return option ? option.label : this.placeholder
    },
    toggleDropdown () {
      this.open = !this.open
      if (!this.open) {
        this.focusedIndex = null
      }
    },
    select (option) {
      this.$emit('selected', option.id)
      this.selected = option.id
      this.open = false
      this.$emit('input', option.id)
    },
    focusPrev () {
      if (this.focusedIndex === null) {
        this.focusedIndex = this.options.length - 1
      } else if (this.focusedIndex > 0) {
        this.focusedIndex--
      }
    },
    focusOption (index) {
      this.focusedIndex = index
    },
    focusNext () {
      if (this.focusedIndex === null) {
        this.focusedIndex = 0
      } else if (this.focusedIndex < this.options.length - 1) {
        this.focusedIndex++
      }
    }
  }
}
</script>
