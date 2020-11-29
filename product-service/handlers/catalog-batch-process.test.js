import ProductService from '../services/product';
import { createProductBatch } from './catalog-batch-process';

describe('createProductBatch', () => {
  let createProductBatchSpy;

  beforeAll(() => {
    createProductBatchSpy = jest.spyOn(ProductService, 'createProductBatch');
    createProductBatchSpy.mockImplementation(() => Promise.resolve());
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  })

  it('should call productService.createProductBatch with appropriate params and return success code', async () => {
    const mockEvent = { Records: [{ id: '123' }] };

    const result = await createProductBatch(mockEvent);

    expect(createProductBatchSpy).toHaveBeenCalledTimes(1);
    expect(createProductBatchSpy.mock.calls[0]).toEqual([mockEvent.Records]);

    expect(result.statusCode).toBe(200);
  });
});
