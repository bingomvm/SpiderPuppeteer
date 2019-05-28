const puppeteer = require('puppeteer');
const { URL } = require('url');
const path = require('path');
module.exports = class extends think.Service {
  constructor({ cookies, host, url }) {
    super();
    this.brower = null;
    this.page = null;
    this.cookie = cookies;
    this.host = host;
    this.url = url;
    think.logger.info(
      `url->${this.url};cookies->:${this.cookie};host->${this.host}`
    );
  }
  timer() {
    const now = Date.now();
    return function() {
      think.log(`${name} times: ${Date.now() - now}ms`);
    };
  }
  async initPage() {
    if (this.page) return this.page;
    const brower = await this.launch();
    this.page = await brower.newPage();
    return this.page;
  }
  async launch() {
    if (this.brower) return this.brower;
    this.brower = await puppeteer.launch({
      args: ['--no-sandbox', '--window-size=1920,1080'],
      defaultViewport: { width: 1920, height: 1042 },
      headless: true,
    });
    return this.brower;
  }
  async render() {
    const page = await this.initPage();
    if (this.cookie) {
      const cookies = this.generatorCookie();
      cookies.length && (await page.setCookie(...cookies));
    }
    await page.goto(this.url);
    const content = await page.content();
    this.close();
    return { content };
  }
  generatorCookie() {
    const cookieArr = [];
    try {
      const urlParse = new URL(this.url);
      const domain = urlParse.host;
      const splitCookies = this.cookie.split(';');
      splitCookies.forEach(cookieStr => {
        const cookie = cookieStr.replace(/\s/gi, '').split('=');
        if (!cookie[0] || !cookie[1]) return;
        cookieArr.push({
          name: cookie[0],
          value: cookie[1],
          domain,
        });
      });
      return cookieArr;
    } catch (error) {
      think.logger.error(error);
      return [];
    }
  }
  async screenshot(params) {
    const page = await this.initPage();
    await page.goto(this.url);
    think.logger.info('screen params:', params);
    const buffer = await page.screenshot({
      path: path.join(think.ROOT_PATH, './runtime/screenshot.png'),
      ...params,
    });
    this.close();
    return buffer;
  }
  close() {
    this.brower.close();
  }
};
