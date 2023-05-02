
// Vue Router
import { createRouter, createWebHistory } from 'vue-router'

const ChatPage = () => import('../pages/chat.vue')

const routes = [
    { path: '/', redirect: '/chat' },
    { path: '/chat', component: ChatPage },
    { path: '/login', component: () => import('../pages/login.vue') },
    // 其余路由重定向到404
    // { path: '/:pathMatch(.*)*', redirect: '/404' },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;



