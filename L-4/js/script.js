"use strict";

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsList {
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
    }

    _getGoodsFromServer() {
       return fetch(`${API}/catalogData.json`)
           .then(response => response.json())
           .catch(error => {
           console.log('Error')
       });
    }

    _getAnswerFromServer(question) {
        return fetch(`${API}/${question}.json`)
           .then(response => response.json())
           .catch(error => {
           console.log('Error')
       });
    }

    _render() {
        const block = document.querySelector(this.container);
        
        for (let good of this.goodsFromServer) {
            const goodObject = new GoodsItem(good);
            this.goodsInShop.push(goodObject);
            block.insertAdjacentHTML('beforeend', goodObject._render());
        }
    }
    
    _setAllGoodsCost(cost) {
        this.allGoodsCost = cost;
    }
    
    _calculateAllGoodsCost() {
        return this.goodsInShop.reduce((previousValue, currentValue) => {return previousValue + currentValue.price}, 0);
    }
    
    _clickHandlerToAddGoodAtBasket(event) {
        if (event.target.tagName === 'BUTTON') {
            const good = this.getGoodById(event.target.id);
            if (this.goodsInShop.includes(good)) {
                this._getAnswerFromServer('addToBasket').then((data) => {
                    if (data.result === 1) {
                        basket.addItemOrIncreaseQuantityAndRender(good);
                    }
                })
            }
        }
    }
    
    getGoodById(goodId) {
        return this.goodsInShop.find((item) => {return String(item.id) === goodId});
    }
}


class GoodsItem {
    constructor(good) {
        this.imgAdress = good.imgAdress !== undefined ? good.imgAdress : 'img/sharp.jpeg';
        this.title = good.product_name;
        this.price = good.price;
        this.description = good.description !== undefined ? good.description : 'There is no description.';
        this.id = good.id_product;
    }
    
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

class Basket {
    constructor(container = '#basket', buttonContainer = '#basket-button') {
        this.container = container;
        this.buttonContainer = buttonContainer;
        this.allGoods = [];
        this.allGoodsCost = 0;
        this.allGoodsQuantity = 0;
        
        this._getGoodsFromServer()
            .then(data => {
                data.contents.forEach((item) => {this.addItemOrIncreaseQuantityAndRender(item)});
                this.allGoodsCost = data.amount;
                this.allGoodsQuantity = data.countGoods;
                this._render();
            
                document.querySelector(this.buttonContainer).addEventListener('click', () => {
                    const elemClasses = document.querySelector(this.container).classList;
                    elemClasses.toggle('__visible');
                    elemClasses.toggle('__invisible');
                });
            
                document.querySelector(this.container).addEventListener('click', (event) => {
                    this._clickHandlerToRemoveGoodFromBasket(event);
                });
        });
    }
    
    _clickHandlerToRemoveGoodFromBasket(event) {
        if (event.target.tagName === 'BUTTON') {
            const good = this.getGoodById(event.target.id);
            if (this.allGoods.includes(good)) {
                this._getAnswerFromServer('deleteFromBasket').then((data) => {
                    if (data.result === 1) {
                        basket.removeItemOrDecreaseQuantityAndRender(good);
                    }
                });
            }
        }
    }
    
    _getGoodsFromServer() {
       return fetch(`${API}/getBasket.json`)
           .then(response => response.json())
           .catch(error => {
           console.log('Error')
       });
    }
    
    _getAnswerFromServer(question) {
        return fetch(`${API}/${question}.json`)
           .then(response => response.json())
           .catch(error => {
           console.log('Error')
       });
    }
    
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
    
    removeItemOrDecreaseQuantityAndRender(good) {
        const item = this.allGoods.find((elem) => {return good.id === elem.id});
        if (item.quantity === 1) {
            this.allGoods.splice(this.allGoods.indexOf(item), 1);
        } else {
            item.decreaseQuantityByOne();
        }
        this._render();
    }
    
    _calculateQuantity() {
        return this.allGoods.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.quantity;
        }, 0);
    }
    
    _setAllGoodsQuantity(quantity) {
        this.allGoodsQuantity = quantity;
    }
    
    getGoodById(goodId) {
        return this.allGoods.find((item) => {return String(item.id) === goodId});
    }
}

class BasketItem {
    constructor(good) {
        this.title = good.title || good.product_name;
        this.price = good.price;
        this.id = good.id || good.id_product;
        this.quantity = 0;
    }
    
    increaseQuantityByOne() {
        this.quantity += 1;
    }
    
    decreaseQuantityByOne() {
        this.quantity -= 1;
    }
    
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