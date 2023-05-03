
// Vue Router
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    { path: '/', redirect: '/chat' },
    { path: '/chat', component: () => import('../pages/chat.vue') },
    { path: '/login', component: () => import('../pages/login.vue') },
    // 其余路由重定向到404
    // { path: '/:pathMatch(.*)*', redirect: '/404' },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;



