import axios from 'axios';
import { defineStore } from 'pinia';

const BASE_URL = 'http://localhost:5216/';
const useProductList = defineStore('productList', {
    state: () => ({
        products: [],
        productTypes: [],
        productType:[],
        pages: 1,
        currentPage: 1,
        LastSearchText: ""
    }),
    getters: {
        GetProductById: (state) => (id) => {
            return state.products.find(product => product.id === id);
        },
    },
    actions: {
        clearPage(){
            this.pages = 0;
            this.currentPage = 0;
            this.LastSearchText = "";
        },
        async getAllProduct() {
            await axios.get(BASE_URL + 'api/Product/GetProductList').then(res => {
                this.products = res.data.data;
            })
        },
        async getProductsByCategory(index) {
            await axios.get(BASE_URL + 'api/Product/GetProductListByCategoryUrl/' + index).then(res => {
                console.log(index);
                this.products = res.data.data;
            })
        },
        async getProductsByFeatured() {
            await axios.get(BASE_URL + 'api/Product/GetFeaturedProductList').then(res => {
                this.products = res.data.data;
            })
        },
        async getProductById(id) {
            await axios.get(BASE_URL + 'api/Product/GetProductById/' + id).then(res => {
                this.products = res.data.data;
            })
            return this.products
        },
        async getProductByIds(ids) {    
            await axios.post(BASE_URL + 'api/Product/GetProductByIds'  ,ids , {headers: {'Content-Type': 'application/json'}}).then(res => {
                this.products = res.data.data;
            })
            return this.products
        },
        async getProductTypeByProductId(id) {
            await axios.get(BASE_URL + 'api/ProductType/GetProductTypeByProductId/' + id).then(res => {
                this.productTypes = res.data.data;
            }) 
        },
        async getProductTypeById(id) {
            await axios.get(BASE_URL + 'api/ProductType/GetProductTypeById/' + id).then(res => {
                this.productType = res.data.data;
            }) 
            return this.productType
        },
        async getProductTypeByIds(ids) {
            await axios.post(BASE_URL + 'api/ProductType/GetProductTypeByIds'  ,ids , {headers: {'Content-Type': 'application/json'}}).then(res => {
                this.productTypes = res.data.data;
            })
            return this.productTypes
        },
        async getProductSuggestions(searchText){
            const response = await axios.get(BASE_URL + 'api/Product/GetProductSearchSuggestions/' + searchText)
            return response.data;
        },
        async getProductsBySearch(searchText){
            await axios.get(BASE_URL + 'api/Product/GetProductListBySearch/' + searchText).then(res => {
                this.products = res.data.data;
            })
        },
        async getProductsBySearch(searchText, page){
            await axios.get(BASE_URL + 'api/Product/GetProductListBySearch/' + searchText + '/' + page).then(res => {
                this.LastSearchText = searchText;
                const result = res.data.data;
                if(result!= null&& result.products.length > 0){
                    this.pages = result.pages
                    this.currentPage = result.currentPage;
                    this.products = result.products;
                }
            })
        },

    }
});

export default useProductList;