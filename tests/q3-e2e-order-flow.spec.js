import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { generateUserData } from '../utils/testData.js';

test.describe('Q3: End-to-End Search to Order Details Flow', () => {
  test('Search product, increase quantity, checkout, confirm order, and view order details', async ({ page }, testInfo) => {
    const user = generateUserData();
    const searchKeyword = 'Health Book';
    const desiredQty = '3';

    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Pre-condition: Register an active customer session so Q3 runs independently
    await homePage.navigate('/');
    await homePage.goToRegister();
    await registerPage.registerUser(user);
    await registerPage.clickContinue();

    // 1. Search for the product and verify it appears in search results
    await homePage.searchProduct(searchKeyword);
    await expect(productPage.productTitles.filter({ hasText: searchKeyword })).toBeVisible();

    // 2. Open the product
    await productPage.selectProductByName(searchKeyword);
    await expect(productPage.productDetailTitle).toHaveText(searchKeyword);

    // 3. Increase quantity and add to cart
    await productPage.setQuantity(desiredQty);
    await productPage.addToCart();
    await expect(productPage.notificationBar).toContainText('The product has been added to your shopping cart');

    // 4. Go to cart, verify quantity, agree to terms, and click checkout
    await homePage.goToShoppingCart();
    await expect(cartPage.cartProductQty).toHaveValue(desiredQty);
    await cartPage.agreeAndCheckout();

    // 5. Complete Checkout steps & Confirm Order
    await checkoutPage.fillBillingAddress(user.billing);
    await checkoutPage.completeShippingAndPaymentSteps();
    await checkoutPage.confirmOrder();

    // 6. Verify Order Confirmation
    await expect(checkoutPage.orderSuccessTitle).toHaveText('Your order has been successfully processed!');
    const orderNumberRaw = await checkoutPage.orderNumberText.textContent();
    const orderNumber = orderNumberRaw.replace('Order number:', '').trim();
    await checkoutPage.attachScreenshot(testInfo, 'Q3 - Order Confirmation');

    // 7. Navigate to Order Details and verify order information
    await checkoutPage.openOrderDetails();
    await expect(checkoutPage.orderInformationHeader).toHaveText('Order information');
    await expect(checkoutPage.orderOverviewNumber).toContainText(orderNumber);

    // Attach final Order Details screenshot to Allure & HTML report
    await checkoutPage.attachScreenshot(testInfo, 'Q3 - Order Details Page');
  });
});