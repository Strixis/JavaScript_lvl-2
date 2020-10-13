"use strict";

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Функция для дз
/*const getRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if(xhr.status !== 200) {
                    reject('Error')
                } else {
                    resolve(xhr.responseText);
                }
            }
        }
        xhr.send();
    });
};*/

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
        this.goodsFromServer = [];
        this.goodsInShop = [];
        this.allGoodsCost = 0;
        this._getGoodsFromServer()
            .then(data => {
                this.goodsFromServer = [...data];
                this._render();
                this._setAllGoodsCost(this._calculateAllGoodsCost());
                console.log(this.allGoodsCost);

                document.querySelector(this.container).addEventListener('click', (event) => this._clickHandlerToAddGoodAtBasket(event));
        });
        
        // Функция для дз
        /*this.fetchGoods();*/
    }
    
    /**
     * Получает список товаров.
     * @returns {(Array|string)} Данные с сервера или строку ошибки.
     */
    _getGoodsFromServer() {
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
        
        for (let good of this.goodsFromServer) {
            const goodObject = new GoodsItem(good);
            this.goodsInShop.push(goodObject);
            block.insertAdjacentHTML('beforeend', goodObject._render());
        }
    }
    
    /**
     * Задает суммарную стоимость всех товаров.
     * @param {number} cost - стоимость товаров.
     */
    _setAllGoodsCost(cost) {
        this.allGoodsCost = cost;
    }
    
    /**
     * Вычисляет суммарную стоимость всех товаров.
     * @returns {number} Суммарная стоимость товаров.
     */
    _calculateAllGoodsCost() {
        return this.goodsInShop.reduce((previousValue, currentValue) => {return previousValue + currentValue.price}, 0);
    }
    
    /**
     * Обрабатывает событие клика для добавления товара в корзину
     * @param {MouseEvent} event - событие клика мышью.
     */
    _clickHandlerToAddGoodAtBasket(event) {
        if (event.target.tagName === 'BUTTON') {
            const good = this.getGoodById(event.target.id);
            if (this.goodsInShop.includes(good)) {
                basket.addItemOrIncreaseQuantityAndRender(good);
            }
        }
    }
    
    /**
     * Получает товар по Id.
     * @param {string} goodId - id товара.
     * @returns {Object} Товар.
     */
    getGoodById(goodId) {
        return this.goodsInShop.find((item) => {return String(item.id) === goodId});
    }
    
    // Функция для дз
    /*fetchGoods() {
        getRequest(`${API}/catalogData.json`)
        .then((data) => {
            this.goods = JSON.parse(data);
            this._render();
        })
        .catch((error) => console.log(error));
    }*/
}


/**
 * Класс, представляющий товар.
 */
class GoodsItem {
    /**
     * Создает товар.
     * @param {Object} good - товар.
     */
    constructor(good) {
        this.imgAdress = good.imgAdress !== undefined ? good.imgAdress : 'img/sharp.jpeg';
        this.title = good.product_name;
        this.price = good.price;
        this.description = good.description !== undefined ? good.description : 'There is no description.';
        this.id = good.id_product;
    }
    
    /**
     * Отображает карточку с товаром.
     */
    _render(container = '.products') {
        return `<div class="goods-item">
                <img class="goods-img" src="${this.imgAdress}" alt="${this.title}">
                <h3 class="goods-heading">${this.title}</h3>
                <p class="goods-description">${this.description}</p>
                <p class="goods-price">${this.price}</p>
                <button class="add-button" id=${this.id}>Добавить</button>
            </div>`;
    }
}

/**
 * Класс, представляющий корзину товаров.
 */
