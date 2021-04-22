<template>
<div class="container box">
  <div class="columns">    
    <div class="column is-12">
      <Search :places="places" @select="selectPlace" />
    </div>
  </div>

  <div class="columns">
    <div class="column is-6">
      <Info :place="place" />
    </div>  
    <div class="column is-6">
      <Chart :series="answers" />
    </div>
  </div>

  <div class="columns">                    
    <div class="column is-12">      
      <Tabs :list="categoryTabs" @select="selectTab" />
      <Answers :list="categoryAnswers" />
    </div>
  </div>
</div>  
</template>

<script>
import agent from 'superagent'
import Search from './Search'
import Info from './Info'
import Chart from './Chart'
import Tabs from './Tabs'
import Answers from './Answers'

export default {
  name: 'App',
  components: {
    Search,
    Info,
    Chart,    
    Tabs,
    Answers
  },
  data () {
    return {
      answers: [],
      tab: undefined,
      place: {},
      places: [],
      
    }
  },  
  computed: {
    categoryAnswers () {
      return this.answers.filter(item => item.questionCategoryName === this.tab)
    },
    categoryTabs () {
      return this.answers
        .map(item => item.questionCategoryName)
        .filter((item, index, self) => self.indexOf(item) === index)
    }
  },
  created () {
    this.getPlaces().then(() => {
      const place = localStorage.getItem('SIF_SELECTED_PLACE')    
      if (place) {
        this.place = JSON.parse(place)      
      } else {
        this.place = this.places[0]
      }

      return this.getAnswers()
    })    
  },
  methods: {
    selectPlace (place) {
      this.place = place
      localStorage.setItem('SIF_SELECTED_PLACE', JSON.stringify(place))
      this.getAnswers()
    },
    selectTab (tab) {
      this.tab = tab
    },
    getPlaces () {
      return agent
        .get(process.env.STUDNINGSBANKINN_API_URL + '/places')
        .set('Authorization', 'Bearer ' + process.env.STUDNINGSBANKINN_API_KEY)
        .then(data => {
          this.places = data.body
        })      
    },
    getAnswers () {
      return agent
        .get(process.env.STUDNINGSBANKINN_API_URL + '/answers?placeId=' + this.place.id)
        .set('Authorization', 'Bearer ' + process.env.STUDNINGSBANKINN_API_KEY)
        .then(data => {
          this.answers = data.body
          this.selectedTab = this.selectedTab = this.categoryTabs[0]
        })
        .catch(e => {
          // Do some error handling
          console.log(e)
        })
    }    
  }
}

</script>

<style>
html {
  padding: 1em;
  background: rgba(0, 164, 227, 0.3)
}
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
