
import { AwsAuthorizer, BasicAuthorizer } from '../../lib/aws';

export async function authorize({ type, methodArn, authorizationToken }, cb) {
  const authorizer = new AwsAuthorizer(new BasicAuthorizer({ token: authorizationToken, methodArn }));

  if (!authorizer.isAuthorized()) {
    cb('Unauthorized.');
  }


  authorizer.authorize();
}
