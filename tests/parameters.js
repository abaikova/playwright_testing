module.exports = testParameters = {
    testCases: {
        expectedTitles: {
            catalogPage: /Каталог/,
            mobilePage: /Мобильный телефон/,
            registerPage: /Профиль/,
            consolePage: /Игровую приставку/,
            servicesPage: /Заказы на услуги/,
            forumPage: /Форум onliner.by/,
        },
        first: {
            mobileManufacturer: 'HONOR',
        },
        second: {
            invalidEmail: 'dkhfbvkdn',
            expectedErrorForEmailInput: 'Некорректный e-mail',
            invalidPassword: '1234',
            expectedErrorForPswdInput: 'Минимум 8 символов',
            newPassword: '12345678',
            incorrectNewPassword: '12345677',
            expectedErrorForDifferentPasswords: 'Пароли не совпадают',
        },
        third: {
            expectedButtonText: 'В корзине',
            expectedProductData: 'Игровые приставки',
        },
        fourth: {
            serviceCheckboxStatus: 'Невыполненные',
            expectedServiceStatus: 'Не выполнено',
        },
        fifth: {
            expectedForumTitle: 'Новое за 24 часа',
        },
    },
};