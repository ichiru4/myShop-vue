import FeaturedProduct from '@/components/FeaturedProduct.vue'
import ProductList from '@/components/ProductList.vue'
import Cart from '@/views/Cart/Cart.vue'
import ProductDetail from '@/views/ProductDetail/ProductDetail.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', redirect: '/product/feature'
    },
    {
      path: '/product/feature',
      component: FeaturedProduct
    },
    {
      path: '/product/:url',
      component: ProductList
    },
    {
      path: '/product/search/:searchText/:page',
      component: ProductList
    },
    {
      path: '/detail/:id',
      component: ProductDetail
    },
    {
      path: '/cart',
      component: Cart
    }
  ],
})

export default router
