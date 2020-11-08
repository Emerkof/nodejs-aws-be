import { handleResponseDecorator } from '../../lib/response';

import products from '../products-data.json';

export const getProductsList = handleResponseDecorator(
  async function(event) {
    return products;
  }
);
