import { handleRequestResponseDecorator } from '../../lib/response';

import ImportService from '../services/import';

export const parseProductsFile = handleRequestResponseDecorator(
  async function(event) {
    const { Records } = event;

    return ImportService.parseProductCsv(Records);
  }
);
