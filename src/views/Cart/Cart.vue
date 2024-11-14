<template>
    <div>
        <template v-if="CartProducts.length > 0">
            <template v-for="(item, index) in CartProducts" :key="index">
                <div class="container">
                    <div class="image-wrapper">
                        <img :src="item.ImageUrl" :alt="item.Title">
                    </div>
                    <div class="name">
                        <div>
                            <h4>
                                <a @click="detail(item.ProductId)">
                                    {{ item.Title }}
                                </a>
                            </h4>
                        </div>
                        <div>
                            <span class="product-type">{{ item.ProductType }}</span>
                        </div>
                        <div style="margin-left: 0;">
                                <el-input-number style="width: 100px;" v-model="item.Quantity" :min="1" :max="10" @change="handleChange(item)"
                                size="small" />                         
                        </div>
                        <div class="price">
                            <span class="price-tag">￥</span>
                            {{ (item.Price * item.Quantity).toFixed(2) }}
                        </div>
                        <div>
                            <el-button class="remove-btn" type="danger" @click="remove(product, index)">
                                移除购物车
                            </el-button>
                        </div>

                    </div>

                </div>
            </template>

            <div class="total">
                <div>
                    <span>总计{{ CartProducts.length }}件商品: </span>
                    <span class="total-price">￥{{ CartProducts.reduce((acc, cur) => acc + cur.Price * cur.Quantity, 0).toFixed(2) }}元</span>
                </div>
                <div>
                    <el-button size="large"  style="border-radius: 30px;border: none; margin-left: 10px ; background-color: rgb(236, 88, 2);" type="primary" @click="checkout">去结算</el-button>
                </div>  
            </div>

        </template>
        <template v-if="CartProducts.length === 0 && !isloaded">
            <h2>购物车为空</h2>
            <p>去<router-link to="/">首页</router-link>逛逛吧</p>
        </template>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import useCart from '@/stores/useCart'
import { useRouter } from 'vue-router';
import useProductList from '@/stores/useProductList';

const ProductList = useProductList();
const Cart = useCart();
const router = useRouter();
const CartProducts = ref([]);
const isloaded = ref(false);

onMounted(async () => {
    isloaded.value = true;
    Cart.CartProduct = [];
    var Ids = [...new Set(Cart.Cart.map(item => item.productId))]
    if (Ids.length === 0) {
        CartProducts.value = [];
        isloaded.value = false;
        return;
    }
    var products = await ProductList.getProductByIds(Ids);
    var variantsList = []

    products.forEach(product => {
        product.variants.forEach(v => {
            variantsList.push(v);
        })
    })
    var typeIds = [...new Set(variantsList.map(v => v.productTypeId))]
    var productTypes = await ProductList.getProductTypeByIds(typeIds);

    for (const item of Cart.Cart) {
        // var variantProduct = await ProductList.getProductVariant(item.productId, item.productTypeId)
        var variantProduct = variantsList.find(v => v.productId === item.productId && v.productTypeId === item.productTypeId)
        if (variantProduct === undefined) {
            console.log('variantProduct is undefined')
            continue
        }
        var cartObj = {}

        const product = products.find(prod => prod.id === item.productId)
        if (product === undefined) {
            console.log('product is undefined')
            continue
        }
        var productType = productTypes.find(type => type.id === variantProduct.productTypeId)
        cartObj = {
            ProductId: product.id,
            Title: product.title,
            ImageUrl: product.imageUrl,
            ProductTypeId: variantProduct.productTypeId,
            ProductType: productType.name,
            Price: variantProduct.price,
            Quantity: item.Quantity,
        }
        Cart.CartProduct.push(cartObj)
    }
    CartProducts.value = Cart.CartProduct;
    console.log(Cart.CartProduct)
    isloaded.value = false;
});

const detail = (id) => {
    router.push(`/detail/${id}`)
}

const handleChange = async(product)=>{
    await Cart.updateQuantity(product);
}

const remove = async(product, index) => {
    CartProducts.value.splice(index, 1);
    await Cart.removeFromCart(product,index);
}
const checkout = () =>{

}


</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0px 8px 50px;
    min-height: 120px;
}

.name {
    padding-left: 50px;
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    max-height: 120px;
}

.name div {
    width: 100%;
    margin-left: 20px;
    margin-right: 20px;
    text-align: left;
    /* min-width: 100px; */
}
.name div:first-of-type{
    min-width: 100px;
}
.name div:nth-of-type(2){
    min-width: 50px;
}

.image-wrapper {
    max-width: 120px;
}

.image-wrapper img {
    min-height: 120px;
    min-width: 120px;
    width: 100%;
    aspect-ratio: 1/1;
    transition: transform 0.2s ease-in-out;

}

.image-wrapper img:hover {

    transform: scale(1.1);
}
.total{
    align-items: center;
    position: fixed; /* 固定在视口底部 */
    bottom: 0; /* 固定在底部 */
    left: 0; /* 容器从左侧开始 */
    /* height: 60px; */
    /* border-top: 1px solid #e1e1e1; */
    width: 100%;
    display: flex;
    justify-content: right;
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0px -1px 5px rgba(102, 102, 102, 0.1);
    /* padding: 0 0 0 0; */
}
.product-type{
    font-weight: 450;
    color: rgba(56, 56, 56, 0.679);
}
.price{
    color:rgb(236, 2, 2);
    font-weight: 600;
    font-size:larger;
    text-wrap: nowrap;
}
.price-tag{
    font-size:medium;
}
.total-price{
    color:rgb(236, 88, 2);
    font-weight: 700;
}

@media (max-width: 1024px) {
    .name{
        padding-left: 10px;
    }
    .name div{
        margin: 0 5px 0 5px;
    }
}
@media (max-width: 500px) {
    .name{
        padding-left: 10px;
        flex-direction: column;
    }
    /* .container{
        flex-direction: column;
    } */
    .name div{
        margin: 0 5px 0 5px;
        text-align: center;
    }
}
</style>