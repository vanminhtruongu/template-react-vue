import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';
// import auth from '@/middleware/auth';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            // beforeEnter: auth,
            children: [
                {
                    path: '/hello',
                    component: () => import('@/views/Hello.vue')
                }
            ]
        }
    ]
});

export default router;
