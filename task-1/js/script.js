"use strict";

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: `/catalogData.json`,
        products: [],
        imgCatalog: 'img/sharp.jpeg',
        
        searchLine: '',

    },
    
    methods: {
        getJson(url) {
            return fetch(url)
               .then(response => response.json())
               .catch(error => {
                    console.log(error);
            })
        },
        filterGoods() {
            console.log(`Мы ищем: ${this.searchLine}`);
        }
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then((data) => {
                for (let elem of data) {
                        this.products.push(elem);
                    }               
        });
    }
});