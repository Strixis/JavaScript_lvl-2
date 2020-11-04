const feedbackForm = {
    data() {
        return {
            nameValue: '',
            phoneValue: '',
            mailValue: '',
            commentValue: '',
            validationResults: [true, true, true, true],
        }
    },
    methods: {
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
    template: `<form action="#" class="feedback-form">
                <div class="feedback">
                    <span class="feedback_title">Contact us</span>
                    <label for="name" class="field">
                        <span class="field_title">Name:</span>
                        <span class="field_error" v-show="!validationResults[0]">The name must contain only letters.</span>
                        <input type="text" class="field_enter" id="name" v-model.lazy="nameValue" :class="{__error: !validationResults[0]}">
                    </label>
                    <label for="phone" class="field">
                        <span class="field_title">Phone:</span>
                        <span class="field_error" v-show="!validationResults[1]">The phone should look like +7(000)000-0000</span>
                        <input type="text" class="field_enter" id="phone" v-model.lazy="phoneValue" :class="{__error: !validationResults[1]}">
                    </label>
                    <label for="mail" class="field">
                        <span class="field_title">E-mail:</span>
                        <span class="field_error" v-show="!validationResults[2]">E-mail must look like this mymail@mail.ru, or my.mail@mail.ru, or my-mail@mail.ru</span>
                        <input type="text" class="field_enter" id="mail" v-model.lazy="mailValue" :class="{__error: !validationResults[2]}">
                    </label>
                    <label for="comment" class="field">
                        <span class="field_title">Comment:</span>
                        <span class="field_error" v-show="!validationResults[3]">Must contain at least 1 character.</span>
                        <textarea class="field_enter" id="comment" v-model.lazy="commentValue" :class="{__error: !validationResults[3]}"></textarea>
                    </label>   
                    <input type="submit" class="feedback-form_submit-button" value="Submit" @click="validate($event)">             
                </div>
            </form>`
};

export default feedbackForm;