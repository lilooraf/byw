import {
  Handler,
  HandlerEvent,
  HandlerContext,
  schedule,
} from '@netlify/functions';
import { seedFixtures, seedLeagues, seedStandigns } from '../../api/logic';
import { bywAlgo } from '../../api/process';

const fetchApi: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  console.log(`Start seeding ...`);

  seedLeagues(5).then(() => {
    console.log(`Leagues Seeded`);
    seedFixtures().then(() => {
      console.log(`Fixtures Seeded.`);
      seedStandigns().then(() => {
        console.log(`Standings Seeded.`);
        bywAlgo(100).then(() => {
          console.log(`Seeding finished.`);
        });
      });
    });
  });

  return {
    statusCode: 200,
  };
};

const handler = schedule('@hourly', fetchApi);

export { handler };
