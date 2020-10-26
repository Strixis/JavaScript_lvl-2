const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        serverError: '',
        
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
                    this.serverError = error;
                    console.log(error);
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
});