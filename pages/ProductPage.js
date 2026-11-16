import { BasePage } from './BasePage.js';

export class ProductPage extends BasePage {
  constructor(page) {
    super(page);
    this.productTitles = page.locator('.product-title a');
    this.productDetailTitle = page.locator('.product-name h1');
    this.quantityInput = page.locator('input.qty-input');
    this.addToCartButton = page.locator('input[id^="add-to-cart-button-"]');
    this.notificationBar = page.locator('#bar-notification');
    this.notificationCloseBtn = page.locator('#bar-notification .close');
  }

  async selectProductByName(productName) {
    await this.page.locator('.product-title a', { hasText: productName }).first().click();
  }

  async setQuantity(qty) {
    await this.quantityInput.clear();
    await this.quantityInput.fill(String(qty));
  }

  async addToCart() {
    await this.addToCartButton.click();
    await this.notificationBar.waitFor({ state: 'visible' });
  }
}