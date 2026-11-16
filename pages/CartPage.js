import { BasePage } from './BasePage.js';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartProductName = page.locator('.cart-item-row .product-name');
    this.cartProductQty = page.locator('.cart-item-row input.qty-input');
    this.termsOfServiceCheckbox = page.locator('#termsofservice');
    this.checkoutButton = page.locator('#checkout');
  }

  async agreeAndCheckout() {
    await this.termsOfServiceCheckbox.check();
    await this.checkoutButton.click();
  }
}