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
    {
        path: '/details',
        name: 'details',
        component: () => import('../views/details.vue')
    },
    {
        path: '/center',
        name: 'center',
        component: () => import('../views/center.vue')
    },
    {
        path: '/commod',
        name: 'commod',
        component: () => import('../views/commod.vue')
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('../views/admin.vue')
    },
    {
        path: '/part',
        name: 'part',
        component: () => import('../views/part.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router