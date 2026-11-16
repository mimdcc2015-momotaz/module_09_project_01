export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(path = '/') {
    const baseURL = this.page.context()._options.baseURL || process.env.BASE_URL || 'https://demowebshop.tricentis.com';
    const fullUrl = path.startsWith('http') ? path : `${baseURL}${path.startsWith('/') ? '' : '/'}${path}`;
    await this.page.goto(fullUrl, { waitUntil: 'domcontentloaded' });
  }

  async attachScreenshot(testInfo, stepName) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await testInfo.attach(stepName, {
      body: screenshot,
      contentType: 'image/png',
    });
  }
}