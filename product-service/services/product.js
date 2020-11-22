import dbAdaptor from '../../lib/db';

import { BaseService } from '../../lib/service';
import { AwsSNS} from '../../lib/aws';

import ProductModel from '../models/product';
import StockModel from '../models/stock';

const { SNS_PRODUCT_CREATED_TOPIC_ARN } = process.env;
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
    this.createProductBatch = this.withReleaseConnection(
      this.withTransaction(this.createProductBatch)
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

  async createProductBatch(client, records) {
    const promiseFns = [];

    for (const record of records) {
      const { count, ...productData } = JSON.parse(record.body);

      promiseFns.push(async () => {
        const product = await this.ProductModel.create(client, productData);

        return this.StockModel.create(client, { count, product_id: product.id });
      });
    }

    const stocks = await Promise.all(promiseFns.map(fn => fn()));

    return AwsSNS.publish({
      Subject: 'New products created',
      TopicArn: SNS_PRODUCT_CREATED_TOPIC_ARN,
      Message: JSON.stringify(stocks),
    });
  }
}

export default new ProductService(dbAdaptor, ProductModel, StockModel);
