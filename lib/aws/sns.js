import { SNS } from 'aws-sdk';

class AwsSNS {
  constructor() {
    this._sns = new SNS({ region: 'eu-west-1' });
  }

  publish(params) {
    return this._sns.publish(params).promise();
  }
}

export default new AwsSNS();
