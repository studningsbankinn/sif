import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'Welcome',
      path: '/studningsbanki',
      alias: '/studningsbanki/velkomin',
      component: () => import('./pages/Welcome.vue')
    },    
    {
      name: 'About',
      path: '/studningsbanki/um',
      component: () => import('./pages/About.vue')
    },
    {
      name: 'Information',
      path: '/studningsbanki/upplysingar',
      component: () => import('./pages/Information.vue')
    },    
    {
      name: 'School',
      path: '/studningsbanki/skoli/:id',
      component: () => import('./pages/School.vue')
    },    
  ]
})
