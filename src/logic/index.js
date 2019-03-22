module.exports = class extends think.Logic {
  indexAction() {
    this.rule ={
      url: {
        required: true,
        url: true,
      }
    }
  }
};
