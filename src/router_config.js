import Home from '@/components/Home'
import Commodity from '@/components/Commodity'
import User from '@/components/User'

export default({
  routes: [
    {
      path: '/home',
      component: Home,
      meta: {
        keepAlive: true // 不需要被缓存
      }
    },
    {
      path: '/commodity',
      component: Commodity
    },
    {
      path: '/user',
      component: User
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  }
})
