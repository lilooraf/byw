import { Handler, HandlerEvent, HandlerContext, schedule } from "@netlify/functions";
import { seedFixtures, seedLeagues, seedStandigns } from "../../api/logic";
import { bywAlgo } from "../../api/process";

const fetchApi: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    console.log("Received event:", event);
    
    console.log(`Start fetching ...`);
    await seedLeagues(5);
    console.log(`Leagues Seeded`);
    await seedFixtures();
    console.log(`Fixtures Seeded.`);
    await seedStandigns();
    console.log(`Standings Seeded.`);
    bywAlgo(100);
    console.log(`Stop fetching`);

    return {
        statusCode: 200,
    };
};

const handler = schedule("@daily", fetchApi)

export { handler };