import { getProductsList } from './list-products';

describe('getProductsList', () => {
  it('should return list of all products', async () => {
    const result = await getProductsList();

    expect(result.statusCode).toBe(200);

    const parsedBody = JSON.parse(result.body);

    expect(parsedBody).toHaveLength(9);
  });
});
