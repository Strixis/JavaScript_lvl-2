Vue.component('product-list', {
    data() {
        return {
            catalogUrl: `/catalogData.json`,
            productsFromServer: [],
            products: [],
            imgCatalog: 'img/sharp.jpeg',
            dummyNoData: 'Нет данных',
        }
    },
    mounted() {
        this.$root.getJson(`${API + this.catalogUrl}`)
            .then((data) => {
                for (let elem of data) {
                        this.productsFromServer.push(elem);
                        this.products.push(elem);
                    }               
        });
    },
    template: `<section class="goods-list" v-if="products.length">
                   <products class="good-item"
                   v-for="product of products"
                   :key="product.id_product"
                   :dummy="imgCatalog"
                   :product="product"></products>
               </section>
               <section class="goods-list" v-else>{{dummyNoData}}</section>`
});

Vue.component('products', {
    props: ['product', 'dummy'],
    data() {
        return {
            basketAPI: this.$root.$refs.basket,
        };
    },
    template: `<div>
                    <img :src="product.img ? product.img : dummy" alt="title" class="good-item_img" height="150">
                    <span class="good-item_title">{{product.product_name}}</span>
                    <span class="good-item_description">{{product.description ? product.description : 'Description'}}</span>
                    <span class="good-item_price">{{product.price}}</span>
                    <button class="button-add" @click="basketAPI.addProduct(product)">Add</button>
                </div>`
})