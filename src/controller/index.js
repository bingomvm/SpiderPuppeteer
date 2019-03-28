const Base = require('./base.js');
module.exports = class extends Base {
  indexAction() {
    return this.display();
  }
  async renderAction() {
    const url = this.get('url');
    try {
      const cookies = this.header('cookie');
      const spider = think.service('spider', {
        cookies,
        url,
      });
      const result = await spider.render();
      think.logger.error('test');
      this.assign('html', result.html);
    } catch (error) {
      console.log('-->', error);
      return this.fail(404);
    }
    return this.display();
  }
};
