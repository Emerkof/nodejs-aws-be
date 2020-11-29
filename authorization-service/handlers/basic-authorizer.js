import { AwsAuthorizer, BasicAuthorizer } from '../../lib/aws';

export async function authorize({ type, methodArn, authorizationToken }, context, cb) {
  const authorizer = new AwsAuthorizer(new BasicAuthorizer({ token: authorizationToken, methodArn }));

  if (!authorizer.isAuthorized()) {
    cb('Unauthorized');
  }

  const policy = authorizer.authorize();

  cb(null, policy);
}
