const Base = require('./base.js');
const fs = require('fs');
const path = require('path');
const readFile = think.promisify(fs.readFile, fs);
const statFile = think.promisify(fs.stat, fs);
const writeFile = think.promisify(fs.writeFile, fs);
module.exports = class extends Base {
  indexAction() {
    return this.display();
  }
  async renderAction() {
    const url = this.get('url');
    const md5Name = think.md5(url);
    const htmlPath = path.join(think.ROOT_PATH, `runtime/${md5Name}.html`);
    try {
      const fileInfo = await statFile(htmlPath);
      const mtime = fileInfo.mtimeMs;
      const now = Date.now();
      if (now - mtime > 60 * 1000) {
        throw Error('缓存');
      } else {
        const content = await readFile(htmlPath, 'utf8');
        this.assign('html', content);
      }
    } catch (error) {
      think.logger.error(error);
      try {
        const cookies = this.header('cookie');
        const spider = think.service('spider', {
          cookies,
          url,
        });
        const result = await spider.render();
        this.assign('html', result.content);
        await writeFile(htmlPath, result.content, 'utf8');
      } catch (error) {
        think.logger.error(error);
        return this.fail(404);
      }
    }
    return this.display();
  }
};
