const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        serverError: '',
    },
    
    methods: {
        getJson(url) {
            return fetch(url)
               .then(response => response.json())
               .catch(error => {
                    this.serverError = error;
                    console.log(error);
            })
        },
    },
});