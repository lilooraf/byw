import React, { useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import InLineFixture from '../../components/InLineFixture';
import { useSession, getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import { Bookmaker, Country, League } from '@prisma/client';
import useOutsideCloser from '../../hooks/useOutsideCloser';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import InLineFixtureSceleton from '../../components/InLineFixtureSceleton';

type Props = {
  bookmmakers: Bookmaker[];
  leagues: (Country & {
    Leagues: League[];
  })[];
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

  const bookmmakers: Bookmaker[] = await prisma.bookmaker.findMany();

  const leagues: (Country & {
    Leagues: League[];
  })[] = await prisma.country.findMany({
    include: {
      Leagues: true,
    },
  });

  return {
    props: { bookmmakers: bookmmakers, leagues: leagues },
  };
};

const fetchFixtures = async ({
  dategt = '',
  leaguesSelected,
  pageParam = '',
}: {
  dategt?: string;
  leaguesSelected: number[];
  pageParam?: string;
}) => {
  const res = await fetch(
    `/api/fixtures?limit=10&offset=${pageParam}&dategt=${dategt}&leagues=${leaguesSelected.join(
      ','
    )}`
  );
  const fixtures = await res.json();
  return fixtures;
};

const Fixtures: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  const [bookmakersListOpen, setBookmakersListOpen] = useState(false);
  const [leaguesListOpen, setLeagueListOpen] = useState(false);
  const [datesListOpen, setDatesListOpen] = useState(false);
  const [dategt, setDategt] = useState(new Date().toString());

  const [ref, InView] = useInView();

  const refBookmaker = useRef(null);
  const refLeague = useRef(null);
  const refDate = useRef(null);

  const [bookmakerSelected, setBookmakerSelected] = useState(
    props.bookmmakers[0].name
  );
  const [datesSelected, setDatesSelected] = useState({ start: '', end: '' });
  const [leaguesSelected, setLeaguesSelected] = useState(
    props.leagues.map((c) => c.Leagues.map((l) => l.id)).flat()
  );

  const {
    isLoading,
    isError,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(
    ['fixtures', { dategt, leaguesSelected }],
    ({ pageParam = '' }) =>
      fetchFixtures({ dategt, leaguesSelected, pageParam }),
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextPage ?? false,
    }
  );

  // console.log(props.leagues);

  useEffect(() => {
    if (InView && hasNextPage) {
      console.log('Fetching next page');

      fetchNextPage();
    }
  }, [InView]);

  const updateBookmaker = (bookmaker: string) => {
    setBookmakerSelected(bookmaker);
    setBookmakersListOpen(false);
  };

  useOutsideCloser(refBookmaker, () => setBookmakersListOpen(false));
  useOutsideCloser(refLeague, () => setLeagueListOpen(false));
  useOutsideCloser(refDate, () => setDatesListOpen(false));

  const changeAllCheckboxes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      'input[id=checkbox-fixture]'
    );

    checkboxes.forEach((checkbox: HTMLInputElement) => {
      checkbox.checked = e.target.checked;
    });
  };

  if (!session) {
    return (
      <div>
        <h1>Not signed in</h1>
      </div>
    );
  }

  return (
    <div className='page mx-4 flex justify-center'>
      <main className='w-full'>
        <table className='w-full'>
          <caption className='mb-4 rounded-lg border dark:border-0 p-3 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800'>
            <div className='flex gap-2'>
              <div ref={refDate}>
                <button
                  onClick={() => {
                    setDatesListOpen(!datesListOpen);
                  }}
                  className='whitespace-nowrap border relative hover:bg-blue-300 font-medium rounded-lg text-sm px-2 md:px-4 py-1 md:py-2 text-center inline-flex items-center dark:hover:bg-blue-700'
                  type='button'
                >
                  DATE
                  <svg
                    className='w-4 h-4 ml-2'
                    aria-hidden='true'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M19 9l-7 7-7-7'
                    ></path>
                  </svg>
                </button>
                <div
                  hidden={!datesListOpen}
                  className='select-none overflow-auto max-h-72 z-20 absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600'
                >
                  {/* TODO: Add date range picker */}
                  <small className='flex justify-center p-2'>Not available yet</small>
                </div>
              </div>
              <div ref={refLeague}>
                <button
                  onClick={() => {
                    setLeagueListOpen(!leaguesListOpen);
                  }}
                  className='whitespace-nowrap border relative hover:bg-blue-300 font-medium rounded-lg text-sm px-2 md:px-4 py-1 md:py-2 text-center inline-flex items-center dark:hover:bg-blue-700'
                  type='button'
                >
                  LEAGUE
                  <svg
                    className='w-4 h-4 ml-2'
                    aria-hidden='true'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M19 9l-7 7-7-7'
                    ></path>
                  </svg>
                </button>
                <div
                  hidden={!leaguesListOpen}
                  className='select-none overflow-auto max-h-72 z-20 absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600'
                >
                  <ul className='space-y-1 text-sm text-gray-700 dark:text-gray-200 '>
                    <div className='sticky top-0 dark:bg-gray-700 bg-white flex w-full border-b-2 dark:border-gray-800'>
                      <div
                        className='flex w-full items-center justify-center text-center space-x-3 m-1 rounded-lg p-2 hover:bg-slate-300 hover:dark:bg-slate-800'
                        onClick={() => {
                          setLeaguesSelected([]);
                        }}
                      >
                        <div>???</div>
                      </div>
                      <div
                        className='flex w-full items-center justify-center text-center space-x-3 m-1 rounded-lg p-2 hover:bg-slate-300 hover:dark:bg-slate-800'
                        onClick={() => {
                          setLeaguesSelected(
                            props.leagues
                              .map((c) => c.Leagues.map((l) => l.id))
                              .flat()
                          );
                        }}
                      >
                        <div>???</div>
                      </div>
                    </div>
                    {props?.leagues?.map((country) => (
                      <details className='open:border-b-2 border-gray-800'>
                        <summary className='flex items-center space-x-3 m-1 rounded-lg p-2 hover:bg-slate-300 hover:dark:bg-slate-800 '>
                          <img className='h-3 w-3' src={country.flag} alt='' />
                          <span className='font-medium'>{country.name}</span>
                        </summary>
                        {country.Leagues?.map((league) => (
                          <label className='flex items-center space-x-3 m-1 rounded-lg p-2 hover:bg-slate-300 hover:dark:bg-slate-800'>
                            <input
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setLeaguesSelected([
                                    ...leaguesSelected,
                                    league.id,
                                  ]);
                                } else {
                                  setLeaguesSelected(
                                    leaguesSelected.filter(
                                      (l) => l !== league.id
                                    )
                                  );
                                }
                                refetch();
                              }}
                              type='checkbox'
                              name='bookmaker'
                              checked={leaguesSelected.includes(league.id)}
                              className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                            />
                            <span className='font-medium'>{league.name}</span>
                          </label>
                        ))}
                      </details>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </caption>
          <thead className='sticky top-16 z-10 whitespace-nowraptext-xs uppercase text-sm md:text-md bg-gray-100 dark:bg-gray-800 dark:text-white'>
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
              <th className='hidden lg:table-cell'>
                <div className='flex w-full justify-center' ref={refBookmaker}>
                  <button
                    onClick={() => {
                      setBookmakersListOpen(!bookmakersListOpen);
                    }}
                    id='dropdownRadioButton'
                    data-dropdown-toggle='dropdownDefaultRadio'
                    className='whitespace-nowrap relative hover:bg-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:hover:bg-blue-700'
                    type='button'
                  >
                    Bookmaker: {bookmakerSelected}
                    <svg
                      className='w-4 h-4 ml-2'
                      aria-hidden='true'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        d='M19 9l-7 7-7-7'
                      ></path>
                    </svg>
                  </button>
                  <div
                    id='dropdownDefaultRadio'
                    hidden={!bookmakersListOpen}
                    className='overflow-auto h-40 z-10 absolute w-48 mt-12 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600'
                  >
                    <ul
                      className='space-y-1 text-sm text-gray-700 dark:text-gray-200 '
                      aria-labelledby='dropdownRadioButton'
                    >
                      {props?.bookmmakers?.map((bookmaker) => (
                        <li
                          className=''
                          key={bookmaker.id}
                          onClick={() => {
                            updateBookmaker(bookmaker.name);
                            setBookmakersListOpen(false);
                          }}
                        >
                          <label className='flex items-center space-x-3 m-1 rounded-lg p-2 hover:bg-slate-300 hover:dark:bg-slate-800'>
                            <input
                              type='radio'
                              name='bookmaker'
                              checked={bookmakerSelected == bookmaker.name}
                              value={bookmaker.id}
                              className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                            />
                            <span className='font-medium'>
                              {bookmaker.name}
                            </span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </th>
              <th className='rounded-r-lg'>Indice</th>
            </tr>
          </thead>
          <tbody>
            {data?.pages?.map((page) =>
              page.fixtures?.map((fixture) => (
                <InLineFixture
                  fixture={fixture}
                  key={fixture.id}
                  bookmakerSelected={bookmakerSelected}
                />
              ))
            )}
            {(isFetchingNextPage || isLoading) && <InLineFixtureSceleton />}
          </tbody>
        </table>
        <div ref={ref} className='h-1'></div>
      </main>
    </div>
  );
};

export default Fixtures;
