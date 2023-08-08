import puppeteer, { Browser, Page } from "puppeteer";

export class Cluster {

  private browser: Browser | undefined;
  private page: Page | undefined;

  constructor(
    private headless: boolean,
    private timeout: number,
  ){}

  private async getBrowser(){
    return await puppeteer.launch({
      defaultViewport: null,
      timeout: this.timeout,
      headless: this.headless,
      args: [
        '--disable-dev-shm-usage',
        '--start-maximized',
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });
  }

  public async execute(callback: Function, params: {}): Promise<void | object>{
    this.browser = await this.getBrowser();
    this.page = await this.browser.newPage();
    try {
      return await callback(this.page, params);
    } catch (error: unknown) {
      console.error(error);
    }
  }

  public async finish(){
    await this.page?.close();
    await this.browser?.close();
  }
}