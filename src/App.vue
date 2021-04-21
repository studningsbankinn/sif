<template>
  <div>
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
      <!-- <div class="card-image"> -->
            <figure class="image is-64x64"> <!-- is-48x48 -->
              <img src="/images/verzlo_logo.jpg" alt="Placeholder image">
            </figure>
          </div>

    <!-- <div class="media-content"> -->
          <div class="media-left">
            <p class="title is-4">{{ place.name }}</p>
            <div class="media-left">
                <p v-if="place.description" class="subtitle is-6 no-padding-margin">{{ place.description }}</p>
            </div>
            <p class="subtitle is-6">blabla</p>
            <i class="fas fa-globe"></i>
            <a :href="'https://' + place.website" class="sif-color">{{ place.website }}</a>
          </div>
          <div class="media-left">
            <p class="title is-5">&nbsp;</p>
            <p v-if="place.contact" class="media-left">Tengiliður: {{ place.contact }}</p>
            <p v-if="place.email" class="media-left">Netfang: {{ place.email }}</p>
            <p v-if="place.phone" class="media-left">Sími: {{ place.phone }}</p>
          </div>
        </div>
      </div>     
      <!-- Test tabs #2 -->
      <div>
        <div class="tabs is-boxed">
          <ul>
            <li
              v-for="tab in categoryTabs"
              :key="tab"
              :class="{ 'is-active' : tab === selectedTab }"
            >
              <a @click="selectedTab = tab">
                <span class="icon is-small"><i :class="icons[tab]" aria-hidden="true"></i></span>
                <span>{{ tab }}</span>
              </a>
            </li>            
          </ul>
        </div>

        <table class="table is-striped is-bordered is-fullwidth">
          <thead>
            <tr>
              <th width="50%">Spurning</th>
              <th width="5%">Svar</th>
              <th width="45%">Athugasemd</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in this.categoryAnswers"
              :key="row.id"
            >
              <td>{{ row.question }}</td>              
              <td v-if="row.answer === true">
                <i class="fas fa-thumbs-up"></i>
                Já
              </td>
              <td v-else>
                <i class="fas fa-thumbs-down"></i>
                Nei
              </td>                
              <td>{{ row.comment }}</td>                
            </tr>
          </tbody>
        </table>
    
  </div>
</template>

<script>
import agent from 'superagent'
export default {
  name: 'App',
  data () {
    return {
      answers: [],
      selectedTab: undefined,
      place: '',
      icons: {
        'Aðgengi/rými': 'fab fa-accessible-icon',
      }
    }
  },
  methods: {
    mapUrlToSchool () {
      const url = window.location.toString()
      const parts = url.split('/')
      
      const lastItem = parts[parts.length -1]
      const secondLastItem = parts[parts.length - 2]
      const school = (lastItem === '') ? secondLastItem : lastItem
      
      const map = {
        'verzlunarskoli-islands': 1
      }

      return map[school]
    },    
  },
  computed: {
    categoryAnswers () {
      return this.answers.filter(item => item.questionCategoryName === this.selectedTab)
    },

    categoryTabs () {
      return this.answers
        .map(item => item.questionCategoryName)
        .filter((item, index, self) => self.indexOf(item) === index)
    }
  },
  created() {
    const schoolId = this.mapUrlToSchool()
    agent
      .get(process.env.STUDNINGSBANKINN_API_URL + '/answers?placeId=' + schoolId)
      .set('Authorization', 'Bearer ' + process.env.STUDNINGSBANKINN_API_KEY)
      .then(data => {
        this.answers = data.body
        this.selectedTab = this.selectedTab = this.categoryTabs[0]
      })
      .catch(e => {
        // Do some error handling
        console.log(e)
      })
    
    agent
      .get(process.env.STUDNINGSBANKINN_API_URL + '/places?id=' + schoolId)
      .set('Authorization', 'Bearer ' + process.env.STUDNINGSBANKINN_API_KEY)
      .then(data => {
        this.place = data.body[0]
      })
      .catch(e => {
        // Do some error handling
        console.log(e)
      })
  }
}

</script>

<style>

.sif-color, .is-active {
  color: #00a4e3;
  
}

/*
.is-active {
  color: #00a4e3;
}
*/

.fa-thumbs-down {
  color: rgb(196, 26, 0);
}

.fa-thumbs-up {
  color: rgb(82, 150, 0);
}

.no-padding-margin {
  margin: 0;
  padding-top: 0;
}

</style>
