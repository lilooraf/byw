import { PrismaClient, Prisma, Fixture } from '@prisma/client';
import { processFixture } from '../bywAlgo/process';

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
    await processFixture(fixture).catch((e) => {
      console.log(e);
    });
    console.log('Byw Algo Finished');
  }
}
