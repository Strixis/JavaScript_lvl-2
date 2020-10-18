"use strict";

class Validator {
    constructor(listOfMatches, formSelector, buttonClass, errorFieldClass, errorMessageClass, visibilityClass) {
        //Date from user
        this.matchesList = listOfMatches;
        this.formSelector = formSelector;
        this.buttonClass = buttonClass;
        this.errorFieldClass = errorFieldClass;
        this.errorMessageClass = errorMessageClass;
        this.visibilityClass = visibilityClass;
        //Date from user date
        this.rulesList = [];
        this.fieldClassList = [];
        //HTML-elements date
        this.formElem = null;
        this.buttonElem = null;
        this.errorMessageElemList = [];
        this.fieldElemList = [];
        //Validate data
        this.resultList = [];
        this.result = null;
        
        this._init();
    }
    
    _init() {
        this.setRulesList(this.getRulesListFromMatchesList());
        this.setFieldClassList(this.getFieldClassListFromMatchesList());
        
        this.setFormElem(this.getFormElemBySelector(this.formSelector));
        this.setButtonElem(this.getButtonElemByClass(this.buttonClass));
        this.setErrorMessageElemList(this.getErrorMessageElemListFromFormByClass(this.errorMessageClass));
        this.setFieldElemList(this.getFieldElemListBySelectorList(this.fieldClassList));
        
        this.setResult(false);
        
        this.formElem.addEventListener('click', event => this.clickHandler(event));
    }
    
    setRulesList(list) {
        this.rulesList = list;
    }
    getRulesListFromMatchesList() {
        return Object.values(this.matchesList);
    }
    
    setFieldClassList(list) {
        this.fieldClassList = list;
    }
    getFieldClassListFromMatchesList() {
        const result = [];
        for (let key in this.matchesList) {
            result.push(`.${key}`);
        }
        return result;
    }
    
    setFormElem(elem) {
        this.formElem = elem;
    }
    getFormElemBySelector(selector) {
        return document.querySelector(selector);
    }
    
    setButtonElem(elem) {
        this.buttonElem = elem;
    }
    getButtonElemByClass(elemClass) {
        return document.querySelector(`.${elemClass}`);
    }
    
    setErrorMessageElemList(list) {
        this.errorMessageElemList = list;
    }
    getErrorMessageElemListFromFormByClass(elemClass) {
        return this.formElem.querySelectorAll(`.${elemClass}`);
    }
    
    setFieldElemList(list) {
        this.fieldElemList = list;
    }
    getFieldElemListBySelectorList(list) {
        let result = [];
        for (let selector of list) {
            result.push(this.formElem.querySelector(selector));
        }
        return result;
    }
    
    setResult(result) {
        this.result = result;
    }
    
    clickHandler(event) {
        if (event.target.classList.contains(this.buttonClass)) {
            const validationResult = this._validate();
            this.setResultList(validationResult.resultList);
            this.setResult(validationResult.result);
            if (this.result) {
                event.preventDefault();
                this.render();
                alert('Данные отправлены!');
            } else {
                event.preventDefault();
                this.render();
            }
        }
    }
    
    _validate() {
        const fieldElems = this.getFieldElemList(),
              rules = this.getRulesList(),
              resultList = [];
        let result = false;
        
        for (let i = 0; i < fieldElems.length; i++) {
            resultList.push(this._validateField(fieldElems[i], rules[i]));
        }
        result = !resultList.includes(false);
        
        return {resultList: resultList, result: result};
    }
    
    getFieldElemList() {
        return this.fieldElemList;
    }
    
    getRulesList() {
        return this.rulesList;
    }
    
    _validateField(fieldElem, rule) {
        const fieldValue = fieldElem.value;
        if (rule[0] === 'regexp') {
            return fieldValue.match(rule[1]) === null ? false : true;
        } else if (rule[0] === 'func') {
            return rule[1](fieldValue);
        } else {
            console.error(`Задайте тип проверки как 'regexp' для регулярного выражения или 'func' если используете свою функцию проверки для поля ${fieldElem.className}`);
            return false;
        }
    }
    
    setResultList(list) {
        this.resultList = list;
    }
    
    render() {
        const fieldElemList = this.getFieldElemList(),
              errorMessageElemList = this.getErrorMessageElemList(),
              resultList = this.getResultList();
        for (let i = 0; i < fieldElemList.length; i++) {
            if (resultList[i]) {
                this.hideError(fieldElemList[i], errorMessageElemList[i]);
            } else {
                this.showError(fieldElemList[i], errorMessageElemList[i]);
            }
        }
    }
    
    getErrorMessageElemList() {
        return this.errorMessageElemList;
    }
    
    getResultList() {
        return this.resultList;
    }
    
    hideError(fieldElem, messageElem) {
        fieldElem.classList.remove(this.getErrorFieldClass());
        messageElem.classList.remove(this.getVisibilityClass());
    }
    
    getErrorFieldClass() {
        return this.errorFieldClass;
    }
    
    getVisibilityClass() {
        return this.visibilityClass;
    }
    
    showError(fieldElem, messageElem) {
        fieldElem.classList.add(this.getErrorFieldClass());
        messageElem.classList.add(this.getVisibilityClass());
    }
}

/* Пример пользовательской функции для проверки соответствия значения полей телефона и имени
function sameValue(fiedlValue) {
    const sameElem = run.getFieldElemList()[0].value;
    return fieldValue === sameElem;
}*/

const fieldClassesAndRules = {
    name: ['regexp', /^[a-zA-Zа-яА-яЁё]+$/],
    phone: ['regexp', /^(\+\d\(\d{3}\)\d{3}-\d{4})$/], //Пример того, как мы можем проверить являются ли имя и телефон одинаковыми: ['func', sameValue]
    mail: ['regexp', /^[a-z]{2}[\.-]?[a-z]+@[a-z]+\.[a-z]{2,6}$/], //Вариант проверки почты прямо как в дз: ^my[-.]?mail@mail.ru$
    comment: ['regexp', /.+/]
}

const run = new Validator(fieldClassesAndRules, '.form', 'button-submit', 'invalid', 'field_invalid', '__visible');