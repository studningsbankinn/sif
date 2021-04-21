<template>
<div>
  <div class="columns">
    <div class="column is-4">
      <Card :place="place" />
    </div>
    <div class="column is-6">
      <Chart :series="answers" />
    </div>
  </div>

  <div class="columns">                    
    <div class="column is-12">
      <div class="tabs is-boxed">
        <ul>
          <li
            v-for="tab in categoryTabs"
            :key="tab"
            :class="{ 'is-active' : tab === selectedTab }"
          >
            <a @click="selectedTab = tab">
              <span class="icon is-small"><i
                :class="icons[tab]"
                aria-hidden="true"
              /></span>
              <span>{{ tab }}</span>
            </a>
          </li>
        </ul>
      </div>

      <table class="table is-striped is-bordered is-fullwidth">
        <thead>
          <tr>
            <th width="50%">
              Spurning
            </th>
            <th width="5%">
              Svar
            </th>
            <th width="45%">
              Athugasemd
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in this.categoryAnswers"
            :key="row.id"
          >
            <td>{{ row.question }}</td>
            <td v-if="row.answer === true">
              <i class="fas fa-thumbs-up" />
              Já
            </td>
            <td v-else>
              <i class="fas fa-thumbs-down" />
              Nei
            </td>
            <td>{{ row.comment }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>  
</template>

<script>
import agent from 'superagent'
import Chart from './Chart'
import Card from './Card'

export default {
  name: 'App',
  components: {
    Chart,
    Card
  },
  data () {
    return {
      answers: [],
      selectedTab: undefined,
      place: '',
      icons: {
        'Aðgengi/rými': 'fab fa-accessible-icon'
      }
    }
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
  created () {
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
  },
  methods: {
    mapUrlToSchool () {
      const url = window.location.toString()
      const parts = url.split('/')

      const lastItem = parts[parts.length - 1]
      const secondLastItem = parts[parts.length - 2]
      const school = (lastItem === '') ? secondLastItem : lastItem

      const map = {
        'verzlunarskoli-islands': 1
      }

      return map[school]
    }
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

.radarchart {
  max-height: 400px;
  display: block;
}

</style>
