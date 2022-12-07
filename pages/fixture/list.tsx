import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import Fixture, { FixtureProps } from '../../components/Fixture';
import { useSession, getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';

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
      // Byw: {
      //   isNot: null,
      // }
    },
    orderBy: {
      date: 'asc',
    },
    take: 100,
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
                lte: new Date()
              },
              status_: {
                not: undefined
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
                lte: new Date()
              },
              status_: {
                not: undefined
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
                lte: new Date()
              },
              status_: {
                not: undefined
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
                lte: new Date()
              },
              status_: {
                not: undefined
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
                lte: new Date()
              },
              status_: {
                not: undefined
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
                lte: new Date()
              },
              status_: {
                not: undefined
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
      <div className='page'>
        <main>
          <table className='w-full'>
            <thead>
              <tr>
                <th>Date</th>
                <th>League</th>
                <th>Confiance League</th>
                <th>Match</th>
                <th>Odd</th>
                <th>Confiance Match</th>
              </tr>
            </thead>
            <tbody>
              {props.fixtures.map((fixture) => (
                <Fixture fixture={fixture} />
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </Layout>
  );
};

export default Fixtures;
