const S3Mock = class {};

S3Mock.prototype.getSignedUrlPromise = jest.fn(() => Promise.resolve('url'));

export { S3Mock as S3 };
