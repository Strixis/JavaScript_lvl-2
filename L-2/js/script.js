"use strict";

class GoodsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allGoods = [];
        this.allGoodsCost = 0;
        this._fetchGoods();
        this._render();
        this._setAllGoodsCost();
    }
    
    _fetchGoods() {
        this.goods = [
            {
                imgAdress: undefined,
                title: 'Shirt',
                price: 150,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada libero ultrices felis facilisis, in ornare tellus consequat. Pellentesque a.'
            },
            {
                imgAdress: 'wrong adress',
                title: 'Socks',
                price: 50,
                description: 'Consectetur adipiscing elit. In malesuada libero ultrices felis facilisis, in ornare tellus consequat. Pellentesque a.'
            },
            {
                imgAdress: undefined,
                title: 'Jacket',
                price: 350,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada, in ornare tellus consequat. Pellentesque a.'
            },
            {
                imgAdress: undefined,
                title: 'Shoes',
                price: 250,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada libero ultrices felis facilisis, in ornare tellus consequat.',
            }
        ];
    }

    _render() {
        const block = document.querySelector(this.container);
        
        for (let good of this.goods) {
            const goodObject = new GoodsItem(good);
            this.allGoods.push(goodObject);
            block.insertAdjacentHTML('beforeend', goodObject.render());
        }
    }
    
    _setAllGoodsCost() {
        for (let good of this.allGoods) {
            this.allGoodsCost += good.price;
        }
        console.log(this.allGoodsCost);
    }
}

class GoodsItem {
    constructor(good) {
        this.imgAdress = good.imgAdress !== undefined ? good.imgAdress : 'img/sharp.jpeg';
        this.title = good.title;
        this.price = good.price;
        this.description = good.description;
    }
    
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

new GoodsList('.goods-list');