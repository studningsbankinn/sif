<template>
<div class="dropdown" :class="{ 'is-active': results.length}">
  <div class="dropdown-trigger">
    <div class="field">
      <div class="control has-icons-left has-icons-right">
        <input
          :value="search"
          class="input is-medium"
          type="text"
          placeholder="Leita eftir skóla"
          @focus="showTopResults"
          @blur="clearResults"
          @input="searchInput"
        />
        <span class="icon is-small is-left">
          <i class="fa fa-search"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fa fa-angle-down"></i>
        </span>
      </div>
    </div>
  </div>
  <div class="dropdown-menu" role="menu">
    <div class="dropdown-content">
      <a
        v-for="place in results"
        :key="place.id"
        class="dropdown-item"
        @click="select(place)"
      >
        {{ place.name }}
      </a>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    places: {
      type: Array,
      default: () => []
    },
  },
  data () {
    return {
      search: '',
      results: ''
    }
  },
  methods: {
    showTopResults () {
      this.results = this.places.slice(0,10)
    },
    clearResults () {
      setTimeout(() => {
        this.results = []
      }, 100)
    },
    select (place) {
      this.$emit('select', place)
    },
    searchInput(e) {
      this.search = e.target && e.target.value

      this.results = this.places.filter(place => place.name.toUpperCase().includes(this.search.toUpperCase()))
    },
  },
}
</script>

<style scoped>

.dropdown,
.dropdown-trigger,
.dropdown-menu {
  width: 100%;
}

.dropdown-menu .dropdown-item {
  font-size: 1rem;
}
.has-icons-right .is-right {
  color: #000;
}

.has-icons-right .is-right:hover {
  cursor: pointer;
}
</style>