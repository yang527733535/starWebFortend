import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/index.jsx',
      routes: [
        {
          path: '/',
          redirect: '/index',
        },
        {
          path: '/index',
          component: '@/pages/content/index.jsx'
        },
        {
          path: '/upload',
          component: '@/pages/upload/index.jsx'
        },
        {
          path: '/userinfo',
          component: '@/pages/userinfo/index.jsx'
        }
      ]
    },
  ],
});
