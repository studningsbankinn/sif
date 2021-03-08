<template>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <td>Skóli</td>
          <td>Spurning</td>
          <td>Svar</td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in this.answers"
          :key="row.id"
        >
          <td>{{ row.placeName }}</td>
          <td>{{ row.question }}</td>
          <td>{{ row.answer }}</td>        
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
  created() {
    agent
      .get(process.env.STUDNINGSBANKINN_API_URL + '/answers')
      .set('Authorization', 'Bearer ' + process.env.STUDNINGSBANKINN_API_KEY)
      .then(data => {
        console.log('fékk svar')
        console.log(data.body)
        this.answers = data.body        
      })
  }
}
</script>

<style>
</style>
