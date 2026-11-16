import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CartPage } from '../pages/CartPage.js';
import { generateUserData } from '../utils/testData.js';

test.describe('Q2: Register, Login, and Add Product to Cart', () => {
  test('Register new customer, log in, select product from category, and verify cart', async ({ page }, testInfo) => {
    const user = generateUserData();
    const targetProduct = 'Computing and Internet';

    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    // 1. Navigate & Register a new customer
    await homePage.navigate('/');
    await homePage.goToRegister();
    await registerPage.registerUser(user);
    await expect(registerPage.resultMessage).toHaveText('Your registration completed');
    await registerPage.clickContinue();

    // 2. Log out from auto-login session and explicitly Log In
    await homePage.logout();
    await homePage.goToLogin();
    await loginPage.login(user.email, user.password);
    await expect(homePage.accountEmailLink).toHaveText(user.email);

    // 3. Navigate to a product category (Books) and select a product
    await homePage.navigateToBooksCategory();
    await productPage.selectProductByName(targetProduct);

    // 4. Add product to shopping cart
    await productPage.addToCart();
    await expect(productPage.notificationBar).toContainText('The product has been added to your shopping cart');

    // 5. Open Shopping Cart and verify product name and quantity
    await homePage.goToShoppingCart();
    await expect(cartPage.cartProductName).toHaveText(targetProduct);
    await expect(cartPage.cartProductQty).toHaveValue('1');

    // Attach screenshot to Allure & HTML report
    await cartPage.attachScreenshot(testInfo, 'Q2 - Verified Cart Item & Quantity');
  });
});
