export default class StockModel {
  constructor({ count, product_id }) {
    this.count = count;
    this.product_id = product_id;
  }

  static async create(client, { count = 0, product_id }) {
    const { rows: result } = await client.query(
      `INSERT INTO ${this.tableName} (count, product_id) VALUES ($1, $2) RETURNING *`,
      [count, product_id]
    );

    return new StockModel(result);
  }
}

StockModel.tableName = 'stocks';
