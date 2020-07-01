'use strict';

/**
 * Сделайте в стиле es5, а затем в стиле es6, конструктор Product, который принимает параметры name и price, сохраните их как свойства объекта. Также объекты типа Product должны иметь метод make25PercentDiscount, который будет уменьшать цену в объекте на 25%.
 */
function Task1_1() {

    function Product_es5(name, price) { //в стиле es5
        this.name = name;
        this.price = price;
    }

    Product_es5.prototype.make25PercentDiscount = function () {
        this.price = this.price * 0.75;
        return '-25% OFF';
    };

    class Product_es6 { // стиле es6
        constructor(name, price) {
            this.name = name;
            this.price = price;
        }
        make25PercentDiscount() {
            this.price = this.price * 0.75;
            return '-25% OFF';
        }

    }

    const product1_es5 = new Product_es5('moto1', 200000);
    const product1_es6 = new Product_es6('moto2', 100000);
    console.log('Task 1 1 ==>');

    console.log(product1_es5);
    console.log(product1_es5.make25PercentDiscount());
    console.log(product1_es5);

    console.log(product1_es6);
    console.log(product1_es6.make25PercentDiscount());
    console.log(product1_es6);

    console.log('<==Task 1 1.');
}

/**
 * Сделайте в стиле es5, а затем в стиле es6 (по аналогии из урока),
а) конструктор Post, который принимает параметры author, text, date и сохраняет их как свойства объекта. Объекты типа Post должны иметь метод edit, который будет принимать текст и записывать его в свойство text объекта.
б) конструктор AttachedPost, который принимает параметры author, text, date. Проинициализируйте эти свойства с помощью конструктора Post, чтобы не дублировать код. Также в конструкторе AttachedPost должно создаваться свойство highlighted со значением false. Унаследуйте в объектах типа AttachedPost методы из Post.
Объекты типа AttachedPost должны иметь метод makeTextHighlighted, который будет назначать свойству highlighted значение true.
*/
function Task1_2() {
    function Post_es5(author, text, date) {
        this.author = author;
        this.text = text;
        this.date = date;
    }

    Post_es5.prototype.edit = function (text) {
        this.text = text;
        return 'edited';
    };

    function AttachedPost_es5(author, text, date) {
        Post_es5.call(this, author, text, date);
        this.highlighted = false;
    }

    AttachedPost_es5.prototype = Object.create(Post_es5.prototype);
    AttachedPost_es5.prototype.constructor = AttachedPost_es5;
    AttachedPost_es5.prototype.makeTextHighlighted = function () {
        this.highlighted = true;
        return 'highlighted';
    };

    class Post_es6 {
        constructor(author, text, date) {
            this.author = author;
            this.text = text;
            this.date = date;
        }

        edit(text) {
            this.text = text;
            return 'edited';
        }
    }
    class AttachedPost_es6 extends Post_es6 {
        constructor(author, text, date) {
            super(author, text, date);
            this.highlighted = false;
        }

        makeTextHighlighted() {
            this.highlighted = true;
            return 'highlighted';
        }
    }

    const post1_es5 = new Post_es5('Alex', 'привет!', '2014');
    const AttachedPost1_es5 = new AttachedPost_es5('Dim', 'не привет!', '2015');
    const post1_es6 = new Post_es6('Jhon', 'здрасти Вам!', '2014');
    const AttachedPost1_es6 = new AttachedPost_es6('Tom', 'Ок!', '2015');

    console.log('Task 1 2 ==>');

    console.log(post1_es5);
    console.log(post1_es5.edit('Хорошо'));
    console.log(post1_es5);

    console.log(AttachedPost1_es5);
    console.log(AttachedPost1_es5.edit('Бывай'));
    console.log(AttachedPost1_es5.makeTextHighlighted());
    console.log(AttachedPost1_es5);

    console.log(post1_es6);
    console.log(post1_es6.edit('Ок'));
    console.log(post1_es6);

    console.log(AttachedPost1_es6);
    console.log(AttachedPost1_es6.edit('Окей!'));
    console.log(AttachedPost1_es6.makeTextHighlighted());
    console.log(AttachedPost1_es6);

    console.log('<==Task 1 2.');

}

Task1_1()
Task1_2()