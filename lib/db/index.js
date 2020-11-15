import { Pool } from 'pg';

const { PG_HOST, PG_PORT, PG_USERNAME, PG_DATABASE, PG_PASSWORD } = process.env;

const pool = new Pool({
  host: PG_HOST,
  port: PG_PORT,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  database: PG_DATABASE,
  max: 20,
  connectionTimeoutMillis: 2000,
  ssl: {
    rejectUnauthorized: false,
  },
});

const adaptor = {
  async getClient() {
    const client = await pool.connect();
    const query = client.query;
    const release = client.release;

    const timeout = setTimeout(() => {
      console.error('A client has been checked out for more than 5 seconds!')
      console.error(`The last executed query on this client was: ${client.lastQuery}`)
    }, 5000);

    client.query = (...args) => {
      client.lastQuery = args
      return query.apply(client, args)
    };

    client.release = () => {
      clearTimeout(timeout)

      client.query = query

      client.release = release
      return release.apply(client)
    };

    return client;
  },
};

export default adaptor;
