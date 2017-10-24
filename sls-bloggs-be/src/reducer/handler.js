/**
 * This will receive messages from the cadec-messageX thing topic, this topic is setup as part of the thingname.
 * Each message will arrive as a redux action.
 * It will switch on these actions and reduce the state accordingly.
 * The state is held in a dynamo db.
 */
import reduce from './reducer';
import iotdata from '../utils/iot_adapter';

// Require Serverless ENV vars
const ServerlessHelpers = require('serverless-helpers-js').loadEnv();

// Lambda Handler
export default async function reducer(event, context, callback) {
  console.log('--- reducer event', JSON.stringify(event, null, 2));
  // call reducer lambdas and then re-publish their results
  const stateTopic = iotdata({endpoint: process.env.IOT_Endpoint, topic: process.env.State_Topic});
  try {
    const newEvents = await Promise.all(
      reduce(event)
    );
    console.log('--- newEvents', newEvents);
    (newEvents || []).forEach(
      resultEvent => {
        const payload = JSON.parse(resultEvent.Payload);
        if(payload) stateTopic.publish(payload);
      }
    );
    callback(null, 'end reduce');
  } catch(error){
    callback(error);
    console.log(error);
  }
};
