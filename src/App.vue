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
            <p class="title is-5">Tengiliður</p>
            <p v-if="place.contact" class="media-left">{{ place.contact }}</p>
            <p v-if="place.email" class="media-left">Netfang {{ place.email }}</p>
            <p v-if="place.phone" class="media-left">Sími {{ place.phone }}</p>
          </div>
        </div>
      </div>
      <!--
        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
      -->
      
      <!-- Test tabs #2 -->
      <div id="app">
        <div class="tabs">
          <ul>
            <li
              v-for="tab in allTabs"
              :key="tab"
              :class="{'is-active': selectedTab === tab}">
                <a @click="selectTab(tab)">
                  <span class="icon is-small"><i :class="icons[tab]" aria-hidden="true"></i></span>
                  <span>{{ tab }}</span>
                </a>
            </li>
          </ul>
        </div>
        <div>
          <table class="table is-striped is-bordered">
            <thead>
              <tr>
                <th>Spurning</th>
                <th>Svar</th>
                <th>Athugasemd</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in this.categoryAnswers"
                :key="row.id"
              >
                <td>{{ row.question }}</td>
                <td v-if="row.answer === 'true'">
                  <i class="fas fa-thumbs-up"></i>
                  Já
                </td>
                <td v-else>
                  <i class="fas fa-thumbs-down"></i>
                  Nei
                </td>
                <!-- <td>{{ row.answer }}</td> -->
                <td>{{ row.comment }}</td>
                <td>{{ row.questionCategoryName }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Test tabs -->
      <div class="container box">
        <!--  <div class="tabs is-centered is-boxed">  -->
        <div class="tabs is-boxed">
          <ul>
            <li class="is-active">
              <a>
                <span class="icon is-small"><i class="fab fa-accessible-icon" aria-hidden="true"></i></span>
                <span>Aðgengi</span>
              </a>
            </li>
            <li>
              <a>
                <span class="icon is-small"><i class="fas fa-university" aria-hidden="true"></i></span>
                <span>Námið</span>
              </a>
            </li>
            <li>
              <a>
                <span class="icon is-small"><i class="fas fa-user-edit" aria-hidden="true"></i></span>
                <span>Próftaka</span>
              </a>
            </li>
            <li>
              <a>
                <span class="icon is-small"><i class="fas fa-hands-helping" aria-hidden="true"></i></span>
                <span>Starfsemi</span>
                <!-- Þjónusta hér í staðin fyrir Starfsemi??? -->
              </a>
            </li>
            <li>
              <a>
                <span class="icon is-small"><i class="fas fa-school" aria-hidden="true"></i></span>
                <span>Húsnæði</span>
              </a>
            </li>
            <li>
              <a>
                <span class="icon is-small"><i class="fas fa-users" aria-hidden="true"></i></span>
                <span>Félagslíf</span>
              </a>
            </li>
            <li>
              <a>
                <span class="icon is-small"><i class="fas fa-universal-access" aria-hidden="true"></i></span>
                <span>Réttindi</span>
              </a>
            </li>
          </ul>
        </div>
        <br>

        <!-- Statistics / Myndræn framsetning á gögnunum -->
        <div>
          
        </div>
        <br>

        <!-- Spurninga og svara taflan-->
        <div>
          <table class="table is-striped is-bordered">
            <thead>
              <tr>
                <th>Spurning</th>
                <th>Svar</th>
                <th>Athugasemd</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in this.answers"
                :key="row.id"
              >
                <td>{{ row.question }}</td>
                <td v-if="row.answer === 'true'">
                  <i class="fas fa-thumbs-up"></i>
                  Já
                </td>
                <td v-else>
                  <i class="fas fa-thumbs-down"></i>
                  Nei
                </td>
                <!-- <td>{{ row.answer }}</td> -->
                <td>{{ row.comment }}</td>
                <td>{{ row.questionCategoryName }}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>

    <!-- Upphaflega taflan -->
    <!--
    <div>
      <table class="table table-striped">
          <thead>
            <tr>
              <td>Skóli</td>
              <td>Flokkur</td>
              <td>Spurning</td>
              <td>Svar</td>          
              <td>Athugasemd</td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in this.answers"
              :key="row.id"
            >
              <td>{{ row.placeName }}</td>
              <td>{{ row.questionCategoryName }}</td>
              <td>{{ row.question }}</td>
              <td>{{ row.answer }}</td>          
              <td>{{ row.comment }}</td>
            </tr>
          </tbody>
        </table>
    </div>
    -->
    
  </div>
</template>

<script>
import agent from 'superagent'
export default {
  name: 'App',
  data () {
    return {
      answers: [],
      selectedTab: 'Aðgengi',
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

    selectTab (tab) {
      this.selectedTab = tab
    }
  },
  computed: {
    categoryAnswers () {
      return this.answers.filter(item => item.questionCategoryName === this.selectedTab)
    },

    allTabs () {
      return this.answers
        .map(item => item.questionCategoryName)
        .filter((item, index, self) => self.indexOf(item) === index)
    }
  },
  created() {
    console.log('created')
    const schoolId = this.mapUrlToSchool()
    agent
      .get(process.env.STUDNINGSBANKINN_API_URL + '/answers?placeId=' + schoolId)
      .set('Authorization', 'Bearer ' + process.env.STUDNINGSBANKINN_API_KEY)
      .then(data => {
        this.answers = data.body
      })
      .catch(e => {
        console.log(e)
      })
    
    agent
      .get(process.env.STUDNINGSBANKINN_API_URL + '/places?id=' + schoolId)
      .set('Authorization', 'Bearer ' + process.env.STUDNINGSBANKINN_API_KEY)
      .then(data => {
        this.place = data.body[0]
      })
      .catch(e => {
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
