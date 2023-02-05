import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';
import {
  Country,
  Fixture,
  League,
  Prisma,
  Team,
  Venue,
  Standing,
  Byw,
  Bookmaker,
  Bet,
  Odd,
  Prediction,
} from '@prisma/client';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
  const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

  const dategt = req.query.dategt ? new Date(req.query.dategt as string) : undefined;
  const datelt = req.query.datelt ? new Date(req.query.datelt as string) : undefined;
  const dateequals = req.query.dateequals ? new Date(req.query.dateequals as string) : undefined;
  const dategte = req.query.dategte ? new Date(req.query.dategte as string) : undefined;
  const datelte = req.query.datelte ? new Date(req.query.datelte as string) : undefined;
  const dateinBefore = req.query.datein ? new Date(req.query.dateinBefore as string) : undefined;
  const dateinAfter = req.query.datein ? new Date(req.query.dateinAfter as string) : undefined;
  const leagues: string = req.query.leagues ? req.query.leagues as string : undefined;
  const leaguesNumber: number[] = [];

  if (leagues) {
    leagues.split(',').forEach((league) => {
      leaguesNumber.push(parseInt(league));
    });
  }

  const session = await getSession({ req });
  if (session) {
    return await prisma.fixture
      .findMany({
        where: {
          League: {
            id: {
              in: leaguesNumber,
            },
          },
          date: {
            ...(dategt ? { gt: dategt } : {}),
            ...(datelt ? { lt: datelt } : {}),
            ...(dateequals ? { equals: dateequals } : {}),
            ...(dategte ? { gte: dategte } : {}),
            ...(datelte ? { lte: datelte } : {}),
            ...(dateinBefore && dateinAfter ? { in: [dateinBefore, dateinAfter] } : {}),
          },
        },
        orderBy: {
          date: 'asc',
        },
        take: limit,
        cursor: offset ? { id: offset } : undefined,
        skip: offset ? 1 : undefined,
        select: {
          id: true,
          date: true,
          winnerAway: true,
          winnerHome: true,
          teamAwayId: true,
          teamHomeId: true,
          status_: true,
          awayScore: true,
          homeScore: true,
          leagueId: true,
          venueId: true,
          score: true,
          timezone: true,
          seasonYear: true,
          Prediction: true,
          Bets: {
            where: {
              name: 'Match Winner',
            },
            include: {
              Odds: true,
              Bookmaker: {
                select: {
                  name: true,
                },
              },
            },
          },
          Byw: true,
          League: {
            include: {
              Country: true,
            },
          },
          TeamAway: {
            include: {
              Standing: true,
              Fixtures: {
                select: {
                  id: true,
                  date: true,
                  winnerAway: true,
                  winnerHome: true,
                  teamAwayId: true,
                  teamHomeId: true,
                  status_: true,
                },
                where: {
                  date: {
                    lte: new Date(),
                  },
                  status_: {
                    in: ['FT', 'AET', 'PEN'],
                  },
                },
                orderBy: {
                  date: 'desc',
                },
                take: 5,
              },
              FixturesAway: {
                select: {
                  id: true,
                  date: true,
                  winnerAway: true,
                  winnerHome: true,
                  teamAwayId: true,
                  teamHomeId: true,
                  status_: true,
                },
                where: {
                  date: {
                    lte: new Date(),
                  },
                  status_: {
                    in: ['FT', 'AET', 'PEN'],
                  },
                },
                orderBy: {
                  date: 'desc',
                },
                take: 5,
              },
              FixturesHome: {
                select: {
                  id: true,
                  date: true,
                  winnerAway: true,
                  winnerHome: true,
                  teamAwayId: true,
                  teamHomeId: true,
                  status_: true,
                },
                where: {
                  date: {
                    lte: new Date(),
                  },
                  status_: {
                    in: ['FT', 'AET', 'PEN'],
                  },
                },
                orderBy: {
                  date: 'desc',
                },
                take: 5,
              },
              League: {
                select: {
                  Country: true,
                },
              },
            },
          },
          TeamHome: {
            include: {
              Standing: true,
              Fixtures: {
                select: {
                  id: true,
                  date: true,
                  winnerAway: true,
                  winnerHome: true,
                  teamAwayId: true,
                  teamHomeId: true,
                  status_: true,
                },
                where: {
                  date: {
                    lte: new Date(),
                  },
                  status_: {
                    in: ['FT', 'AET', 'PEN'],
                  },
                },
                orderBy: {
                  date: 'desc',
                },
                take: 5,
              },
              FixturesAway: {
                select: {
                  id: true,
                  date: true,
                  winnerAway: true,
                  winnerHome: true,
                  teamAwayId: true,
                  teamHomeId: true,
                  status_: true,
                },
                where: {
                  date: {
                    lte: new Date(),
                  },
                  status_: {
                    in: ['FT', 'AET', 'PEN'],
                  },
                },
                orderBy: {
                  date: 'desc',
                },
                take: 5,
              },
              FixturesHome: {
                select: {
                  id: true,
                  date: true,
                  winnerAway: true,
                  winnerHome: true,
                  teamAwayId: true,
                  teamHomeId: true,
                  status_: true,
                },
                where: {
                  date: {
                    lte: new Date(),
                  },
                  status_: {
                    in: ['FT', 'AET', 'PEN'],
                  },
                },
                orderBy: {
                  date: 'desc',
                },
                take: 5,
              },
              League: {
                select: {
                  Country: true,
                },
              },
            },
          },
          Venue: true,
        },
      })
      .then((fixtures) => {
        res.send({
          fixtures,
          nextPage:
            fixtures.length == limit ? fixtures[limit - 1].id : undefined,
        });
      });
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
}

export type FixtureProps = {
  id: number;
  timezone: string;
  date: Date;
  timestamp: number;
  leagueId: number;
  venueId: number | null;
  teamHomeId: number | null;
  teamAwayId: number | null;
  winnerHome: boolean | null;
  winnerAway: boolean | null;
  score: Prisma.JsonValue | null;
  Byw: Byw;
  Prediction: Prediction;
  League: League & {
    Country: Country;
  };
  Bets: Array<
    Bet & {
      Odds: Odd[];
      Bookmaker: Bookmaker;
    }
  >;
} & {
  TeamAway: Team & {
    Standing: Standing;
    Fixtures: Fixture[];
    FixturesAway: Fixture[];
    FixturesHome: Fixture[];
    League: League & {
      Country: Country;
      // Standings: Standing[]
    };
  };
  TeamHome: Team & {
    Standing: Standing;
    Fixtures: Fixture[];
    FixturesAway: Fixture[];
    FixturesHome: Fixture[];
    League: League & {
      Country: Country;
      // Standings: Standing[]
    };
  };
  Venue: Venue;
};
