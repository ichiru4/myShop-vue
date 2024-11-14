import axios from "axios";
import { defineStore } from "pinia";
import { createWebHistory } from "vue-router";

const BASE_URL = "http://localhost:5216/"

const useCart = defineStore("cart",{
    state: () => ({
        Cart: [],
        CartProduct: [],
    }),
    getters:{
        GetCartItemCount(state) {
            return state.Cart.reduce(total=>total+1, 0)
        },
        GetCartItemToCart(){
            const localCart = localStorage.getItem("cart");
            return localCart? JSON.parse(localCart) : [];
        }
    },
    actions: {
        async AddToCart(cartItem){
            const localCart = localStorage.getItem("cart");
            this.Cart = localCart? JSON.parse(localCart) : [];
            const sameItem = this.Cart.find(item=>item.productId===cartItem.productId&&item.productTypeId===cartItem.productTypeId);
            if(sameItem===undefined){
                this.Cart.push(cartItem);
            }else{
                sameItem.Quantity+=cartItem.Quantity
            }
            localStorage.setItem("cart",JSON.stringify(this.Cart));
        },
        async updateQuantity(product){
            this.Cart = this.GetCartItemToCart;
            const sameItem = this.Cart.find(item=>item.productId===product.ProductId&&item.productTypeId===product.ProductTypeId);
            if(sameItem===undefined){
                console.log("Item not found in cart");
                return;
            }else{
                sameItem.Quantity = product.Quantity;
            }
            localStorage.setItem("cart",JSON.stringify(this.Cart));
        },
        async removeFromCart(product,index){
            this.Cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(this.Cart));
        }
        ,
        async getProductVariant(id,typeId){
            // const variant = await axios
        }
    }
})

export default useCart;
