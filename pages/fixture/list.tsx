import React from 'react';
import { GetServerSideProps } from 'next';
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
  Bookmaker,
  Bet,
  Odd,
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const fixtures = await prisma.fixture.findMany({
    where: {
      // get: new Date(),
      date: {
        gt: new Date(),
      },
      AND: {
        Bets: {
          some: {
            Bookmaker: {
              name: 'Bet365',
            },
            name: 'Match Winner',
          },
        },
      },
    },
    orderBy: {
      date: 'asc',
    },
    take: 40,
    include: {
      Bets: {
        where: {
          Bookmaker: {
            name: 'Bet365',
          },
          name: 'Match Winner',
        },
        include: {
          Odds: true,
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
      <div>
        <h1>Not signed in</h1>
      </div>
    );
  }

  const changeAllCheckboxes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      'input[id=checkbox-fixture]'
    );

    checkboxes.forEach((checkbox: HTMLInputElement) => {
      checkbox.checked = e.target.checked;
    });
  };

  return (
    <div className='page mx-4 flex justify-center'>
      <main className='w-full'>
        <table className='w-full'>
          <caption className='mb-4 rounded-lg border dark:border-0 p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800'>
            Our Filters
            <p className='mt-1 text-sm font-normal text-gray-500 dark:text-gray-400'>
              Here are the filters we use to find the best bets.
            </p>
          </caption>
          <thead className='whitespace-nowraptext-xs uppercase text-sm md:text-md bg-gray-100 dark:bg-gray-800 dark:text-white'>
            <tr className='h-8 md:h-12'>
              <th className='hidden w-4 p-4 rounded-l-lg lg:table-cell'>
                <div className='flex items-center'>
                  <input
                    id='checkbox-table-search-1'
                    type='checkbox'
                    onChange={(e) => {
                      changeAllCheckboxes(e);
                    }}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label htmlFor='checkbox-table-search-1' className='sr-only'>
                    checkbox
                  </label>
                </div>
              </th>
              <th className='rounded-l-lg md:rounded-none hidden sm:table-cell'>
                Date
              </th>
              <th className='hidden md:table-cell'>League</th>
              <th className='rounded-l-lg sm:rounded-none'>Match</th>
              <th className='hidden lg:table-cell'>Odd</th>
              <th className='rounded-r-lg'>Indice</th>
            </tr>
          </thead>
          <tbody>
            {props?.fixtures?.map((fixture) => (
              <InLineFixture fixture={fixture} key={fixture.id} />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Fixtures;
