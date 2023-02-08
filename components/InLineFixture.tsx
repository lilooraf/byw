import React from 'react';
import { H2H } from './H2h';
import { perc2color } from '../utils/perc2color';
import { MatchStatsInline } from './MatchStatsInline';
import { ComparisonMini } from './ComparisonMini';
import { FixtureProps } from '../pages/api/fixtures';

const InLineFixture: React.FC<{
  fixture: FixtureProps;
  bookmakerSelected: string;
}> = ({ fixture, bookmakerSelected }) => {
  return (
    <tr className='rounded-sm border-b-2 border-gray-100 dark:border-gray-800'>
      <td className='w-4 p-4 hidden lg:table-cell select-none'>
        <div className='flex items-center'>
          <input
            id='checkbox-fixture'
            type='checkbox'
            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
          />
          <label htmlFor='checkbox-fixture' className='sr-only'>
            checkbox
          </label>
        </div>
      </td>
      <td className='px-3 hidden sm:table-cell select-none'>
        <div className='align-middle text-center'>
          <small>
            {new Date(fixture.date).toLocaleDateString('fr-FR', {
              weekday: 'short',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </small>
          <br />
        </div>
      </td>
      <td className='px-3 space-y-3 hidden md:table-cell select-none'>
        <div className='flex text-justify items-center'>
          <img
            className='h-4 mr-2 rounded-sm object-cover '
            src={fixture.League.Country.flag}
            alt={`logo country ${fixture.League.name}`}
          />
          <p>{fixture.League.Country.name}</p>
        </div>
        <div className='flex text-justify items-center'>
          <img
            className='h-5 mr-2 rounded-sm object-cover '
            src={fixture.League.logo}
            alt={`logo league ${fixture.League.name}`}
          />
          <small>{fixture.League.name}</small>
        </div>
      </td>
      <td className='px-0 md:px-3 w-80 select-none'>
        <MatchStatsInline fixture={fixture} />
        <H2H
          fixtures={fixture.TeamHome.Fixtures}
          homeId={fixture.TeamHome.id}
          awayId={fixture.TeamAway.id}
        />
      </td>
      <td className='px-2 hidden lg:table-cell select-none'>
        <div className='flex justify-center align-middle text-center text-xs font-mono'>
          <div
            className={`px-2 py-1 bg-slate-100 border-slate-400 dark:bg-gray-800 dark:border-gray-600 border-r-2 rounded-l-md ${
              fixture.Prediction?.predictions?.valueOf()['winner'].id ==
              fixture.teamHomeId
                ? 'border-2 font-bold'
                : ''
            }`}
          >
            {fixture.Bets.find(
              (b) => b.Bookmaker?.name === bookmakerSelected
            )?.Odds.find((o) => o.type === 'Home')?.value || '-'}
          </div>
          <div
            className={`px-2 py-1 bg-slate-100 border-slate-400 dark:bg-gray-800 dark:border-gray-600 ${
              fixture.Prediction?.predictions?.valueOf()['win_or_draw']
                ? 'border-2 font-bold'
                : ''
            }`}
          >
            {fixture.Bets.find(
              (b) => b.Bookmaker?.name === bookmakerSelected
            )?.Odds.find((o) => o.type === 'Draw')?.value || '-'}
          </div>
          <div
            className={`px-2 py-1 bg-slate-100 border-slate-400 dark:bg-gray-800 dark:border-gray-600 border-l-2 rounded-r-md ${
              fixture.Prediction?.predictions?.valueOf()['winner'].id ==
              fixture.teamAwayId
                ? 'border-2 font-bold'
                : ''
            }`}
          >
            {fixture.Bets.find(
              (b) => b.Bookmaker?.name === bookmakerSelected
            )?.Odds.find((o) => o.type === 'Away')?.value || '-'}
          </div>
        </div>
      </td>
      <td className='px-3 sm:px-5 select-none'>
        <div className='flex group justify-center align-middle text-center'>
          <div
            className='relative flex w-10 h-8 md:w-16 md:h-14 lg:w-20 lg:h-14 rounded-md justify-center text-center items-center border border-gray-200 dark:border-gray-800 dark:text-gray-800 font-mono'
            style={{
              backgroundColor: perc2color(fixture.Byw?.indice!),
            }}
          >
            {fixture.Prediction && (
              <div className='absolute group-hover:animate-pulse bg-black h-1.5 w-1.5 top-1 right-1 rounded-xl shadow shadow-black'></div>
            )}
            <p>{fixture.Byw?.indice!.toFixed(0)}</p>
          </div>
          {fixture.Prediction && (
            <div className='absolute group-hover:visible group-active:visible invisible opacity-0 group-hover:opacity-100 group-active:opacity-100 group-hover:ease-in ease-out transition-all duration-300 z-10'>
              <div className='absolute shadow-black -left-64 -top-24 z-10 flex flex-col w-56 items-center justify-center p-2 text-xs text-gray-800 bg-white rounded-md shadow-lg dark:bg-gray-800 dark:text-gray-100'>
                <ComparisonMini
                  name='STRENGTH'
                  awayPercent={
                    fixture.Prediction?.comparison.valueOf()['form'].away
                  }
                  homePercent={
                    fixture.Prediction?.comparison.valueOf()['form'].home
                  }
                />
                <ComparisonMini
                  name='ATTACKING POTENTIAL'
                  awayPercent={
                    fixture.Prediction?.comparison.valueOf()['att'].away
                  }
                  homePercent={
                    fixture.Prediction?.comparison.valueOf()['att'].home
                  }
                />
                <ComparisonMini
                  name='DEFENSIVE POTENTIAL'
                  awayPercent={
                    fixture.Prediction?.comparison.valueOf()['def'].away
                  }
                  homePercent={
                    fixture.Prediction?.comparison.valueOf()['def'].home
                  }
                />
                <ComparisonMini
                  name='POISON DISTRIBUSSION'
                  awayPercent={
                    fixture.Prediction?.comparison.valueOf()[
                      'poisson_distribution'
                    ].away
                  }
                  homePercent={
                    fixture.Prediction?.comparison.valueOf()[
                      'poisson_distribution'
                    ].home
                  }
                />
                <ComparisonMini
                  name='STRENGTH H2H'
                  awayPercent={
                    fixture.Prediction?.comparison.valueOf()['h2h'].away
                  }
                  homePercent={
                    fixture.Prediction?.comparison.valueOf()['h2h'].home
                  }
                />
                <ComparisonMini
                  name='GOALS H2H'
                  awayPercent={
                    fixture.Prediction?.comparison.valueOf()['goals'].away
                  }
                  homePercent={
                    fixture.Prediction?.comparison.valueOf()['goals'].home
                  }
                />
                <ComparisonMini
                  name='WINS THE GAME'
                  bold
                  awayPercent={
                    fixture.Prediction?.comparison.valueOf()['total'].away
                  }
                  homePercent={
                    fixture.Prediction?.comparison.valueOf()['total'].home
                  }
                />
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default InLineFixture;
