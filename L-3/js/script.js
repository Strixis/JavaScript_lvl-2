"use strict";

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let getRequest = (url, cb) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if(xhr.status !== 200) {
                console.log('Error')
            } else {
                cb(xhr.responseText);
            }
        }
    }
    xhr.send();
}

/**
 * Класс, представляющий список товаров.
 */
class GoodsList {
    /**
     * Создает список товаров.
     * @param {string} container - селектор контейнера.
     */
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allGoods = [];
        this.allGoodsCost = 0;
        this._getGoods()
            .then(data => {
                this.goods = [...data];
                this._render();
                this._fetchAllGoodsCost();
        });
    }
    
    /**
     * Получает список товаров.
     */
    _getGoods() {
       return fetch(`${API}/catalogData.json`)
           .then(response => response.json())
           .catch(error => {
           console.log('Error')
       });
    }
    
    /**
     * Отображает список товаров.
     */
    _render() {
        const block = document.querySelector(this.container);
        
        for (let good of this.goods) {
            const goodObject = new GoodsItem(good);
            this.allGoods.push(goodObject);
            block.insertAdjacentHTML('beforeend', goodObject.render());
        }
    }
    
    /**
     * Получает суммарную стоимость всех товаров.
     */
    _fetchAllGoodsCost() {
        this.allGoodsCost = this.allGoods.reduce((previousValue, currentValue) => {return previousValue + currentValue.price}, this.allGoodsCost);

        console.log(this.allGoodsCost);
    }
}


/**
 * Класс, представляющий товар.
 */
class GoodsItem {
    /**
     * Создает товар.
     * @param {string} good - товар.
     */
    constructor(good) {
        this.imgAdress = good.imgAdress !== undefined ? good.imgAdress : 'img/sharp.jpeg';
        this.title = good.product_name;
        this.price = good.price;
        this.description = good.description !== undefined ? good.description : 'There is no description.';;
    }
    
    /**
     * Отображает карточку с товаром.
     */
    render() {
        return `<div class="goods-item">
                <img class="goods-img" src="${this.imgAdress}" alt="${this.title}">
                <h3 class="goods-heading">${this.title}</h3>
                <p class="goods-description">${this.description}</p>
                <p class="goods-price">${this.price}</p>
                <button class="add-button">Добавить</button>
            </div>`;
    }
}

class Basket {
    /*
    Что есть корзина?
    + В корзине лежат товары, которые мы выбрали.
    Первоначально корзина пуста.
    Мы можем добавить товар в корзину.
    - Корзина должна отображаться.
    -- Корзина должна получать товар.
    --- Корзина должна считать стоимость товаров в ней.
    ---- Корзина должна убирать ненужный товар
    ----- Из корзины можно убрать все товары
    ++ У корзины есть стоимость товаров в ней.
    */
    constructor() {
        /*
        + Значит тут будет что то вроде items = []
        ++ Значит тут будет что то вроде itemsCost = null
        */
    }
    /*
    - Значит тут будет что то вроде _render
    -- Значит тут будет что то вроде _fetchItem
    --- Значит тут будет что то вроде _setItemsCost
    ---- Значит тут будет что то вроде _removeItem
    ----- Значит тут будет что то вроде _removeAllItems
    */
}

class BasketItem {
    /*
    Что есть элемент корзины?
    + Это товар.
    Это товар, который лежит в корзине.
    - Этот товар нужно как то получить.
    ++ Это товар, который имеет количество.
    -- Количество товара может изменяться.
    --- Товар должен отображаться.
    */
    constructor() {
        /*
        + Значит тут будет что то вроде super от GoodsItem
        ++ Значит тут будет что то вроде this.quantity = 0
        */
    }
    /*
    - Значит тут будет что то вроде _getGood
    -- Значит тут будет что то вроде _addQuantity
    -- И еще что то вроде _removeQuantity
    --- Значит тут будет что то вроде _render
    */
}

new GoodsList('.goods-list');