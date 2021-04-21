<template>
<div class="card">
  <div class="card-content">
    <div class="media">
      <div class="media-left">        
        <figure class="image is-64x64">          
          <img
            src="/images/verzlo_logo.jpg"
            alt="Placeholder image"
          >
        </figure>
      </div>          
        
      <div class="media-left">
        <p class="title is-4">
          {{ place.name }}
        </p>
        <div class="media-left">
          <p
            v-if="place.description"
            class="subtitle is-6 no-padding-margin"
          >
            {{ place.description }}
          </p>
        </div>
        <p class="subtitle is-6">
          blabla
        </p>
        <i class="fas fa-globe" />
        <a
          :href="'https://' + place.website"
          class="sif-color"
        >{{ place.website }}</a>
      </div>

      <div class="media-left">
        <p class="title is-5">
          &nbsp;
        </p>
        <p
          v-if="place.contact"
          class="media-left"
        >
          Tengiliður: {{ place.contact }}
        </p>
        <p
          v-if="place.email"
          class="media-left"
        >
          Netfang: {{ place.email }}
        </p>
        <p
          v-if="place.phone"
          class="media-left"
        >
          Sími: {{ place.phone }}
        </p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Info',
  props: ['place']    
}
</script>
