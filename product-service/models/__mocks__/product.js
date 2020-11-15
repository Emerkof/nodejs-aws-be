import mockProducts from '../../lib/test/mock-data.json';

export default class MockProductModel {
  static async findAll() {
    return mockProducts;
  }

  static async findOne(client, id) {
    return mockProducts.find(product => product.id === id);
  }
}
