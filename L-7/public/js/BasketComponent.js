Vue.component('basket', {
    data() {
        return {
           basketUrl: `/getBasket.json`,
            addProductUrl: `/addToBasket.json`,
            removeProductUrl: `/deleteFromBasket.json`,
            basketProducts: [],
            isVisibleBasket: false, 
        }
    },
    methods: {
        toggleBasket() {
            this.isVisibleBasket = !this.isVisibleBasket;
            console.log(this.basketProducts);
        },
        addProduct(product) {
            let alreadyExistProduct = this.basketProducts.find(good => good.id_product === product.id_product);
            if (alreadyExistProduct){
                this.$root.putJson(`/api/cart/${alreadyExistProduct.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            alreadyExistProduct.quantity++;
                        }
                    })
            } else {
                let newProduct = Object.assign({quantity: 1}, product);
                this.$root.postJson(`/api/cart`, newProduct)
                    .then(data => {
                        if(data.result === 1){
                            this.basketProducts.push(newProduct);
                        }
                    })
            }
        },
        removeProduct(product) {
            if (product.quantity > 1) {
                this.$root.putJson(`/api/cart/${product.id_product}`, {quantity: -1})
                    .then(data => {
                        if(data.result === 1){
                            product.quantity--;
                        }
                    })
            } else {
                let productIndex = this.basketProducts.indexOf(product);
                this.$root.deleteJson(`/api/cart`, product)
                    .then(data => {
                        if(data.result === 1){
                            this.basketProducts.splice(productIndex, 1);
                        }
                    })
            }
        },
        /*
        removeProduct(product) {
           this.$root.getJson(`${API + this.removeProductUrl}`)
                .then((data) => {
                    if (data.result === 1) {
                        if (product.quantity > 1) {
                            product.quantity--;
                        } else {
                            let productIndex = this.basketProducts.indexOf(product);
                            this.basketProducts.splice(productIndex, 1);
                        }
                    }
            })
        },
        */
    },
    computed: {
        calculateCost() {
            return this.basketProducts.reduce((accumulator, currentValue) => {return accumulator + (currentValue.price * currentValue.quantity)}, 0);
        },
    },
    mounted() {
        this.$root.getJson(`api/cart`)
            .then((data) => {
                for (let elem of data.contents) {
                    this.basketProducts.push(elem);
                }
        });
    },
    template: `<div class="basket-wrapper">
                <div class="basket" :class="{__hidden: isVisibleBasket}"></div>
                <div class="basket basket_with-goods" v-show="isVisibleBasket">
                    <div class="basket_items">
                        <basket-item class="basket-item"
                        v-for="product of basketProducts"
                        :key="product.product_id"
                        :basketItem="product"
                        @removeProduct="removeProduct">
                        </basket-item>
                    </div>
                    <span class="total-cost" v-if="basketProducts.length > 0">Общая стоимость: {{calculateCost}}р</span>
                    <span class="total-cost" v-else>Empty</span>
                </div>
            </div>`
});

Vue.component('basket-item', {
    props: ['basketItem'],
    template: `<div>
                    <span class="basket-item_title">{{basketItem.product_name}}</span>
                    <span class="basket-item_price">Цена: {{basketItem.price}}р</span>
                    <span class="basket-item_quantity">Количество: {{basketItem.quantity}}</span>
                    <span class="basket-item_cost">Стоимость: {{basketItem.quantity * basketItem.price}}р</span>
                    <button class="remove-button" @click="$emit('removeProduct', basketItem)">Удалить</button>
                </div>`
})