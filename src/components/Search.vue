<template>
    <div class="search-body">
        <el-autocomplete v-model="searchText" size="large" style="width:100%" :fetch-suggestions="querySearch"
            :trigger-on-focus="false" placeholder="请输入想要的商品" class="search-input" select-when-unmatched clearable
            :sufix-icon="Search" @select="handleSelect">

        </el-autocomplete>
    </div>
</template>

<script setup>
import {  onMounted, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import useProductList from '@/stores/useProductList'

const ProductList = useProductList()
const router = useRouter()

const searchText = ref('')
const suggestions = ref([])

const createFilter = (queryString) => {
    return (suggestion) => {
        return suggestion.value.toLowerCase().indexOf(queryString.toLowerCase())
    }
}

const querySearch = async (queryString, cb) => {
    suggestions.value = await ProductList.getProductSuggestions(queryString);
    const suggestionsWithId = suggestions.value.data.map((item, index) => {
        return { id: index + 1, value: item }
    })
    const results = queryString ? suggestionsWithId.filter(createFilter(queryString)) : suggestionsWithId
    cb(results)
}

async function handleSelect(selectItem) {
    await ProductList.getProductsBySearch(selectItem.value, 1)
    router.push({
        path: `/product/search/${selectItem.value}/1`,
    })
}


</script>

<style scoped>
.search-body {
    margin: 15px;
    width: 100%;
}
</style>