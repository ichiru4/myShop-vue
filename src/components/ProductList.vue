<template>
    <!-- <h2>Product List</h2> -->
    <div class="container">
        <template v-for="product in ProductList.products" :key="product.id">
            <div class="product">
                <a @click="detail(product.id)">
                    <img class="media-image" :src="product.imageUrl">
                </a>
                <div class="media-body">
                    <a @click="detail(product.id)">
                        <h3>{{ product.title }}</h3>
                    </a>

                    <p>{{ product.description }}</p>

                    <template v-if="product.variants != null && product.variants.length > 0">
                        <h5 class="price">{{ getMinPrice(product)}}</h5>
                    </template>
                </div>
            </div>
        </template>
        <el-row :gutter="20">
            <el-col :span="8" :offset="10">
                <el-pagination background layout="prev,pager,next" :page-count="ProductList.pages" 
                :default-page-size="2" hide-on-single-page @current-change="selectPagination" :current-page="ProductList.currentPage"
                ></el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>

import useProductList from '@/stores/useProductList.js'
import { onMounted } from 'vue'
import { useRoute , useRouter } from 'vue-router'

const ProductList = useProductList()
const route = useRoute();
const router= useRouter();
const detail = (id) => {
    router.push({
        path: `/detail/${id}`
    })
}

const getMinPrice = (product) => {
    var variants = product.variants
    if (product.variants.length == 0) {
        return '';
    }
    else if (product.variants.length == 1) {
        return "￥" + variants[0].price
    }
    var prices = variants.map(variant => variant.price)
    var minPrice = Math.min(...prices)

    return "最低￥" +   minPrice+ "起"
}

const urlParam = route.params.url;
onMounted(async () => {
    if(ProductList.products.length == 0){
        await ProductList.getProductsByCategory(urlParam)
    }
    if(route.params.searchText != undefined&&route.params.page !=undefined){
        await ProductList.getProductsBySearch(route.params.searchText, route.params.page)
    }
})

const selectPagination = async (page)=>{
    await ProductList.getProductsBySearch(ProductList.LastSearchText, page)
    router.push({
        path: `/product/search/${ProductList.LastSearchText}/${page}`
    })
}
</script>

<style scoped>
.container {
    width: 100%;
}

.media-image {
    height: 200px;

    aspect-ratio: 1/1;
    border-radius: 6px;
    margin: 20px;
    transition: transform 0.3s ease;
}

a:hover {
    text-decoration: underline;
    color: cyan;
}

.media-image:hover {
    transform: scale(1.1);
}

.product {
    text-align: center;
    display: flex;
}

.media-body {
    text-align: left;
    flex: 1;
    margin-left: 20px;
}

.price{
    color: red;
}
</style>