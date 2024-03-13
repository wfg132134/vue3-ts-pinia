import { createRouter, createWebHistory } from 'vue-router'
import { LOGIN_TOKEN } from "@/global/constants";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect: '/main'
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/main.vue'),
      children: [
        {
          path: '/main/analysis/one',
          name: 'analysis',
          component: () => import('../views/page/AnalysisOne.vue')
        },
        {
          path: '/main/settings/one',
          name: 'settings',
          component: () => import('../views/page/SettingsOne.vue')
        },
        {
          path: '/main/department/one',
          name: 'department',
          component: () => import('../views/page/DepartmentOne.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/:pathMatch(.*)',
      name: 'not-find',
      component: () => import('../views/not-find/NotFind.vue')
    }
  ]
})

// 导航守卫
// 返回值决定跳转的方向
router.beforeEach(( to, from)=>{
  if (to.path === '/main') {
    // 只有登录成功，才能进入到main页面
    const token = localStorage.getItem(LOGIN_TOKEN)
    if (!token) {
      return '/login'
    }
  }
})
export default router
