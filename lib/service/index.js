export class BaseService {
  constructor(adaptor) {
    this._adaptor = adaptor;
  }

  withReleaseConnection(fn) {
    return async function(...args) {
      const client = await this._adaptor.getClient();

      let result;

      try {
        result = await fn.apply(this, [client, ...args]);
      } catch (error) {
        throw error;
      } finally {
        await client.release();
      }

      return result;
    }
  }

  withTransaction(fn) {
    return async function(client, ...args) {
      await client.query('BEGIN;');

      try {
        const result = await fn.apply(this, [client, ...args]);

        await client.query('COMMIT;');

        return result;
      } catch (error) {
        await client.query('ROLLBACK;');

        throw error;
      }
    }
  }
};
