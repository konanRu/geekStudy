'use strict'

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this.cart = new ShoppingCart;
        this.fetchProducts();
        this.render();
        this.addEventManager();
    }
    fetchProducts() {
        this.goods = [{
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
        ];

    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObject = new ProductItem(product, this.cart);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }

    }

    addEventManager() {
        this.allProducts.forEach((product) => {
            const buttons = document.querySelectorAll(".desc-box__by-btn");
            buttons.forEach((button) => {
                if (product.id == button.dataset.id) {
                    button.addEventListener('click', product.addInCart.bind(product));
                }
            })
        });
    }
}

class ProductItem {
    constructor(product, cart, img = 'https://placeimg.com/140/140/tech') {
        this.title = product.title;
        this.price = product.price;
        this.cart = cart;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class ="product-item" data-id="${this.id}">
        <img src="${this.img}" alt="photo">
        <div class="desc-box">
            <a href="#" class="desc-box__link"><h3 class="desc-box__h3">${this.title}</h3></a>
            <p class="desc-box__p">${this.price} \u20bd</p>
            <button class="desc-box__by-btn" data-id="${this.id}" >Купить</button>
        </div>
        </div> `;
    }

    addInCart(event) {
        if (!this.cart.alreadyInCart(event.target.dataset['id'])) {
            const productInCart = new ProductInCart(this);
            productInCart.qnt += 1
            this.cart.productsInCart.push(productInCart);
            this.cart.productsIdInCart.push(event.target.dataset['id']);
            this.cart.render();
            productInCart.addEventManager();
        } else {
            this.cart.productsInCart.forEach((productInCart) => {
                if (productInCart.id == event.target.dataset['id']) {
                    productInCart.qnt += 1;
                }
            });
            this.cart.render();
        }
    }

}

class ShoppingCart {
    constructor(product) {
        this.orderID = 0;
        this.productsIdInCart = [];
        this.productsInCart = [];
        this.render();
    }

    render() {
        const cart_box = document.querySelector('.cart-box');
        if (this.isEmpty()) {
            cart_box.insertAdjacentHTML('beforeend',
                `<div class="cart-box__box">
                    <h4 class="cart-box__h4">Ваша корзина пуста!</h4>
                    <div class="cart-box__box-titels displayNone">
                        <h5 class="cart-box__h5">Название товара</h5>
                        <h5 class="cart-box__h5">Количество</h5>
                        <h5 class="cart-box__h5">Цена</h5>
                        <h5 class="cart-box__h5">Итого по позиции</h5>
                    </div>
                    <div class="cart-box__box-end-titels displayNone">
                        <h5 class="cart-box__h5">Итого позиций:</h5>
                        <h5 class="cart-box__h5 cart-box__produtcts-of-order"></h5>
                        <h5 class="cart-box__h5">Итого по заказу:</h5>
                        <h5 class="cart-box__h5 cart-box__sum-of-order"></h5>
                        <button class="cart-box__delete-product_all" data-id="all">X</button>
                    </div>
                </div>`
            );
             this.addEventManager();
        } else {
            if (!(cart_box.querySelector('.cart-box__h4').classList.contains('displayNone'))) {
                cart_box.querySelector('.cart-box__h4').classList.add('displayNone');
                cart_box.querySelector('.cart-box__box-titels').classList.remove('displayNone');
                cart_box.querySelector('.cart-box__box-end-titels').classList.remove('displayNone');
            };
            const cart_box_producs_box = cart_box.querySelector('.cart-box__box-end-titels');
            for (let productInCart of this.productsInCart) {
                const productInCartBox = this.GetProductInCart(productInCart.id);
                if (productInCartBox) {
                    const input_qnt = productInCartBox.querySelector('input[class=cart-box__h5]');
                    input_qnt.value = productInCart.qnt;
                } else {
                    cart_box_producs_box.insertAdjacentHTML('beforebegin', productInCart.render());
                }
            }
            cart_box.querySelector('.cart-box__produtcts-of-order').innerHTML = this.sum('qnt');
            cart_box.querySelector('.cart-box__sum-of-order').innerHTML = this.sum('price') + '\u20bd';
        }

    }

    GetProductInCart(productInCartId) {
        const productInCartBoxs = document.querySelectorAll('.cart-box__product-item');
        for (let productInCartBox of productInCartBoxs) {
            if (productInCartBox.dataset.id == productInCartId) {
                return productInCartBox;
            }
        };
        return false
    }

    sum(what) {
        let sumOfOrder = 0;
        for (let productInCart of this.productsInCart) {
            switch (what) {
                case 'price':
                    sumOfOrder += (productInCart.qnt * productInCart.price);
                    break;
                case 'qnt':
                    sumOfOrder += productInCart.qnt;
                    break;
            }
        }
        return sumOfOrder
    }

    alreadyInCart(productInCartId) {
        return this.productsIdInCart.includes(productInCartId)
    }

    deleteProductInCart(event) {
        if (event.target.dataset.id == 'all') {
            const allProductsInCart = document.querySelectorAll(".cart-box__box");
            allProductsInCart.forEach((productInCart) => {
                productInCart.parentNode.removeChild(productInCart);
            });
            this.productsIdInCart = [];
            this.productsInCart = [];
            this.render();
        } else {
            let productInCart = this.cart.GetProductInCart(this.id);
            productInCart.parentNode.removeChild(productInCart);
            let i = 0;
            console.dir(this.cart.productsInCart);
            for (let produInCart of this.cart.productsInCart) {
                if (produInCart.id == this.id) {
                    this.cart.productsInCart.splice(i,1);
                    this.cart.productsIdInCart.splice(i,1);
                }
                ++i;
            }
            console.dir(this.cart.productsInCart);
            if (this.cart.isEmpty()) {
                let event = new Event('click');
                const button = document.querySelector(".cart-box__delete-product_all");
                button.dispatchEvent(event);
            }

        }

    }
    addEventManager() {
        const button = document.querySelector(".cart-box__delete-product_all")
        button.addEventListener('click', this.deleteProductInCart.bind(this));
    }

    isEmpty() {
        return this.productsIdInCart.length === 0
    }
}

class ProductInCart extends ProductItem {
    constructor(product) {
        super(product);
        this.cart = product.cart;
        this.orderID = 0;
        this.qnt = 0;
    }
    render() {
        return `<div class = "cart-box__product-item" data-id=${this.id}>
        <a href="#" class="desc-box__link"><h5 class="cart-box__h5">${this.title}</h5></a>
        <input class="cart-box__h5" type="text" value=${this.qnt}>
        <h5 class="cart-box__h5">${this.price} \u20bd</h5>
        <h5 class="cart-box__h5">${this.price*this.qnt} \u20bd</h5>
        <button class="cart-box__delete-product" data-id="${this.id}">X</button>
        </div>`;
    }

    addEventManager() {
        const buttons = document.querySelectorAll(".cart-box__delete-product");
        buttons.forEach((button) => {
            if (this.id == button.dataset.id) {
                button.addEventListener('click', this.cart.deleteProductInCart.bind(this));
            }
        });
    }
}

const products = new ProductList;