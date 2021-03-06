export default class AwsPolicy {
  static generate(principalId, effect, resource) {
    const policy = {};

    policy.principalId = principalId;

    if (effect && resource) {
      const policyDocument = {};

      policyDocument.Version = '2012-10-17';
      policyDocument.Statement = [];

      const statementOne = {};

      statementOne.Action = 'execute-api:Invoke';
      statementOne.Effect = effect;
      statementOne.Resource = resource;

      policyDocument.Statement.push(statementOne);

      policy.policyDocument = policyDocument;
    }

    return policy;
  }
};
