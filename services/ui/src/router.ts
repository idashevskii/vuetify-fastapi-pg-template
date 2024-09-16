import { createRouter, createWebHistory } from 'vue-router';

export const Route = {
  MAIN: 'MAIN',
};

const makeRoute = (name: string, path: string, component: () => Promise<unknown>) => {
  return { path, name, component };
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: { name: Route.MAIN } },
    makeRoute(Route.MAIN, '/main', () => import('@/views/MainView.vue')),
  ],
});

export const linkFactory = {
  toMain: () => ({ name: Route.MAIN }),
};

export default router;
