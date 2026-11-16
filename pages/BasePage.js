export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(path = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async attachScreenshot(testInfo, stepName) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await testInfo.attach(stepName, {
      body: screenshot,
      contentType: 'image/png',
    });
  }
}