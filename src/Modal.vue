<template>
<div
  class="modal"
  :class="{ 'is-active': type !== undefined }"  
>
  <div class="modal-background" @click="close"></div>
  <div class="modal-content">
    <div class="box">
      <component :is="type"></component>
    </div>
  </div>  
  <button class="modal-close is-large" aria-label="close" @click="close"></button>
</div>
</template>

<script>
import Welcome from './Welcome'
import About from './About'
export default {
  name: 'InfoModal',
  components: {
    Welcome,
    About
  },  
  props: {    
    type: {
      type: String,
      default: undefined
    }
  },
  methods: {
    close()  {
      console.log('close')
      this.$emit('close', true)
    }
  }
}
</script>