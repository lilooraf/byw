import { Country, League, Season } from '@prisma/client';
import {
  fetchLeagues,
  fetchFixturesByLeagueIdAndSeason,
  fetchStandingsByLeagueId,
} from './fetch';
import { getFromDBLeagues } from './getFromDB';
import { storeFixture, storeLeague, storeStandings } from './store';
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
};

export const seedFixtures = async () => {
  console.log(`Seeding fixtures...`);

  let leagues: (League & {
    Season: Season[];
    Country: Country;
  })[] = await getFromDBLeagues();

  for (const league of leagues) {
    for (const season of league.Season) {
      // Block seasons before actual year-2
      if (season.year < new Date().getFullYear() - 1) continue;
      await fetchFixturesByLeagueIdAndSeason(league.id, season.year).then(
        async (fixtures) => {
          for (const fixture of fixtures) {
            await storeFixture(fixture);
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
      if (season.year < new Date().getFullYear() - 2) continue;
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
};