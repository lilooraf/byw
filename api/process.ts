import { PrismaClient } from '@prisma/client';
import { bywAlgoFixture } from '../bywAlgo/process';

const prisma = new PrismaClient();

export async function bywAlgo(number: number) {
  console.log('Byw Algo...');

  let fixtures = await prisma.fixture.findMany({
    where: {
      date: {
        gte: new Date(),
      },
    },
    orderBy: {
      date: 'asc',
    },
    take: number,
  });

  for (const fixture of fixtures) {
    await bywAlgoFixture(fixture).catch((err) => {
      console.log(err);
    });
    console.log('Byw Algo Finished');
  }
}
