'use strict'

const products = [{
        id: 1,
        title: 'product1',
        price: 20000
    },
    {
        id: 2,
        title: 'product2',
        price: 15000
    },
    {
        id: 3,
        title: 'product3',
        price: 19000
    },
    {
        id: 4,
        title: 'product4',
        price: 11000
    },
    {
        id: 5,
    },
];

const renderProduct = (title = 'product-default', price = 10000) => {
    document.querySelector('.products').innerHTML += `<div class ="product-item">
        <h3>${title}</h3>
        <p>${price}</p>
        <button class="by-btn">Добавить в корзину</button>
        </div> `;
};

const renderProducts = (list = [{id: 'default-n'}]) => {
    list.forEach(item => renderProduct(item.title, item.price));
};

renderProducts(products);