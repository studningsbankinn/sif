<template>
  <div class="tabs is-boxed">
  <ul>
    <li
      v-for="tab in list"
      :key="tab"
      :class="{ 'is-active' : tab === selected }"
    >
      <a @click="select(tab)">
          <span class="icon is-small">
            <i :class="icons[tab]"></i>
          </span>
          <span>{{ tab }}</span>
      </a>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selected: undefined,
      icons: {
        'Aðgengi/rými': 'fab fa-accessible-icon',
        'Námið': 'fas fa-university',
        'Próftaka': 'fas fa-user-edit',
        'Starfsemi skólans': 'fas fa-hands-helping',
        'Önnur húsnæðismál': 'fas fa-school',
        'Réttindi nemenda': 'fas fa-universal-access',
        'Félagslífið': 'fas fa-users'
      }
    }
  },
  watch: {
    list (val) {
      this.select(val[0])
    }
  },
  methods: {
    select (tab) {
      this.selected = tab
      this.$emit('select', tab)
    }
  }
}
</script>