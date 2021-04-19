<template>
  <div>
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
      <!-- <div class="card-image"> -->
            <figure class="image is-64x64">
              <img src="/images/verzlo_logo.jpg" alt="Placeholder image">
            </figure>
          </div>

    <!-- <div class="media-content"> -->
          <div class="media-left">
            <p class="title is-4">Verzlunarskóli Íslands</p>
            <div class="media-left">
              Lorem ipsum dolor sit amet,
            </div>
            <p class="subtitle is-6">@johnsmith</p>
            <i class="fas fa-globe"></i>
            <a href="https://www.verslo.is">verslo.is</a>
          </div>
          <div class="media-left">
            <p class="title is-5">Tengiliður</p>
            <p class="media-left">Berglind Helga Sigurþórsdóttir</p>
            <p class="media-left">Sími 5900615</p>
          </div>


        </div>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">John Smith</p>
            <p class="subtitle is-6">@johnsmith</p>
          </div>
        </div>

        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus nec iaculis mauris. <a>@bulmaio</a>.
          <a href="#">#css</a> <a href="#">#responsive</a>
          <br>
          <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        </div>
      </div>

      <!-- Test tabs -->
      <div class="box">
        <div class="tabs is-centered is-boxed">
          <ul>
            <li class="is-active">
              <a>
                <span class="icon is-small"><i class="fas fa-image" aria-hidden="true"></i></span>
                <span>Aðgengi</span>
              </a>
            </li>
            <li>
              <a>
                <span class="icon is-small"><i class="fas fa-music" aria-hidden="true"></i></span>
                <span>Námið</span>
              </a>
            </li>
            <li>
              <a>
                <span class="icon is-small"><i class="fas fa-film" aria-hidden="true"></i></span>
                <span>Próftaka</span>
              </a>
            </li>
            <li>
              <a>
                <span class="icon is-small"><i class="fas fa-file-text-o" aria-hidden="true"></i></span>
                <span>Starfsemi</span>
              </a>
            </li>
            <li>
              <a>
                <span class="icon is-small"><i class="fas fa-file-text-o" aria-hidden="true"></i></span>
                <span>Húsnæði</span>
              </a>
            </li>
            <li>
              <a>
                <span class="icon is-small"><i class="fas fa-file-text-o" aria-hidden="true"></i></span>
                <span>Félagslíf</span>
              </a>
            </li>
            <li>
              <a>
                <span class="icon is-small"><i class="fas fa-file-text-o" aria-hidden="true"></i></span>
                <span>Réttindi</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

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
