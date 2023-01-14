import React from 'react';
import { H2H } from './H2h';
import { perc2color } from '../utils/perc2color';
import { FixtureProps } from '../pages/fixture/list';
import { MatchStatsInline } from './MatchStatsInline';

const InLineFixture: React.FC<{ fixture: FixtureProps }> = ({ fixture }) => {
  return (
    <tr className='rounded-sm border-b-2 border-gray-100 dark:border-gray-800'>
      <td className='w-4 p-4 hidden lg:table-cell'>
        <div className='flex items-center'>
          <input
            id='checkbox-table-search-1'
            type='checkbox'
            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
          />
          <label htmlFor='checkbox-table-search-1' className='sr-only'>
            checkbox
          </label>
        </div>
      </td>
      <td className='px-3 hidden sm:table-cell'>
        <div className='align-middle text-center'>
          <small>
            {fixture.date.toLocaleDateString('fr-FR', {
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
      <td className='px-3 space-y-3 hidden md:table-cell'>
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
      <td className='px-0 md:px-3 w-80'>
        <MatchStatsInline fixture={fixture} />
        <H2H
          fixtures={fixture.TeamHome.Fixtures}
          homeId={fixture.TeamHome.id}
          awayId={fixture.TeamAway.id}
        />
      </td>
      <td className='px-2 hidden lg:table-cell'>
        <div className='flex justify-center align-middle text-center text-xs font-mono'>
          <div className='flex px-2 py-1 bg-gray-800 border-gray-600 border-r-2 rounded-l-md border font-bold'>
            1.12
          </div>
          <div className='flex px-2 py-1 bg-gray-800 border-gray-600'>
            0.21
          </div>
          <div className='flex px-2 py-1 bg-gray-800 border-gray-600 border-l-2 rounded-r-md'>
            0.47
          </div>
        </div>
      </td>
      <td className='px-3 sm:px-5'>
        <div className='flex justify-center align-middle text-center'>
          <div
            className='flex w-10 h-8 md:w-16 md:h-14 lg:w-20 lg:h-14 rounded-md justify-center text-center items-center border border-gray-200 dark:border-gray-800 dark:text-gray-800 font-mono'
            style={{
              backgroundColor: perc2color(fixture.Byw?.indice!),
            }}
          >
            <p>{fixture.Byw?.indice!.toFixed(0)}</p>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default InLineFixture;