class Basket {
    constructor(container = '#basket', buttonContainer = '#basket-button') {
        this.container = container;
        this.buttonContainer = buttonContainer;
        this.allGoods = [];
        this.allGoodsCost = 0;
        this.allGoodsQuantity = 0;
//        this.addItemOrIncreaseQuantityAndRender({title: "Мышка", price: 1000});
//        this.addItemOrIncreaseQuantityAndRender({title: "Ноутбук", price: 45600});
//        this.addItemOrIncreaseQuantityAndRender({title: "Мышка", price: 1000});
//        this._setAllGoodsQuantity(this._calculateQuantity());
        
        this._render();
        
        document.querySelector(this.buttonContainer).addEventListener('click', () => {
            const elemClasses = document.querySelector(this.container).classList;
            elemClasses.toggle('__visible');
            elemClasses.toggle('__invisible');
        })
        
        document.querySelector(this.container).addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const good = this.getGoodById(event.target.id);
                if (this.allGoods.includes(good)) {
                        basket.removeItemOrDecreaseQuantityAndRender(good);
                    }
            }
        })
    }
    
    /**
     * Отображает содержимое корзины.
     */
    _render() {
        const block = document.querySelector(this.container);
        let content = '';
        
        for (let good of this.allGoods) {
           content += good._render(this.container);
        }
        
        if (content === '') {
            block.innerHTML = '<p class="basket-no-item">Empty</p>';
        } else {
            block.innerHTML = content;
        }
    }
    
    /**
     * Добавляет товар в корзину или увеличивает его количество и отображает изменения.
     * @param {Object} good - товар.
     */
    addItemOrIncreaseQuantityAndRender(good) {
        const item = this.allGoods.find((elem) => {return good.title === elem.title});
        if (this.allGoods.includes(item)) {
            item.increaseQuantityByOne();
        } else {
            const goodObject = new BasketItem(good);
            goodObject.increaseQuantityByOne();
            this.allGoods.push(goodObject);
        }
        this._render();
    }
    
    /**
     * Удаляет товар из корзины или уменьшает его количество и отображает изменения.
     * @param {Object} good - товар.
     */
    removeItemOrDecreaseQuantityAndRender(good) {
        const item = this.allGoods.find((elem) => {return good.title === elem.title});
        if (item.quantity === 1) {
            this.allGoods.splice(this.allGoods.indexOf(item), 1);
        } else {
            item.decreaseQuantityByOne();
        }
        this._render();
    }
    
    /**
     * Вычисляет количество товара в корзине.
     * @returns {number} Количество товара.
     */
    _calculateQuantity() {
        return this.allGoods.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.quantity;
        }, 0);
    }
    
    /**
     * Задает количество товара в корзине.
     * @param {number} quantity - Количество товара.
     */
    _setAllGoodsQuantity(quantity) {
        this.allGoodsQuantity = quantity;
    }
    
    /**
     * Получает товар по Id.
     * @param {string} goodId - id товара.
     * @returns {Object} Товар.
     */
    getGoodById(goodId) {
        return this.allGoods.find((item) => {return String(item.id) === goodId});
    }
}

/**
 * Класс, представляющий товар в корзине.
 */
class BasketItem {
    /**
     * Создает товар.
     * @param {Object} good - товар.
     */
    constructor(good) {
        this.title = good.title;
        this.price = good.price;
        this.id = good.id;
        this.quantity = 0;
    }
    
    /**
     * Увеличивает количество товара на 1.
     */
    increaseQuantityByOne() {
        this.quantity += 1;
    }
    
    /**
     * Уменьшает количество товара на 1.
     */
    decreaseQuantityByOne() {
        this.quantity -= 1;
    }
    
    /**
     * Отображает товар.
     */
    _render(container = '#basket') {
        return `<div class="basket-item">
                <p class="basket-product">
                    <span class="basket-product_content">${this.title}</span>
                    <span class="basket-product_content">${this.price}</span>
                    <span class="basket-product_content">x ${this.quantity}</span>
                </p>
                <button class="remove-button" id="${this.id}">Удалить</button>
            </div>`;
    }
}

new GoodsList('.goods-list');
let basket = new Basket('#basket', '.cart-button');