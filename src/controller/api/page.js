const Base = require('../base.js');
module.exports = class extends Base {
  async renderAction() {
    const url = this.get('url');
    const cookies = this.header('cookie');
    const spider = think.service('spider', {
      cookies,
      url,
    });
    const result = await spider.render();
    this.success(result);
  }
};
