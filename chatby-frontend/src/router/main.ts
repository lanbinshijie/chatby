
// Vue Router
import { createRouter, createWebHistory } from 'vue-router'

const ChatPage = () => import('../pages/chat.vue')

const routes = [
    { path: '/', redirect: '/chat' },
    { path: '/chat', component: ChatPage },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;



