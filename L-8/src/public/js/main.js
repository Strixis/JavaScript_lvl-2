import basket from './BasketComponent'
import productList from './ProductListComponent'
import serverError from './ServerErrorComponent'
import search from './SearchComponent'
import feedbackForm from './FeedbackFormComponent'

const app = {
    el: '#app',
    components: {
        basket,
        productList,
        serverError,
        search,
        feedbackForm
    },
    data: {
        serverError: '',
    },
    
    methods: {
        getJson(url) {
            return fetch(url)
               .then(response => response.json())
               .catch(error => {
                    this.serverError = error;
            })
        },
        postJson(url, data){
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    this.serverError = error;
                })
        },
        putJson(url, data){
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    this.serverError = error;
                })
        },
        deleteJson(url, data){
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    this.serverError = error;
                })
        },
    },
};

export default app;