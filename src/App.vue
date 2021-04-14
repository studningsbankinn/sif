<template>
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
</template>

<script>
import agent from 'superagent'
export default {
  name: 'App',
  data () {
    return {
      answers: []
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
  }
}
</script>

<style>
</style>
