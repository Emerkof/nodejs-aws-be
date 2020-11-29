import base64 from 'base-64';

import { AwsPolicy}  from '../index';

const { LAMBDA_AUTHORIZER_LOGIN, LAMBDA_AUTHORIZER_PASSWORD = 'TEST_PASSWORD' } = process.env;

export default class BasicAuthorizer {
  constructor({ token, methodArn }) {
    this.token = token;
    this.methodArn = methodArn;
  }

  isAuthorized() {
    return this.token && this.token.startsWith('Basic ');
  }

  decode() {
    const [authType, encodedPayload] = this.token.split(' ');

    return base64.decode(encodedPayload).split(':');
  }

  authorize() {
    const [username, password] = this.decode();

    if (username === LAMBDA_AUTHORIZER_LOGIN && password === LAMBDA_AUTHORIZER_PASSWORD) {
      return AwsPolicy.generate(`User ${username}`, 'Allow', this.methodArn);
    }

    return AwsPolicy.generate(`User ${username}`, 'Deny', this.methodArn);
  }
}
