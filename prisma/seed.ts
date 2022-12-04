import { PrismaClient, Prisma } from '@prisma/client';
import { fetchLeagues } from '../api/fetch';
import { seedFixtures, seedLeagues, seedStandigns } from '../api/logic';
import { processFixture } from '../bywAlgo/process';
// import { storeLeague } from "../api/store";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    posts: {
      create: [
        {
          title: 'Join the Prisma Slack',
          content: 'https://slack.prisma.io',
          published: true,
        },
      ],
    },
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    posts: {
      create: [
        {
          title: 'Follow Prisma on Twitter',
          content: 'https://www.twitter.com/prisma',
          published: true,
        },
      ],
    },
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    posts: {
      create: [
        {
          title: 'Ask a question about Prisma on GitHub',
          content: 'https://www.github.com/prisma/prisma/discussions',
          published: true,
        },
        {
          title: 'Prisma on YouTube',
          content: 'https://pris.ly/youtube',
        },
      ],
    },
  },
];

async function main() {
  // console.log(`Start seeding ...`);
  // await seedLeagues(10);
  // console.log(`Leagues Seeded`);
  // await seedFixtures();
  // console.log(`Fixtures Seeded.`);
  // await seedStandigns();
  // console.log(`Standings Seeded.`);

  console.log('Byw Algo');
  let fixtures = await prisma.fixture.findMany({
    where: {
      date: {
        lte: new Date(),
      },
    },
    orderBy: {
      date: 'desc',
    },
    take: 40,
  });

  for (const fixture of fixtures) {
    await processFixture(fixture);
  }


  // await seedStandigns();

  // let leagues = await fetchLeagues();
  // leagues.forEach(async (league) => {
  //   await storeLeague(league);
  // });
  // await new Promise((resolve) => setTimeout(resolve, 10000));
  // while (true) {
  //   updateFixtures();
  //   await new Promise((resolve) => setTimeout(resolve, 60000));
  // }

  // getNextFixtures(20);
  // for (const u of userData) {
  //   const user = await prisma.user.create({
  //     data: u,
  //   });
  //   console.log(`Created user with id: ${user.id}`);
  // }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
