import { PrismaClient } from '@prisma/client';
import { bywAlgoFixture } from '../bywAlgo/process';

const prisma = new PrismaClient();

export async function bywAlgo(days: number) {
  console.log('Byw Algo...');

  const startDate = new Date();
  const endDate = new Date(new Date().getTime() + (days * 24 * 60 * 60 * 1000));

  let fixtures = await prisma.fixture.findMany({
    where: {
      date: {
        lte: endDate,
        gte: startDate,
      },
    },
    orderBy: {
      date: 'asc',
    },
  });
  console.log(`Byw Algo: ${fixtures.length} fixtures found between ${startDate} and ${endDate}`);
  

  for (const fixture of fixtures) {
    await bywAlgoFixture(fixture).catch((err) => {
      console.log(err);
    });
  }
  console.log(`Byw Algo Finished`);
}
