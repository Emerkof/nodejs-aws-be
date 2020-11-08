import { getProductsById } from './get-product';

describe('getProductsById', () => {
  it('should return requested product content, if exists', async () => {
    const result = await getProductsById({ pathParameters: { id: '2' } });

    expect(result.statusCode).toBe(200);

    const parsedBody = JSON.parse(result.body);

    expect(parsedBody).toEqual(
      expect.objectContaining({
        id: '2',
        name: 'Blue Lagoon',
        description: 'Blue Curaçao mixed with vodka and lemonade.',
        price: '5.00',
      })
    );
  });

  it(`should return NotFound error, if the product doesn't exist`, async () => {
    const result = await getProductsById({ pathParameters: { id: 'nan' } });

    expect(result.statusCode).toBe(404);

    const parsedBody = JSON.parse(result.body);

    expect(parsedBody).toEqual(
      expect.objectContaining({
        error: {
          message: 'Product not found.'
        }
      })
    );
  });
});
