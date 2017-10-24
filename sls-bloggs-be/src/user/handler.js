import * as userService from './service';
import { wrapCallback } from '../utils/lambda_utils';
import AWS from 'aws-sdk';
/**
 * Serverless Module: Lambda Handler
 * - Your lambda functions should be a thin wrapper around your own separate
 * modules, to keep your code testable, reusable and AWS independent
 * - 'serverless-helpers-js' module is required for Serverless ENV var support.  Hopefully, AWS will add ENV support to Lambda soon :)
 */

// Require Serverless ENV vars
const ServerlessHelpers = require('serverless-helpers-js').loadEnv();

// Lambda Handler
export default async function users(event, context, callback) {
  console.log('--- user event', JSON.stringify(event, null, 2));
  console.log('--- invoke users');
  // const messagesLambda = process.env.Messages_Lambda;
  // console.log('--- messages lambda', messagesLambda);
  // const lambda = new AWS.Lambda();
  // const params = {
    // FunctionName: messagesLambda, [> required <]
    // Payload: JSON.stringify({message: 'hi from users'})
  // };
  // lambda.invoke(params, function(err, data) {
    // if (err) console.log(err, err.stack); // an error occurred
    // else console.log(data); // successful response
  // });
  wrapCallback(event, callback, () => undefined);
};
