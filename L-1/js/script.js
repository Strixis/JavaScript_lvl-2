"use strict";

const goods = [
    {
        title: 'Shirt',
        price: 150,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada libero ultrices felis facilisis, in ornare tellus consequat. Pellentesque a.'
        
    },
    {
        title: 'Socks',
        price: 50,
        description: 'Consectetur adipiscing elit. In malesuada libero ultrices felis facilisis, in ornare tellus consequat. Pellentesque a.'
    },
    {
        title: 'Jacket',
        price: 350,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada, in ornare tellus consequat. Pellentesque a.'
    },
    {
        title: 'Shoes',
        price: 250,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada libero ultrices felis facilisis, in ornare tellus consequat.'
    },
    
];

const renderGoodsItem = (imgAdress='img/sharp.jpeg', title, price, description) => {
    return `<div class="goods-item">
                <img class="goods-img" src="${imgAdress}" alt="${title}">
                <h3 class="goods-heading">${title}</h3>
                <p class="goods-description">${description}</p>
                <p class="goods-price">${price}</p>
                <button class="add-button">Добавить</button>
            </div>`;
};

const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.imgAdress, item.title, item.price, item.description));
    goodsList.forEach((good) => {document.querySelector('.goods-list').innerHTML += good});
}

renderGoodsList(goods);