const S3Mock = class {};
const SNSMock = class {};
const SQSMock = class {};

S3Mock.prototype.getSignedUrlPromise = jest.fn(() => Promise.resolve('url'));

export { S3Mock as S3, SNSMock as SNS, SQSMock as SQS };
