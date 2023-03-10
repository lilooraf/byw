import { PrismaClient, Prisma } from '@prisma/client';
import { fetchBets, OddBetApi } from '../api/fetch';
import {
  seedFixtures,
  seedLeagues,
  seedOddBets,
  seedStandigns,
  seedAll,
} from '../api/logic';
import { bywAlgo } from '../api/process';
import { storeOddBetApi } from '../api/store';
import { bywAlgoFixture } from '../bywAlgo/process';

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
  console.log(`Start seeding ...`);

  await seedAll();

  
  // seedOddBets(3);
  // seedStandigns();
  // bywAlgo(100);
  // prisma.fixture.findFirst({
  //   where: {
  //     id: 924381,
  //     // id: 878123,
  //   },
  // }).then((fixture) => {
  //   bywAlgoFixture(fixture).catch((err) => {
  //     console.log(err);
  //   });
  // });




  console.log(`Seeding finished.`);

  // for (const u of userData) {
  //   const user = await prisma.user.create({
  //     data: u,
  //   });
  //   console.log(`Created user with id: ${user.id}`);
  // }
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
