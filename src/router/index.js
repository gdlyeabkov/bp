import Vue from 'vue'
import VueRouter from 'vue-router'
import Hotel from '../views/Hotel.vue'
import HotelRoom from '../views/HotelRoom.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Hotel',
    component: Hotel
  },
  {
    path: '/room',
    name: 'HotelRoom',
    component: HotelRoom
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
