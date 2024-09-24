import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        redirect: '/helloGithub/frontEnd'
    },
    {
        path: '/helloGithub',
        name: 'helloGithub',
        children: [
            {
                path: '',
                redirect: '/helloGithub/frontEnd'
            },
            {
                path: 'frontEnd',
                name: 'frontEnd',
                component: () => import('../views/helloGithub/software/FrontEnd.vue')
            },
            {
                path: 'backEnd',
                name: 'backEnd',
                component: () => import('../views/helloGithub/software/BackEnd.vue')
            },
            {
                path: 'testDevelop',
                name: 'testDevelop',
                component: () => import('../views/helloGithub/software/TestDevelop.vue')
            },
            {
                path: 'fpga',
                name: 'fpga',
                component: () => import('../views/helloGithub/hardware/Fpga.vue')
            }
        ]
    },
    {
        path: '/helloWorld',
        name: 'helloWorld',
        component: () => import('../views/helloWorld/Index.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
