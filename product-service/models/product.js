import StockModel from './stock';

export default class ProductModel {
  constructor({ id, title, description, ingredients, image_url, stock , price}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.ingredients = ingredients;
    this.imageUrl = image_url;
    this.stock = stock;
    this.price = price;
  }

  static async findAll(client) {
    const { rows: results } = await client.query(
      `SELECT * FROM ${this.tableName} INNER JOIN ${StockModel.tableName} ON ${this.tableName}.id = ${StockModel.tableName}.product_id`,
    );

    return results.map(this.mapToModel);
  };

  static async findOne(client, productId) {
    const { rows: result } = await client.query(
      `SELECT * FROM ${this.tableName} INNER JOIN ${StockModel.tableName} ON
      ${this.tableName}.id = ${StockModel.tableName}.product_id WHERE ${this.tableName}.id = $1`,
      [productId]
    );

    if (!result[0]) { return null; }

    return this.mapToModel(result[0]);
  };

  static async create(client, { title, price, description = '', ingredients = [], image_url }) {
    const { rows: result } = await client.query(
      `INSERT INTO ${this.tableName} (title, price, description, ingredients, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, price, description, ingredients, image_url]
    );

    return this.mapToModel(result[0]);
  }

  static mapToModel(result) {
    const { count, ...productFields } = result;

    return {
      ...new ProductModel(productFields),
      stock: new StockModel({ count, product_id: productFields.id }),
    };
  }
}

ProductModel.tableName = 'products';
