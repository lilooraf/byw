import React from 'react';
import { H2H } from './H2h';
import { FixtureStatusForTeam } from './FixtureStatusForTeam';
import { perc2color } from '../utils/perc2color';
import { FixtureProps } from '../pages/fixture/list';

const InLineFixture: React.FC<{ fixture: FixtureProps }> = ({ fixture }) => {
  return (
    <tr className='rounded-sm border-b-2 border-gray-100 dark:border-gray-800'>
      <td className='w-4 p-4'>
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
      <td className='px-3'>
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
      <td className='px-3 space-y-3'>
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
      <td className='px-3 w-96'>
        <table className='flex w-full justify-between my-2'>
          <td className='px-3'>
            <div className='flex items-center space-x-1 justify-end mb-2 '>
              {/* TODO get just the standing of the team by leagueId */}
              <p>{`(${fixture.TeamHome.Standing[0].rank}) ${fixture.TeamHome.name}`}</p>
              <img
                className='h-6 rounded-sm object-cover'
                src={fixture.TeamHome.logo}
                alt={`logo country ${fixture.TeamHome.name}`}
              />
            </div>
            <div className='flex items-center space-x-2'>
              <div className='flex-grow flex space-x-1 justify-end'>
                <FixtureStatusForTeam
                  fixture={fixture.TeamHome.Fixtures[0]}
                  teamId={fixture.TeamHome.id}
                ></FixtureStatusForTeam>
                <FixtureStatusForTeam
                  fixture={fixture.TeamHome.Fixtures[1]}
                  teamId={fixture.TeamHome.id}
                ></FixtureStatusForTeam>
                <FixtureStatusForTeam
                  fixture={fixture.TeamHome.Fixtures[2]}
                  teamId={fixture.TeamHome.id}
                ></FixtureStatusForTeam>
                <FixtureStatusForTeam
                  fixture={fixture.TeamHome.Fixtures[3]}
                  teamId={fixture.TeamHome.id}
                ></FixtureStatusForTeam>
                <FixtureStatusForTeam
                  fixture={fixture.TeamHome.Fixtures[4]}
                  teamId={fixture.TeamHome.id}
                ></FixtureStatusForTeam>
                <span className='flex justify-center items-center rounded-sm border-2 border-green-600 h-4 w-10 text-sm'>
                  <small className=''>13 pts</small>
                </span>
              </div>
            </div>
            <div className='flex items-center space-x-2'>
              <small>Domicile</small>
              <div className='flex-grow flex space-x-1 justify-end'>
                <FixtureStatusForTeam
                  fixture={fixture.TeamHome.FixturesHome[0]}
                  teamId={fixture.TeamHome.id}
                ></FixtureStatusForTeam>
                <FixtureStatusForTeam
                  fixture={fixture.TeamHome.FixturesHome[1]}
                  teamId={fixture.TeamHome.id}
                ></FixtureStatusForTeam>
                <FixtureStatusForTeam
                  fixture={fixture.TeamHome.FixturesHome[2]}
                  teamId={fixture.TeamHome.id}
                ></FixtureStatusForTeam>
                <FixtureStatusForTeam
                  fixture={fixture.TeamHome.FixturesHome[3]}
                  teamId={fixture.TeamHome.id}
                ></FixtureStatusForTeam>
                <FixtureStatusForTeam
                  fixture={fixture.TeamHome.FixturesHome[4]}
                  teamId={fixture.TeamHome.id}
                ></FixtureStatusForTeam>
                <span className='flex justify-center items-center rounded-sm border-2 border-green-600 h-4 w-10 text-sm'>
                  <small className=''>13 pts</small>
                </span>
              </div>
            </div>
          </td>
          <div className='flex text-center items-center justify-center'>
            <div className='relative z-0 flex h-full rounded-sm w-0.5 mx-4 bg-gray-800 text-center items-center '></div>
            <span className='absolute flex justify-center items-center rounded-full bg-gray-800 h-5 w-5 text-xs'>
              <small className='text-yellow-500'>VS</small>
            </span>
          </div>
          <td className='px-3'>
            <div className='flex items-center space-x-1 justify-start mb-2'>
              <img
                className='h-6 rounded-sm object-cover'
                src={fixture.TeamAway.logo}
                alt={`logo country ${fixture.TeamAway.name}`}
              />
              {/* TODO get just the standing of the team by leagueId */}
              <p>{`${fixture.TeamAway.name} (${fixture.TeamAway.Standing[0].rank})`}</p>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='flex-grow flex space-x-1 justify-end'>
                <FixtureStatusForTeam
                  fixture={fixture.TeamAway.Fixtures[0]}
                  teamId={fixture.TeamAway.id}
                ></FixtureStatusForTeam>
                <FixtureStatusForTeam
                  fixture={fixture.TeamAway.Fixtures[1]}
                  teamId={fixture.TeamAway.id}
                ></FixtureStatusForTeam>
                <FixtureStatusForTeam
                  fixture={fixture.TeamAway.Fixtures[2]}
                  teamId={fixture.TeamAway.id}
                ></FixtureStatusForTeam>
                <FixtureStatusForTeam
                  fixture={fixture.TeamAway.Fixtures[3]}
                  teamId={fixture.TeamAway.id}
                ></FixtureStatusForTeam>
                <FixtureStatusForTeam
                  fixture={fixture.TeamAway.Fixtures[4]}
                  teamId={fixture.TeamAway.id}
                ></FixtureStatusForTeam>
                <span className='flex justify-center items-center rounded-sm border-2 border-green-600 h-4 w-10 text-sm'>
                  <small className=''>13 pts</small>
                </span>
              </div>
            </div>
            <div className='flex items-center space-x-2'>
              <small>Exterieur</small>
              <div className='flex-grow flex space-x-1 justify-end'>
                <FixtureStatusForTeam
                  fixture={fixture.TeamAway.FixturesAway[0]}
                  teamId={fixture.TeamAway.id}
                ></FixtureStatusForTeam>
                <FixtureStatusForTeam
                  fixture={fixture.TeamAway.FixturesAway[1]}
                  teamId={fixture.TeamAway.id}
                ></FixtureStatusForTeam>
                <FixtureStatusForTeam
                  fixture={fixture.TeamAway.FixturesAway[2]}
                  teamId={fixture.TeamAway.id}
                ></FixtureStatusForTeam>
                <FixtureStatusForTeam
                  fixture={fixture.TeamAway.FixturesAway[3]}
                  teamId={fixture.TeamAway.id}
                ></FixtureStatusForTeam>
                <FixtureStatusForTeam
                  fixture={fixture.TeamAway.FixturesAway[4]}
                  teamId={fixture.TeamHome.id}
                ></FixtureStatusForTeam>
                <span className='flex justify-center items-center rounded-sm border-2 border-green-600 h-4 w-10 text-sm'>
                  <small className=''>13 pts</small>
                </span>
              </div>
            </div>
          </td>
        </table>
        <H2H
          fixtures={fixture.TeamHome.Fixtures}
          homeId={fixture.TeamHome.id}
          awayId={fixture.TeamAway.id}
        />
      </td>
      <td className='px-8'>
        <div className='flex justify-center align-middle text-center'>
          <p>0</p>
        </div>
      </td>
      <td className='px-5'>
        <div className='flex justify-center align-middle text-center'>
          <div
            className='flex w-20 h-14 rounded-md justify-center text-center items-center border border-gray-200 dark:border-gray-800 dark:text-gray-800'
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
