'use strict';

const generateResponse = (statusCode, body) => (
  {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify(body),
  }
);

module.exports.hello = (event, context, callback) => {
  console.log('Event:', JSON.stringify(event));

  callback(null, generateResponse(200, { message: `Hello ${event.requestContext.authorizer.principalId}!` }));
};
