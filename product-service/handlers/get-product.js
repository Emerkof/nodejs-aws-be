import { handleResponseDecorator } from '../../lib/response';
import { NotFoundError } from '../../lib/error';

import products from '../products-data.json';

export const getProductsById = handleResponseDecorator(
  async function(event) {
    const { pathParameters: { id } } = event;

    const result = products.find(product => product.id === id);

    if (!result) {
      throw new NotFoundError('Product not found.');
    }

    return result;
  }
);
