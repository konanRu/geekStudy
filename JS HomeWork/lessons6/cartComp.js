Vue.component('cart', {
    data() {
        return {
            imgCart: 'https://placehold.it/50x100',
            cartUrl: '/getBasket.json',
            cartItems: [],
            showCart: false,
        }
    },
    methods: {
        addProduct(product) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            let prod = Object.assign({ quantity: 1 }, product);
                            this.cartItems.push(prod)
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        remove(item) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    }
                })
        },
        removeAll(){
            this.cartItems=[];
        }
    },
    mounted() {
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    computed: {
        sumOfOrder(){
            return this.cartItems.reduce((sum, productInCart) => {
                return sum + (productInCart.quantity * productInCart.price);
            }, 0)
        },
    },
    template: `<div class="cart-box">
        <div class="menuBar__p" @click="showCart = !showCart">Корзина</div>
        <div class="cart-box__box" v-show="showCart">
            <h4 class="cart-box__h4" v-if="!cartItems.length">Ваша корзина пуста!</h4>
            <div v-else>
                <div class="cart-box__box-titels">
                    <h5 class="cart-box__h5">Название товара</h5>
                    <h5 class="cart-box__h5">Количество</h5>
                    <h5 class="cart-box__h5">Цена</h5>
                    <h5 class="cart-box__h5">Итого по позиции</h5>
                </div>
                <cart-item v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item" 
                @remove="remove">
                </cart-item>
                <div class="cart-box__box-end-titels">
                    <h5 class="cart-box__h5">Итого позиций:</h5>
                    <h5 class="cart-box__h5 cart-box__produtcts-of-order">{{cartItems.length}}</h5>
                    <h5 class="cart-box__h5">Итого по заказу:</h5>
                    <h5 class="cart-box__h5 cart-box__sum-of-order">{{sumOfOrder}}</h5>
                    <button class="cart-box__delete-product_all" @click="removeAll">X</button>
                </div> 
            </div>
        </div> 
    </div>
    `
});



Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
    <div class = "cart-box__product-item">
    <a href="#" class="desc-box__link"><h5 class="cart-box__h5">{{cartItem.product_name}}</h5></a>
    <input class="cart-box__h5" type="text" :value="cartItem.quantity">
    <h5 class="cart-box__h5">{{cartItem.price}} \u20bd</h5>
    <h5 class="cart-box__h5">{{cartItem.quantity*cartItem.price}} \u20bd</h5>
    <button class="cart-box__delete-product" @click="$emit('remove', cartItem)">X</button>
    </div>`
    
});