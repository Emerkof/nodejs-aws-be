import { handleRequestResponseDecorator } from '../../lib/response';
import { BadRequestError } from '../../lib/error';

import ImportService from '../services/import';

export const getImportProductSignedUrl = handleRequestResponseDecorator(
  async function(event) {
    const { queryStringParameters: { name } = {} } = event;

    if (!name) {
      throw new BadRequestError(`Missing 'name' parameter`);
    }

    const result = await ImportService.getImportProductSignedUrl(name);

    return result;
  }
);
