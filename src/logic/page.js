module.exports = class extends think.Logic {
  renderAction() {
    this.rule = {
      url: {
        required: true,
        url: true,
      },
    };
  }
};
