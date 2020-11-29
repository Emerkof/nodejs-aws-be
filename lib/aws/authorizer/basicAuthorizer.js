import base64 from 'base-64';

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

    return base64.decode(encodedPayload);
  }

  authorize() {
    const payload = this.decode();

    console.log(payload);
  }
}
