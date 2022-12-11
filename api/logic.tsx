import { Country, League, prisma, Season } from '@prisma/client';
import {
  fetchH2h,
  fetchLeagueById,
  fetchLeagues,
  fetchNextFixtures,
  fetchStandingByTeamId,
  fetchVenueById,
  fetchFixturesByLeagueIdAndSeason,
  fetchStandingsByLeagueId,
  fetchLastFixtures,
} from './fetch';
import {
  getFromDBLeagueById,
  getFromDBLeagues,
  getFromDBVenueById,
} from './getFromDB';
import {
  storeFixture,
  // storeStanding,
  storeLeague,
  storeStandings,
} from './store';
import { Fixture, LeagueData, Venue } from './types';

enum INFO {
  H2H_MIN = 10,
  H2H_NUMBER = 40,
}

export const seedLeagues = async (leagueNB?: number) => {
  console.log(`Seeding Leagues...`);

  let leagues = await fetchLeagues();

  let i = 0;
  for (const league of leagues) {
    if (leagueNB !== undefined && i > leagueNB - 1) return;
    i++;
    await storeLeague(league);
  }
};

export const seedFixtures = async () => {
  console.log(`Seeding fixtures...`);

  let leagues = await getFromDBLeagues();

  for (const league of leagues) {
    for (const season of league.Season) {
      // Block seasons before actual year-2
      if (season.year < new Date().getFullYear() - 2) continue;
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

    let leagues = await getFromDBLeagues();

    for (const league of leagues) {

      for (const season of league.Season) {
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

export const updateFixtures = () => {
  fetchLastFixtures(50).then((fixtures) => {
    fixtures?.forEach((fixture) => {
      storeFixture(fixture);
    });
  });
  console.log('updateFixtures');
};

export const getNextFixtures = async (number = 1) => {
  const fixtures = await fetchNextFixtures(number);

  fixtures.forEach(async (fixture: Fixture) => {
    const fixturesH2h = await fetchH2h(
      fixture.teams.home.id,
      fixture.teams.away.id,
      INFO.H2H_NUMBER
    );

    console.log(
      fixturesH2h.length + ' H2H for fixture ' + fixture.fixture.id + '.'
    );

    if (fixturesH2h.length >= INFO.H2H_MIN) {
      console.log('OK');
      await logic(fixture);
      console.log('Storing h2h for fixture ' + fixture.fixture.id);
      fixturesH2h.forEach((fix) => {
        logic(fix, fixture);
      });
    }
  });
};

export const getLeagueById = async (leagueId: number): Promise<LeagueData> => {
  let league: LeagueData = await getFromDBLeagueById(leagueId);

  if (!league) league = await fetchLeagueById(leagueId);

  return league;
};

export const getVenueById = async (venueId: number): Promise<Venue> => {
  let venue: Venue = await getFromDBVenueById(venueId);

  if (!venue) venue = await fetchVenueById(venueId);

  return venue;
};

export const logic = async (
  fixture: Fixture,
  parent: Fixture | null = null
) => {
  const league = await getLeagueById(fixture.league.id);
  const venue = await getVenueById(fixture.fixture.venue.id);

  // storeFixture(fixture, league, venue, parent).then(() => {
  //   fetchStandingByTeamId(fixture.teams.away.id, "2022").then((standings) => {
  //     // storeStanding(fixture.teams.away.id, standings);
  //   });
  //   fetchStandingByTeamId(fixture.teams.home.id, "2022").then((standings) => {
  //     // storeStanding(fixture.teams.home.id, standings);
  //   });
  // });

  // fetchTeamByID(fixture.teams.home.id);
  // fetchTeamByID(fixture.teams.away.id);
  // fetchLeagueByID(fixture.league.id);
};
