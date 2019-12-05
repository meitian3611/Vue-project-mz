import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Films from '../views/Home/HomeFilms.vue'
import Cinemas from '../views/Home/HomeCinemas.vue'
import Center from '../views/Home/HomeCenter.vue'
import Cinema from '../views/Cinema.vue'
import Login from '../views/Login.vue'
import City from '../views/City.vue'
import Film from '../views/Film.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'films',
      component: Home,
      children: [
        {
          path: 'films',
          component: Films,
          meta: {
            tabId: 1
          }
        },
        {
          path: 'cinemas',
          component: Cinemas,
          meta: {
            tabId: 2
          }
        },
        {
          path: 'center',
          component: Center,
          meta: {
            tabId: 3
          }
        }
      ]
    },
    {
      path: '/cinema/:id/film',
      component: Cinema
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/city',
      component: City
    },
    {
      path: '/film/:id',
      component: Film
    }
  ]
})

export default router
