import { handleRequestResponseDecorator } from '../../lib/response';

import ProductService from '../services/product';

export const getProductsList = handleRequestResponseDecorator(
  async function(event) {
    return ProductService.listProducts();
  }
);
