import dbAdaptor from '../../lib/db';

import { BaseService } from '../../lib/service';

import ProductModel from '../models/product';
import StockModel from '../models/stock';

class ProductService extends BaseService {
  constructor(adaptor, ProductModel, StockModel) {
    super(adaptor);

    this.ProductModel = ProductModel;
    this.StockModel = StockModel;

    this.listProducts = this.withReleaseConnection(this.listProducts).bind(this);
    this.getProduct = this.withReleaseConnection(this.getProduct).bind(this);
    this.createProduct = this.withReleaseConnection(
      this.withTransaction(this.createProduct)
    ).bind(this);
  }

  listProducts(client) {
    return this.ProductModel.findAll(client);
  };

  getProduct(client, productId) {
    return this.ProductModel.findOne(client, productId);
  };

  async createProduct(client, data) {
    const { count, ...productData } = data;

    const product = await this.ProductModel.create(client, productData);

    await this.StockModel.create(client, { count, product_id: product.id });

    return this.ProductModel.findOne(client, product.id);
  };
}

export default new ProductService(dbAdaptor, ProductModel, StockModel);
