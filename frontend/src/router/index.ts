import { createRouter, createWebHistory } from 'vue-router'
import EmbeddView from '../views/EmbeddView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: EmbeddView
    },
    {
      path: '/chat',
      name: 'chat',

      component: () => import('../views/RetrieveView.vue')
    },
    {
      path: '/setup-wiki',
      name: 'setup-wiki',
      component: () => import('../views/SetupView.vue')
    },
    {
      path: '/chat-wiki',
      name: 'chat-wiki',
      component: () => import('../views/UsageView.vue')
    }
  ]
})

export default router
