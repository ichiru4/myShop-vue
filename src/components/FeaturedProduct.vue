<template>
    <div>
        <h1 class="title">今日热销榜</h1>
        <div class="container">
             <template v-for="product in ProductList.products" :key="product.id">
                <div class="product">
                    <a @click="detail(product.id)">
                        <img :src="product.imageUrl" alt="">
                    </a>
                    <h4>
                        <a @click="detail(product.id)">{{ product.title }}</a>
                    </h4>

                    <template v-if="product.variants!=null&&product.variants.length>0">
                        <h5 class="price">￥{{product.variants[0].price}}</h5>
                    </template>
                </div>
             </template>
        </div>
    </div>
</template>

<script setup>
import useProductList from '@/stores/useProductList';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const ProductList = useProductList();
onMounted(async () => {
    await ProductList.getProductsByFeatured();
});

const detail = (id) =>{
    router.push({
        path: `/detail/${id}`
    })
}
</script>

<style scoped>
.container{
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    justify-content: center;
}
.title{
    text-align: center;
}

img{
   width: 150px;
   aspect-ratio: 1/1;
   border-radius: 6px;
   transition: transform .2s ease-in-out;
   margin: 20px;
   margin-bottom: 10px;

}

img:hover{
    transform: scale(1.1) rotate(5deg);

}

a:hover{
    color: aqua;
    text-decoration: underline;
}

.product{
    margin: 10px;
    text-align: center;
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 6px;
    max-width: 200px;
}

.price{
    color: red;
}
</style>