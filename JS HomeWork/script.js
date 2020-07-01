'use strict';


/**
 * С помощью цикла while вывести все простые числа в промежутке от 0 до 100.
 */
function task1() {
    /**
     * возвращает true если аргумент является простым числом, иначе false/
     * @param {*} num - число для проверки на свойство "простоты"
     */
    function chek_easy_number(num) {
        if (easy_numbers.length > 0) {
            for (let easy_number of easy_numbers) {
                if (num % easy_number === 0) {
                    return false;
                }
            }
        }
        easy_numbers.push(num);
        return true;
    };

    let easy_numbers = [];
    let i = 1;
    while (i < 100) {
        i++;
        if (chek_easy_number(i)) {
            console.log(i);
        }
    }
}

/**
 * 3. Товары в корзине хранятся в массиве. Задачи:
 * a) Организовать такой массив для хранения товаров в корзине;
 * b) Организовать функцию countBasketPrice, которая будет считать стоимость корзины.
 */
// function task3() {

/**
 * Возвращает сумму товаров, находящихся в корзине покупок.
 * @param {*} shopping_cart - массив с данными корзины покупок.
 */
function getSumCart(shopping_cart) {
    let amountOfPurchase = 0;
    if (shopping_cart.length > 0) {
        for (let productInCart of shopping_cart) {
            amountOfPurchase = amountOfPurchase + (productInCart.quantity * productInCart.price);
        }
        return amountOfPurchase;
    }
    return 'Корзина пуста!';
}

let shopping_cart = [
    {
        article: 5,
        quantity: 27,
        price: 5
    },
    {
        article: 9,
        quantity: 15,
        price: 75
    }
];
console.log(getSumCart(shopping_cart))
// }

/**
 * Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла. 
 */
function task4() {
    let j = 0;
    let i = 0;
    while (j < 9) {
        ++j;
        for (; i < j; i++) {}
        console.log(i);
    }

}

/**
 * Нарисовать пирамиду с помощью console.log, как показано на рисунке, только у вашей пирамиды должно быть 20 рядов, а не 5:
 */
function task5() {
    let x_arr = [];
    let x_string = "";
    for (let j = 1; j < 21; j++) {
        for (let i = 0; i < j; i++) {
            x_string = x_string + 'x';
        }
        x_arr.push(x_string);
        x_string = '';
    }
    console.log(x_arr);
}