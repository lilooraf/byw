import {
  Handler,
  HandlerEvent,
  HandlerContext,
  schedule,
} from '@netlify/functions';
import { seedAll, seedFixtures, seedLeagues, seedStandigns } from '../../api/logic';
import { bywAlgo } from '../../api/process';

const fetchApi: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // seedAll();
  return {
    statusCode: 200,
  };
};

const handler = schedule('@hourly', fetchApi);

export { handler };
