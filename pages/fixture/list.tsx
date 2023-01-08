import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import InLineFixture from '../../components/InLineFixture';
import { useSession, getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import {
  Country,
  Fixture,
  League,
  Prisma,
  Team,
  Venue,
  Standing,
  Byw,
} from '@prisma/client';

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
  League: League & {
    Country: Country;
  };
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { fixtures: [] } };
  }

  const fixtures = await prisma.fixture.findMany({
    where: {
      date: {
        gte: new Date(),
      },
    },
    orderBy: {
      date: 'asc',
    },
    take: 10,
    include: {
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
                not: undefined,
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
                not: undefined,
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
                not: undefined,
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
                not: undefined,
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
                not: undefined,
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
                not: undefined,
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
  });

  return {
    props: { fixtures: fixtures },
  };
};

type Props = {
  fixtures: FixtureProps[];
};

const Fixtures: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>Fixtures</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className='page flex justify-center'>
        <main className='w-full'>
          <table className='w-full'>
            <caption className='mb-4 rounded-lg border dark:border-0 p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800'>
              Our Filters
              <p className='mt-1 text-sm font-normal text-gray-500 dark:text-gray-400'>
                Here are the filters we use to find the best bets.
              </p>
            </caption>
            <thead className='whitespace-nowraptext-xs uppercase bg-gray-100 dark:bg-gray-800 dark:text-white'>
              <tr className='rounded-lg'>
                <th className='w-4 p-4 rounded-l-lg'>
                  <div className='flex items-center'>
                    <input
                      id='checkbox-table-search-1'
                      type='checkbox'
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <label
                      htmlFor='checkbox-table-search-1'
                      className='sr-only'
                    >
                      checkbox
                    </label>
                  </div>
                </th>
                <th>Date</th>
                <th>League</th>
                <th>Match</th>
                <th>Côte</th>
                <th className='rounded-r-lg'>Confiance</th>
              </tr>
            </thead>
            <tbody>
              {props.fixtures.map((fixture) => (
                <InLineFixture fixture={fixture} />
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </Layout>
  );
};

export default Fixtures;
