import { S3 } from 'aws-sdk';

class AwsS3 {
  constructor() {
    this._s3 = new S3({ region: 'eu-west-1' });
  }

  getSignedUrl(operation, params = {}) {
    return this._s3.getSignedUrlPromise(operation, params);
  }

  getObject(params = {}) {
    return this._s3.getObject(params);
  }

  copyObject(params = {}) {
    return this._s3.copyObject(params).promise();
  }

  deleteObject(params = {}) {
    return this._s3.deleteObject(params).promise();
  }
}

export default new AwsS3();
