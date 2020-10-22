"use strict";

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: `/catalogData.json`,
        productsFromServer: [],
        imgCatalog: 'img/sharp.jpeg',
        dummyNoData: 'Нет данных',
        
        searchLine: '',
        products: [],
        
        basketUrl: `/getBasket.json`,
        addProductUrl: `/addToBasket.json`,
        removeProductUrl: `/deleteFromBasket.json`,
        basketProducts: [],
        isVisibleBasket: false,
        
        nameValue: '',
        phoneValue: '',
        mailValue: '',
        commentValue: '',
        validationResults: [true, true, true, true],
    },
    
    methods: {
        getJson(url) {
            return fetch(url)
               .then(response => response.json())
               .catch(error => {
                    console.log(error);
            })
        },
        filterProducts() {
            if (this.searchLine === '') {
                this.products = this.productsFromServer;
            } else {
                this.products = this.productsFromServer.filter((product) => product.product_name.toLowerCase().includes(this.searchLine.toLowerCase()));
            }
        },
        toggleBasket(event) {
            if (this.isVisibleBasket) {
                this.isVisibleBasket = false;
            } else {
                this.isVisibleBasket = true;
            }
            
        },
        addProduct(product) {
            this.getJson(`${API + this.addProductUrl}`)
                .then((data) => {
                    if (data.result === 1) {
                        const alreadyExist = this.basketProducts.find((good) => {
                            return good.id_product === product.id_product;
                        })
                        if (alreadyExist) {
                            for (let good of this.basketProducts) {
                                if (good.id_product === product.id_product)  {
                                    return good.quantity++;
                                }
                            }
                        } else {
                            this.$set(product, 'quantity', 1);
                            this.basketProducts.push(product);
                        }
                    }
            })
        },
        removeProduct(product) {
           this.getJson(`${API + this.removeProductUrl}`)
                .then((data) => {
                    if (data.result === 1) {
                        if (product.quantity > 1) {
                            for (let good of this.basketProducts) {
                                if (good.id_product === product.id_product)  {
                                    return good.quantity--;
                                }
                            }
                        } else {
                            let productIndex = this.basketProducts.indexOf(product);
                            this.basketProducts.splice(productIndex, 1);
                        }
                    }
            })
        },
        validate(event) {
            const results = [];
            
            results.push(this.isValidName);
            results.push(this.isValidPhone);
            results.push(this.isValidMail);
            results.push(this.isValidComment);
            
            this.validationResults = results;
            if (!results.includes(false)) {
                event.preventDefault();
                alert('Данные отправлены!');
            } else {
                event.preventDefault();
            }
        }
    },
    computed: {
        calculateCost() {
            return this.basketProducts.reduce((accumulator, currentValue) => {return accumulator + (currentValue.price * currentValue.quantity)}, 0);
        },
        isValidName() {
            return this.nameValue.match(/^[a-zA-Zа-яА-яЁё]+$/) === null ? false : true;
        },
        isValidPhone() {
            return this.phoneValue.match(/^(\+\d\(\d{3}\)\d{3}-\d{4})$/) === null ? false : true;
        },
        isValidMail() {
            return this.mailValue.match(/^[a-z]{2}[\.-]?[a-z]+@[a-z]+\.[a-z]{2,6}$/) === null ? false : true;
        },
        isValidComment() {
            return this.commentValue.match(/.+/) === null ? false : true;
        }
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then((data) => {
                for (let elem of data) {
                        this.productsFromServer.push(elem);
                        this.products.push(elem);
                    }               
        });
        this.getJson(`${API + this.basketUrl}`)
            .then((data) => {
                for (let elem of data.contents) {
                    this.basketProducts.push(elem);
                }
        });
    }
});