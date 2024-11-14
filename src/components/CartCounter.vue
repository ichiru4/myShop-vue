<template>
    <div class="media-cart">
        <el-button color="blueviolet" :icon="CartItemCount > 0 ? ShoppingCartFull : ShoppingTrolley" @Click="ToCartPage"
            class="media-btn" size="large">
            
            <span class="cart-count">{{ CartItemCount }}</span>
        </el-button>
    </div>
</template>

<script setup>
import useCart from '@/stores/useCart';
import { computed, onMounted} from 'vue';
import { useRouter } from 'vue-router';
import { ShoppingCartFull, ShoppingTrolley } from '@element-plus/icons-vue'

const Cart = useCart();
const router = useRouter();
onMounted(() => {
    const localCart = localStorage.getItem('cart');
    Cart.Cart = localCart ? JSON.parse(localCart) : [];
})

const CartItemCount = computed(() => {
    return Cart.GetCartItemCount;
})

const ToCartPage = () => {
    router.push('/cart')
}
</script>


<style scoped>
.media-cart {
    margin: 15px;
}

.media-btn {
    position: relative;
}

.cart-count {
    position: absolute;
    font-size: small;
    top: -5px;
    right: -5px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #ff4949;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>