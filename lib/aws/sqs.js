import { SQS } from 'aws-sdk';

class AwsSQS {
  constructor() {
    this._sqs = new SQS({ region: 'eu-west-1' });
  }

  sendMessage(params) {
    return this._sqs.sendMessage(params).promise();
  }
}

export default new AwsSQS();
