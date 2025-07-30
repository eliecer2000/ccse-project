import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/IndexPage.vue') }],
  },
  {
    path: '/stats',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/IndexStats.vue') }],
  },
  {
    path: '/task',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/IndexTasks.vue') }],
  },
  {
    path: '/exam',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/IndexExam.vue') }],
  },
  {
    path: '/questions',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: ':id', component: () => import('src/pages/IndexQuestions.vue') }],
  },
  {
    path: '/exam-questions',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: ':id', component: () => import('src/pages/IndexExamQuestions.vue') }],
  },

  // {
  //   path: '/signIn',
  //   component: () => import('layouts/OutLayout.vue'),
  //   children: [{ path: '', component: () => import('pages/auth/signIn.vue') }],
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
