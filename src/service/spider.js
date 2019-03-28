const puppeteer = require('puppeteer');
const { URL } = require('url');
module.exports = class extends think.Service {
  constructor({ cookies, host, url }) {
    super();
    this.brower = null;
    this.page = null;
    this.cookie = cookies;
    this.host = host;
    this.url = url;
  }
  timer() {
    const now = Date.now();
    return function() {
      think.log(`${name} times: ${Date.now() - now}ms`);
    };
  }
  async launch() {
    if (this.brower) return this.brower;
    this.brower = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: true,
    });
    return this.brower;
  }
  async render() {
    const brower = await this.launch();
    const page = await brower.newPage();
    if (this.cookie) {
      const cookies = this.generatorCookie();
      if (cookies.length) {
        await page.setCookie(...cookies);
      }
    }
    await page.goto(this.url);
    const html = await page.content();
    this.close();
    return { html };
  }
  generatorCookie() {
    const cookieArr = [];
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
  }
  close() {
    this.brower.close();
  }
};
