import { Country, League, Season } from '@prisma/client';
import prisma from '../lib/prisma';
import {
  fetchLeagues,
  fetchFixturesByLeagueIdAndSeason,
  fetchStandingsByLeagueId,
  fetchBets,
  OddBetApi,
  fetchPredictionFixtureId,
} from './fetch';
import { getFromDBLeagues } from './getFromDB';
import { bywAlgo } from './process';
import {
  storeFixture,
  storeLeague,
  storeOddBetApi,
  storePrediction,
  storeStandings,
} from './store';
import { LeagueData } from './types';

export const seedLeagues = async (leagueNB?: number) => {
  console.log(`Seeding Leagues...`);

  let leagues: LeagueData[] = await fetchLeagues();

  let i = 0;
  for (const league of leagues) {
    if (leagueNB !== undefined && i > leagueNB - 1) return;
    i++;
    await storeLeague(league);
  }
  console.log(`Leagues Seeded`);
};

export const seedFixtures = async () => {
  console.log(`Seeding fixtures...`);

  let leagues: (League & {
    Season: Season[];
    Country: Country;
  })[] = await getFromDBLeagues();

  for (const league of leagues) {
    for (const season of league.Season) {
      // Block seasons before actual year-1
      if (season.year < new Date().getFullYear() - 1) {
        console.log(`Skipping ${league.name} ${season.year}`);
        continue;
      }
      await fetchFixturesByLeagueIdAndSeason(league.id, season.year).then(
        async (fixtures) => {
          let i = 0;
          for (const fixture of fixtures) {
            await storeFixture(fixture).then(() => {
              console.log(`Fixture stored: ${i++}/${fixtures.length}`);
            });
          }
          console.log(
            'fixtures stored for league ' +
              league.id +
              ' and season ' +
              season.year
          );
        }
      );
    }
  }
  console.log(`Fixtures Seeded.`);
};

export const seedStandigns = async () => {
  console.log(`Seeding Standigns...`);

  let leagues: (League & {
    Season: Season[];
    Country: Country;
  })[] = await getFromDBLeagues();

  for (const league of leagues) {
    for (const season of league.Season) {
      // Block seasons before actual year-2
      if (season.year < new Date().getFullYear() - 1) continue;
      await fetchStandingsByLeagueId(league.id, season.year.toString()).then(
        async (standings) => {
          await storeStandings(standings);
          console.log(
            'standings stored for league ' +
              league.id +
              ' and season ' +
              season.year
          );
        }
      );
    }
  }
  console.log(`Standings Seeded.`);
};

export const seedOddBets = async (daysToSeed: number) => {
  let date = new Date();

  console.log(`Deleting Bets...`);

  await prisma.$queryRawUnsafe(`Truncate "Bet" restart identity cascade;`);
  await prisma.$queryRawUnsafe(`Truncate "Odd" restart identity cascade;`);

  console.log(`Bets Deleted`);

  for (let i = 1; i <= daysToSeed; i++) {
    console.log(
      `Seeding ${i} of ${daysToSeed} (${date.toLocaleDateString()})...`
    );
    await fetchBets(date).then(async (oddBets: OddBetApi[]) => {
      for (const oddBet of oddBets as OddBetApi[]) {
        await prisma.fixture
          .findUnique({
            where: {
              id: oddBet.fixture.id,
            },
          })
          .then(async (fixture) => {
            if (fixture) {
              await storeOddBetApi(oddBet);
            }
          });
      }
    });
    date.setDate(date.getDate() + 1);
  }
  console.log(`Bets Seeded.`);
};

export const seedPredictions = async (number: number) => {
  console.log(`Seeding Predictions...`);

  const fixtures = await prisma.fixture.findMany({
    take: number,
    where: {
      date: {
        gt: new Date(),
      },
    },
    orderBy: {
      date: 'asc',
    },
    select: {
      id: true,
    },
  });

  for (const fixture of fixtures) {
    await fetchPredictionFixtureId(fixture.id).then(async (prediction) => {
      await storePrediction(prediction, fixture.id);
    });
  };
  console.log(`Predictions Seeded.`);
};

export const seedAll = async () => {
  await seedLeagues(50).then(async () => {
    await seedFixtures().then(async () => {
      await seedStandigns().then(async () => {
        await bywAlgo(2).then(async () => {
          await seedOddBets(30).then(async () => {
            await seedPredictions(100);
          });
        });
      });
    });
  });
};
