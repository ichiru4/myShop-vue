<template>
    <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="FindProductByCategory">
        <div class="flex-grow"></div>
        <el-menu-item index="feature">首页</el-menu-item>
        <div class="flex-grow"></div>

        <template v-for="category in Categories.Categories" :key="category.id">
            <el-menu-item :index="category.url">{{ category.name }}</el-menu-item>
            <div class="flex-grow"></div>

        </template>
    </el-menu>
    

</template>

<script setup>
import {  onMounted } from 'vue';
import useCategory from "@/stores/useCategory"
import useProductList from "@/stores/useProductList"
import router from '@/router';
const Categories  = useCategory();
onMounted(async () => {
        await Categories.getCategories();
});
const ProductList = useProductList();
const FindProductByCategory =  async(index) => {
    ProductList.clearPage();
    if(index!= "feature"){
        await ProductList.getProductsByCategory(index);
    }
    else{
        await ProductList.getProductsByFeatured();
    }
    router.push({
        path: '/product/'+index
    })
}
</script>

<style scoped>
.flex-grow {
    flex: 1;
}
</style>