<template>
    <div class="media" v-if="product!=null">
        <div class="media-img-wrapper" >
            <img class="media-img" v-if="product.imageUrl" :src="product.imageUrl" :alt="product.title">
        </div>
        <div class="media-body">
            <h2>{{ product.title }}</h2>
            <p>{{ product.description }}</p>

            <template v-if="product.variants!=null && product.variants.length>1">
                <el-radio-group v-model="currentTypeId" class="ml-4">
                    <el-radio v-for="productType in productTypes" :key="productType.id" :label="productType.id">
                        {{ productType.name }}
                    </el-radio>
                </el-radio-group>
            </template>

            <template v-if="GetSelectedProductVariant() != null">
                <template v-if="GetSelectedProductVariant().originalPrice > GetSelectedProductVariant().price">
                    <h5 class="text-muted orginal-price">
                        原价：￥{{ GetSelectedProductVariant().originalPrice }}
                    </h5>
                </template>
                <h4 class="price">
                    到手价：￥{{ GetSelectedProductVariant().price }}
                </h4>
            </template >

            <el-button color="blueviolet" style="" :icon="ShoppingCart" @Click="AddToCart">加入购物车</el-button>
        </div>
    </div>
</template>


<script setup>
import useProductList from '@/stores/useProductList';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ShoppingCart } from '@element-plus/icons-vue';
import useCart from '@/stores/useCart';

const currentTypeId = ref("e84893a3-cad7-4ef3-8f7d-58e090c7f128")
const product = ref({})
const ProductList = useProductList()
const route = useRoute()
const productTypes = ref([])
const Cart = useCart()
const GetSelectedProductVariant = () => {
    if (product.value.variants != undefined) {
        var selectedVariant = product.value.variants.find(x => x.productTypeId == currentTypeId.value);
        return selectedVariant;
    }
}

const AddToCart = async () =>{
    var variant = GetSelectedProductVariant();
    var cartItem = {
        productId: variant.productId,
        productTypeId: variant.productTypeId,
        Quantity: 1,
    }
    await Cart.AddToCart(cartItem);
}

onMounted(async () => {
    if (ProductList.products.length === 0) {
        // console.log("loading products...")
        await ProductList.getAllProduct();

    }
    product.value = await ProductList.getProductById(route.params.id)
    if (product.value && product.value.variants && product.value.variants.length > 0) {
        productTypes.value = product.value.variants.map(x => x.productType)
        var prices = product.value.variants.map(variant => variant.price)
        var minPrice = Math.min(...prices);
        currentTypeId.value = product.value.variants.find(x => x.price === minPrice).productTypeId;
    }
})
</script>

<style scoped>
.media {
    display: flex;
    align-items: stretch;
}

.media-img {
    max-width: 100%;
    max-height: 100%;
    aspect-ratio: 1/1;
    border-radius: 6px;
    margin: 0 10px 10px 10px;
}

.media-img-wrapper {
    max-width: 350px;
    max-height: 350px;
    text-align: center;
    flex: 1;
}

.media-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    padding: 15px 0 0 15px;
}

.orginal-price {
    text-decoration: line-through;
    font-weight: bolder;
}


.price {
    color: red;
}
</style>