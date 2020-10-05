"use strict";
/**
 * @constant {string} Адрес изображения по умолчанию для каточки товара.
 */
const dummyImgAdress = 'img/sharp.jpeg';

/**
 * @type {object[]} Массив с объектами товаров.
 */
const goods = [
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
    },
    
];

/**
 * Функция отображает карточку товара.
 * @param {string} imgAdress - адрес изображения.
 * @param {string} title - название товара.
 * @param {number} price - цена товара.
 * @param {string} description - описание товара.
 * @return {string} Возвращает строку с карточкой товара.
 */
const renderGoodsItem = (imgAdress=dummyImgAdress, title, price, description) => {
    return `<div class="goods-item">
                <img class="goods-img" src="${imgAdress}" alt="${title}">
                <h3 class="goods-heading">${title}</h3>
                <p class="goods-description">${description}</p>
                <p class="goods-price">${price}</p>
                <button class="add-button">Добавить</button>
            </div>`;
};

/*const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.imgAdress, item.title, item.price, item.description));
    goodsList.forEach((good) => {document.querySelector('.goods-list').innerHTML += good});
}*/

/**
 * Функция отображает список товаров.
 * @param {Array} list - список товаров.
 */
const renderGoodsList = (list) => {
    list.forEach((item) => {
        let {imgAdress, title, price, description} = item;
        document.querySelector('.goods-list').innerHTML += renderGoodsItem(imgAdress, title, price, description);
    })
}

// Отображаем список товаров.
renderGoodsList(goods);