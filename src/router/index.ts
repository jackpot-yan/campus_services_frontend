import type {RouteRecordRaw} from "vue-router";
import {createRouter, createWebHistory} from "vue-router";


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'login',
        component: () => import('../views/login.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/home.vue')
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router