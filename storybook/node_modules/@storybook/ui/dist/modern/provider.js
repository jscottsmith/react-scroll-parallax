export default class Provider {
  getElements(_type) {
    throw new Error('Provider.getElements() is not implemented!');
  }

  handleAPI(_api) {
    throw new Error('Provider.handleAPI() is not implemented!');
  }

  getConfig() {
    console.error('Provider.getConfig() is not implemented!');
    return {};
  }

}