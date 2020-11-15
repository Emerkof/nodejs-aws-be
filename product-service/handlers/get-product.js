import { handleRequestResponseDecorator } from '../../lib/response';
import { NotFoundError, BadRequestError } from '../../lib/error';

import ProductService from '../services/product';

export const getProductsById = handleRequestResponseDecorator(
  async function(event) {
    const { pathParameters: { id } } = event;

    const uuidRegexp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!uuidRegexp.test(id)) {
      throw new BadRequestError('Invalid parameter format.');
    }

    const result = await ProductService.getProduct(id);

    if (!result) {
      throw new NotFoundError('Product not found.');
    }

    return result;
  }
);
