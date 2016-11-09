'use strict';

const generatePolicy = (principalId, effect, resource) => (
  {
    principalId: principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource
        }
      ]
    }
  }
);

module.exports.authorizer = (event, context, callback) => {
  const token = event.authorizationToken;

  switch (token) {
    case 'allow':
      callback(null, generatePolicy('user-principalId', 'Allow', event.methodArn));
      break;
    case 'deny':
      callback(null, generatePolicy('user-principalId', 'Deny', event.methodArn));
      break;
    case 'unauthorized':
      callback("Unauthorized");
      break;
    default:
      callback("error");
  }
};
