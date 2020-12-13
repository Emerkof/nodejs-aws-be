export { default as BasicAuthorizer } from './basicAuthorizer';

export class AwsAuthorizer {
  constructor(AuthorizationStrategy) {
    this.AuthorizationStrategy = AuthorizationStrategy;
  }

  decode() {
    return this.AuthorizationStrategy.decode();
  }

  isAuthorized() {
    return this.AuthorizationStrategy.isAuthorized();
  }

  authorize() {
    return this.AuthorizationStrategy.authorize();
  }
}
