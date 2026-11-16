import { BasePage } from './BasePage.js';

export class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    // Billing Address Fields
    this.countryDropdown = page.locator('#BillingNewAddress_CountryId');
    this.stateDropdown = page.locator('#BillingNewAddress_StateProvinceId');
    this.cityInput = page.locator('#BillingNewAddress_City');
    this.address1Input = page.locator('#BillingNewAddress_Address1');
    this.zipInput = page.locator('#BillingNewAddress_ZipPostalCode');
    this.phoneInput = page.locator('#BillingNewAddress_PhoneNumber');

    // Step Continue Buttons
    this.billingContinueBtn = page.locator('#billing-buttons-container input.new-address-next-step-button');
    this.shippingContinueBtn = page.locator('#shipping-buttons-container input.new-address-next-step-button');
    this.shippingMethodContinueBtn = page.locator('#shipping-method-buttons-container input.shipping-method-next-step-button');
    this.paymentMethodContinueBtn = page.locator('#payment-method-buttons-container input.payment-method-next-step-button');
    this.paymentInfoContinueBtn = page.locator('#payment-info-buttons-container input.payment-info-next-step-button');
    this.confirmOrderBtn = page.locator('#confirm-order-buttons-container input.confirm-order-next-step-button');

    // Order Confirmation & Details
    this.orderSuccessTitle = page.locator('.order-completed .title strong');
    this.orderNumberText = page.locator('.order-completed .details li').first();
    this.orderDetailsLink = page.locator('.order-completed .details a');
    this.orderInformationHeader = page.locator('.order-details-page .page-title h1');
    this.orderOverviewNumber = page.locator('.order-overview .order-number strong');
  }

  async fillBillingAddress(billing) {
    await this.countryDropdown.selectOption({ label: billing.country });
    await this.stateDropdown.selectOption({ label: billing.state });
    await this.cityInput.fill(billing.city);
    await this.address1Input.fill(billing.address1);
    await this.zipInput.fill(billing.zipCode);
    await this.phoneInput.fill(billing.phone);
    await this.billingContinueBtn.click();
  }

  async completeShippingAndPaymentSteps() {
    // Shipping Address (uses same address by default)
    await this.shippingContinueBtn.waitFor({ state: 'visible' });
    await this.shippingContinueBtn.click();

    // Shipping Method (Ground by default)
    await this.shippingMethodContinueBtn.waitFor({ state: 'visible' });
    await this.shippingMethodContinueBtn.click();

    // Payment Method (Cash On Delivery by default)
    await this.paymentMethodContinueBtn.waitFor({ state: 'visible' });
    await this.paymentMethodContinueBtn.click();

    // Payment Information
    await this.paymentInfoContinueBtn.waitFor({ state: 'visible' });
    await this.paymentInfoContinueBtn.click();
  }

  async confirmOrder() {
    await this.confirmOrderBtn.waitFor({ state: 'visible' });
    await this.confirmOrderBtn.click();
  }

  async openOrderDetails() {
    await this.orderDetailsLink.click();
  }
}