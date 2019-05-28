const Base = require('../base.js');
const path = require('path');
const fs = require('fs');
const unlink = think.promisify(fs.unlink, fs);
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
  async screenshotAction() {
    const url = this.get('url');
    const fullpage = this.get('fullpage');
    const windowsize = this.get('windowsize');
    const pagesize = this.get('viewport');
    const waitfor = this.get('waitfor');
    const cookies = this.header('cookie');
    try {
      const spider = think.service('spider', {
        url,
        cookies,
        options: {
          windowsize: windowsize,
          pagesize,
          waitfor,
        },
      });
      await spider.screenshot({
        fullPage: fullpage == 1 ? true : false,
      });
    } catch (error) {
      think.logger.error(error);
      return this.fail('截图失败');
    }
    const filepath = path.join(think.ROOT_PATH, './runtime/screenshot.png');
    this.download(filepath);
    // 删除临时文件
    unlink(filepath);
  }
};
