const search = {
    data() {
        return {
            searchLine: '',
        };
    },
    methods: {
        filterProducts() {
            const porductListAPI = this.$root.$refs['product-list'];
            if (this.searchLine === '') {
                porductListAPI.products =  porductListAPI.productsFromServer;
            } else {
                porductListAPI.products = porductListAPI.productsFromServer.filter((product) => product.product_name.toLowerCase().includes(this.searchLine.toLowerCase()));
            }
        },
    },
    template: `<form action="" class="search-form">
                    <input type="text" class="search-form_search-field" v-model.lazy="searchLine">
                    <input type="submit" class="search-form_submit-button" value="Search" @click.prevent="filterProducts">
                </form>`
};

export default search;