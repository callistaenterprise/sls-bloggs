import { runGraphQL } from "./service";
/**
 * Serverless Module: Lambda Handler
 * - Your lambda functions should be a thin wrapper around your own separate
 * modules, to keep your code testable, reusable and AWS independent
 * - 'serverless-helpers-js' module is required for Serverless ENV var support.  Hopefully, AWS will add ENV support to Lambda soon :)
 */

// Require Serverless ENV vars
const ServerlessHelpers = require("serverless-helpers-js").loadEnv();

// Require Logic
// var lib = require('../lib');

// Lambda Handler
const graphql = (event, context, callback) => {
  console.log('---- run graphql!');
  runGraphQL(event, callback);
};

export default graphql;
