import { handleRequestResponseDecorator } from '../../lib/response';

import ProductService from '../services/product';

export const createProductBatch = handleRequestResponseDecorator(
  async function(event) {
    const { Records } = event;

    const result = await ProductService.createProductBatch(Records);

    return result;
  }
);
