import { BasePage } from './BasePage.js';

export class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    this.genderFemaleRadio = page.locator('#gender-female');
    this.firstNameInput = page.locator('#FirstName');
    this.lastNameInput = page.locator('#LastName');
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.confirmPasswordInput = page.locator('#ConfirmPassword');
    this.registerButton = page.locator('#register-button');
    this.resultMessage = page.locator('.result');
    this.continueButton = page.locator('input.register-continue-button');
  }

  async registerUser(user) {
    await this.genderFemaleRadio.check();
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.password);
    await this.registerButton.click();
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}