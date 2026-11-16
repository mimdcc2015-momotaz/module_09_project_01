import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { LoginPage } from '../pages/LoginPage.js';

test.describe('Q1: Invalid Login Validation', () => {
  test('Verify error message and unauthenticated state on invalid login', async ({ page }, testInfo) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.navigate('/');
    await homePage.goToLogin();

    // Attempt login with invalid credentials
    await loginPage.login('invalid_qa_user@example.com', 'WrongPassword123!');

    // Verify appropriate error message is displayed
    await expect(loginPage.validationErrorSummary).toBeVisible();
    await expect(loginPage.validationErrorSummary).toContainText('Login was unsuccessful. Please correct the errors and try again.');
    await expect(loginPage.validationErrorSummary).toContainText('No customer account found');

    // Verify user is NOT logged in
    await expect(homePage.loginLink).toBeVisible();
    await expect(homePage.logoutLink).toHaveCount(0);

    // Attach final screenshot to Allure & HTML report
    await loginPage.attachScreenshot(testInfo, 'Q1 - Invalid Login Error');
  });
});
