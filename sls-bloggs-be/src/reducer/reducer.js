import {invokeLambda} from '../utils/lambda_utils';

export default function (event) {
  const lambdas = process.env.Lambdas.split('/');
  console.log('--- lambdas', lambdas);
  return lambdas.reduce((mem, FunctionName) => ([
      ...mem,
      invokeLambda(FunctionName, event)
    ])
    , []);
}

