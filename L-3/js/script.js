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
        this.goods = [];
        this.allGoods = [];
        this.allGoodsCost = 0;
        this._getGoods()
            .then(data => {
                this.goods = [...data];
                this._render();
                this._fetchAllGoodsCost();
            console.log(this.goods);
            console.log(this.allGoods);
        });
        
        // Функция для дз
        /*this.fetchGoods();*/
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
        this.description = good.description !== undefined ? good.description : 'There is no description.';
        this.id = good.id_product;
    }
    
    /**
     * Отображает карточку с товаром.
     */
    render(container = '.products') {
        return `<div class="goods-item">
                <img class="goods-img" src="${this.imgAdress}" alt="${this.title}">
                <h3 class="goods-heading">${this.title}</h3>
                <p class="goods-description">${this.description}</p>
                <p class="goods-price">${this.price}</p>
                <button class="add-button" id=${this.id}>Добавить</button>
            </div>`;
    }
}

class Basket {
    constructor(container = '#basket', buttonContainer = '#basket-button') {
        this.container = container;
        this.buttonContainer = buttonContainer;
        this.allGoods = [];
        this.allGoodsCost = 0;
        this.allGoodsQuantity = 0;
//        this.addItem({product_name: "Мышка", price: 1000});
//        this.addItem({product_name: "Ноутбук", price: 45600});
//        this.addItem({product_name: "Мышка", price: 1000});
//        this.setAllGoodsQuantity(this.calculateQuantity());
        
        this.render();
        document.querySelector(this.buttonContainer).addEventListener('click', () => {
            const elemClasses = document.querySelector(this.container).classList;
            elemClasses.toggle('__visible');
            elemClasses.toggle('__invisible');
        })
    }
    
    render() {
        const block = document.querySelector(this.container);
        let content = '';
        
        for (let good of this.allGoods) {
           content += good.render(this.container);
        }
        
        if (content === '') {
            block.innerHTML = 'Empty';
        } else {
            block.innerHTML = content;
        }
    }
    
    addItem(good) {
        const item = this.allGoods.find((elem) => {return good.product_name === elem.title});
        if (this.allGoods.includes(item)) {
            item.increaseQuantityByOne();
        } else {
            const goodObject = new BasketItem(good);
            goodObject.increaseQuantityByOne();
            this.allGoods.push(goodObject);
        }
        this.render();
    }
    
    removeItemOrDecreaseQuantity(good) {
        const item = this.allGoods.find((elem) => {return good.product_name === elem.title});
        if (item.quantity === 1) {
            this.allGoods.splice(this.allGoods.indexOf(item), 1);
        } else {
            item.decreaseQuantityByOne();
        }
        this.render();
    }
    
    calculateQuantity() {
        return this.allGoods.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.quantity;
        }, 0);
    }
    
    setAllGoodsQuantity(quantity) {
        this.allGoodsQuantity = quantity;
    }
}

class BasketItem {
    constructor(good) {
        this.title = good.product_name;
        this.price = good.price;
        this.quantity = 0;
    }
    
    increaseQuantityByOne() {
        this.quantity += 1;
    }
    
    decreaseQuantityByOne() {
        this.quantity -= 1;
    }
    
    render(container = '#basket') {
        return `<div class="basket-item">
                <p class="basket-product">
                    <span class="basket-product_content">${this.title}</span>
                    <span class="basket-product_content">${this.price}</span>
                    <span class="basket-product_content">x ${this.quantity}</span>
                </p>
                <button class="remove-button">Удалить</button>
            </div>`;
    }
}

new GoodsList('.goods-list');
let basket = new Basket('#basket', '.cart-button');