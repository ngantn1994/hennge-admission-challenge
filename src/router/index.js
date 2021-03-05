import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Mail from '../views/Mail.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/mail',
    name: 'Mail',
    component: Mail,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
