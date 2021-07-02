import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Films from '../views/Home/Films.vue'
import NowPlaying from '../views/Home/Films/NowPlaying.vue'
import ComingSoon from '../views/Home/Films/ComingSoon.vue'
import Cinemas from '../views/Home/Cinemas.vue'
import Center from '../views/Home/Center.vue'
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
          },
          children: [
            {
              path: 'nowPlaying',
              name: 'nowPlaying',
              component: NowPlaying,
              meta: {
                tabId: 1
              }
            },
            {
              path: 'comingSoon',
              name: 'comingSoon',
              component: ComingSoon,
              meta: {
                tabId: 1
              }
            },
            {
              path: '',
              redirect: '/films/nowPlaying'
            }
          ]
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
            tabId: 4
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
      path: '/films/:id',
      component: Film
    }
  ]
})

export default router
