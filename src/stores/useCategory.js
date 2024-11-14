import axios from "axios";
import { defineStore } from "pinia";

const BASE_URL = 'http://localhost:5216/';

const useCategory = defineStore('Category', {
    state: () => ({
        Categories: [],
    }),
    getters: {},
    actions: {
        async getCategories() {
             await axios.get(BASE_URL + 'api/Category/GetCategories').then(res => (
                this.Categories = res.data.data
            ))
        }
    },
})

export default useCategory;
