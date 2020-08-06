'use strict'

const text = "One: 'Hi Mary.' Two: 'Oh, hi.' One: 'How are you doing?' Two: 'I'm doing alright. How about you?' One: 'Not too bad. The weather is great isn't it?' Two: 'Yes. It's absolutely beautiful today.' One: 'I wish it was like this more frequently.' Two: 'Me too.' One: 'So where are you going now?' Two: 'I'm going to meet a friend of mine at the department store' One: 'Going to do a little shopping?' Two: 'Yeah, I have to buy some presents for my parents.' One: 'What's the occasion?' Two: 'It's their anniversary.' One: 'That's great. Well, you better get going. You don't want to be late.' Two: 'I'll see you next time.' One: 'Sure.' Bye.'";

// task1 
// console.log(text.replace(/'/g,'"'));

// task2
// console.log(text.replace(/'(?=((\s|\n)|[A-Z]))/g,'"'));

//task3

const regExpArray = {
    userName: "[а-яА-ЯёЁ]",
    userTelephone: "\\+7\\(\\d{3}\\)\\d{3}-\\d{4}",
    userEmail: ".@[a-z]+.[a-z]+",
};

const userForm = document.querySelector(".user-contacts");
userForm.addEventListener('click', event => {
    if (event.target.classList.contains('user-contacts__button')) {
        const allInputFields = document.querySelectorAll('.user-contacts__input');
        allInputFields.forEach(inputField => {
            if (inputField.value) {
                inputField.value = validationField(inputField);
            } else {
                addIrrelevantClass(inputField);
            }
        });
    }
});

function validationField(inputField) {
    const regExpretion = new RegExp(regExpArray[inputField.id], 'i')
    if (regExpretion.test(inputField.value)) {
        return removeIrrelevantClass(inputField);
    } else {
        addIrrelevantClass(inputField);
        return "Error! Некорректное значение!"
    };

}

function addIrrelevantClass(inputField) {
    if (!inputField.classList.contains("user-contacts__input_empty-feld")) {
        inputField.classList.add("user-contacts__input_empty-feld");
    }

}

function removeIrrelevantClass(inputField) {
    if (inputField.classList.contains("user-contacts__input_empty-feld")) {
        inputField.classList.remove("user-contacts__input_empty-feld");
    }
    return inputField.value.trim();
}

