import { Country, League, Prisma, Season } from '@prisma/client';
import prisma from '../lib/prisma';
import { LeagueData, Venue } from './types';

export const getFromDBLeagues = async (): Promise<
  (League & {
    Season: Season[];
    Country: Country;
  })[]
> => {
  const leagues = await prisma.league.findMany({
    include: {
      Country: true,
      Season: true,
    },
  }).catch((error) => {
    console.error(error);
    return [];
  });
  return leagues;
};

export const getLastFixturesByTeamId = async (
  teamId: number,
  number: number,
  status: string[]
): Promise<
  {
    id: number;
    TeamHome: {
      id: number;
    };
    score: Prisma.JsonValue;
  }[]
> => {
  const fixtures = await prisma.fixture.findMany({
    where: {
      OR: [
        {
          teamHomeId: teamId,
        },
        {
          teamAwayId: teamId,
        },
      ],
      status_: {
        in: status,
      },
      date: {
        lte: new Date(),
      },
    },
    orderBy: {
      date: 'asc',
    },
    take: number,

    select: {
      id: true,
      score: true,
      TeamHome: {
        select: {
          id: true,
        },
      },
    },
  }).catch((error) => {
    console.error(error);
    return null;
  });

  return fixtures;
};

export const getFromDBLeagueById = async (
  leagueId: number
): Promise<LeagueData> => {
  if (!leagueId) return null;
  return await prisma.league
    .findFirst({
      where: {
        id: leagueId,
      },
      include: {
        Country: true,
        Season: true,
      },
    })
    .then((leagueDB) => {
      if (!leagueDB) return null;
      return {
        country: leagueDB.Country,
        league: leagueDB,
        seasons: leagueDB.Season,
      } as LeagueData;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};

export const getFromDBVenueById = async (venueId: number): Promise<Venue> => {
  if (!venueId) return null;
  return await prisma.venue
    .findUnique({
      where: {
        id: venueId,
      },
      include: {
        Country: true,
      },
    })
    .then((venueDB) => {
      return venueDB as Venue;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};
