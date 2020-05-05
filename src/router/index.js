import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/collect',
    name: 'Collect',
    component: () => import('../views/Collect.vue'),
  },
  {
    path: '/play-video/:videoId',
    name: 'PlayVideo',
    component: () => import('../views/PlayVideo.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
