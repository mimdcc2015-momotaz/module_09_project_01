import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.registerLink = page.locator('a.ico-register');
    this.loginLink = page.locator('a.ico-login');
    this.logoutLink = page.locator('a.ico-logout');
    this.accountEmailLink = page.locator('.header-links a.account');
    this.searchInput = page.locator('#small-searchterms');
    this.searchButton = page.locator('input.search-box-button');
    this.shoppingCartLink = page.locator('#topcartlink a.ico-cart');
    this.booksCategoryLink = page.locator('.top-menu a[href="/books"]');
  }

  async goToLogin() {
    await this.loginLink.click();
  }

  async goToRegister() {
    await this.registerLink.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async navigateToBooksCategory() {
    await this.booksCategoryLink.click();
  }

  async searchProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async goToShoppingCart() {
    await this.shoppingCartLink.click();
  }
}