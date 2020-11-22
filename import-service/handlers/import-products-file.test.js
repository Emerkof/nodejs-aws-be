const { IoT1ClickDevicesService } = require("aws-sdk");

import { getImportProductSignedUrl } from './import-products-file';

describe('getImportProductSignedUrl', () => {
  const event = { queryStringParameters: { name: 'test' } };

  it('should return signed upload URL for the filename being passed', async () => {
    const response = await getImportProductSignedUrl(event);

    expect(response.statusCode).toBe(200);

    const parsedBody = JSON.parse(response.body);

    expect(parsedBody).toMatchObject({
      url: expect.any(String),
    });
  });
});
