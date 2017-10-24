import { wrapCallback, wrapReducerCallback } from "../utils/lambda_utils";
/**
 * Serverless Module: Lambda Handler
 * - Your lambda functions should be a thin wrapper around your own separate
 * modules, to keep your code testable, reusable and AWS independent
 * - 'serverless-helpers-js' module is required for Serverless ENV var support.  Hopefully, AWS will add ENV support to Lambda soon :)
 */

// Require Serverless ENV vars
const ServerlessHelpers = require("serverless-helpers-js").loadEnv();

// Lambda Handler
export default async function message(event, context, callback) {
  console.log(JSON.stringify(event, null, 2));
  let action = {};
  switch(event.method){
    case 'GET' :
      action = { type: "GET_COMMENT", payload: { id: event.path.id } };
      break;
    case 'DELETE' :
      action = { type: "DELETE_COMMENT", payload: { id: event.path.id } };
      break;
    case 'POST' :
      action = { type: "CREATE_COMMENT", payload: event.body };
      break;
    case 'PUT' :
      action = { type: "UPDATE_COMMENT", payload: event.body };
      break;
  }
  wrapCallback(action, callback, reduce);
}
