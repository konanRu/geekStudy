Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
            imgCatalog: 'https://placeimg.com/140/140/tech',
        }
    },
    methods: {
        filter(val) {
            if (val) {
                let regexp = new RegExp(val, 'i');
                this.filtered = this.products.filter(el => regexp.test(el.product_name));
            } else {
                this.filtered = this.products;
            }
            ;
        },
    },

    mounted() {
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },


    template:
        `<div class="products">
        <product v-for="item of filtered" :key="item.id_product" :img="imgCatalog" :product="item"></product>
    </div>
    `

});

Vue.component('product', {
    props: ['product', 'img'],
    data() {
        return {
            cartAPI: this.$root.$refs.cart,
        };
    },
    template: `
    <div class ="product-item">
    <img :src="img" alt="photo">
    <div class="desc-box">
        <a href="#" class="desc-box__link"><h3 class="desc-box__h3">{{product.product_name}}</h3></a>
        <p class="desc-box__p">{{product.price}} \u20bd</p>
        <button class="desc-box__by-btn" @click="cartAPI.addProduct(product)" >Купить</button>
    </div>
    </div> `

});
