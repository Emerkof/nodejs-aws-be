import { handleRequestResponseDecorator } from '../../lib/response';

import ProductService from '../services/product';

export const createProduct = handleRequestResponseDecorator(
  async function(event) {
    const { body } = event;

    const result = await ProductService.createProduct(body);

    return result;
  }
);
