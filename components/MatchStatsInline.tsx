import { FixtureProps } from '../pages/api/fixtures';
import { FixtureStatusForTeam } from './FixtureStatusForTeam';

export const MatchStatsInline: React.FC<{ fixture: FixtureProps }> = ({
  fixture,
}) => {
  return (
    <table className='flex justify-between my-2 text-xs md:text-lg'>
      <td className='flex flex-col pl-1 md:px-3 w-full flex-grow justify-between'>
        <div className='flex items-center space-x-1 justify-end mb-2 text-right'>
          {/* TODO get just the standing of the team by leagueId */}
          <p className='text-ellipsis overflow-hidden'>{`(${fixture.TeamHome.Standing[0].rank}) ${fixture.TeamHome.name}`}</p>
          <img
            className='h-6 rounded-sm object-cover place-self-start'
            src={fixture.TeamHome.logo}
            alt={`logo country ${fixture.TeamHome.name}`}
          />
        </div>
        <div>
          <div className='flex'>
            <div className='flex-grow flex space-x-1 justify-start items-center'>
              <span className='flex justify-center items-center rounded-full md:rounded-md border-2 border-green-600 h-4 w-4 md:h-4 md:w-10 text-xs md:text-sm '>
                <small className=''>13</small>
                <small className='hidden md:block'>&nbsp;pts</small>
              </span>
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
            </div>
          </div>

          <div className='flex'>
            <div className='flex-grow flex space-x-1 justify-start items-center'>
              <span className='flex justify-center items-center rounded-full md:rounded-md border-2 border-green-600 h-4 w-4 md:h-4 md:w-10 text-xs md:text-sm '>
                <small className=''>13</small>
                <small className='hidden md:block'>&nbsp;pts</small>
              </span>
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

              <div>
                <small className='hidden sm:block lg:hidden w-10 text-center'>
                  Dom
                </small>
                <small className='hidden lg:block'>Domicile</small>
              </div>
            </div>
          </div>
        </div>
      </td>
      <div className='flex text-center items-center justify-center'>
        <div className='relative z-0 flex h-full rounded-sm w-0.5 mx-4 bg-gray-800 text-center items-center '></div>
        <span className='absolute flex justify-center items-center rounded-full bg-gray-800 h-5 w-5 text-xs'>
          <small className='text-yellow-500'>VS</small>
        </span>
      </div>
      <td className='flex flex-col pr-1 md:px-3 w-full flex-grow justify-between'>
        <div className='flex items-center space-x-1 justify-start mb-2 text-left'>
          <img
            className='h-6 rounded-sm object-cover place-self-start'
            src={fixture.TeamAway.logo}
            alt={`logo country ${fixture.TeamAway.name}`}
          />
          {/* TODO get just the standing of the team by leagueId */}
          <p className='text-ellipsis overflow-hidden'>{`${fixture.TeamAway.name} (${fixture.TeamAway.Standing[0].rank})`}</p>
        </div>
        <div>
          <div className='flex'>
            <div className='flex-grow flex space-x-1 justify-end items-center'>
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
              <span className='flex justify-center items-center rounded-full md:rounded-md border-2 border-green-600 h-4 w-4 md:h-4 md:w-10 text-xs md:text-sm '>
                <small className=''>13</small>
                <small className='hidden md:block'>&nbsp;pts</small>
              </span>
            </div>
          </div>
          <div className='flex'>
            <div className='flex-grow flex space-x-1 justify-end items-center'>
              <div>
                <small className='hidden sm:block lg:hidden w-10 text-center'>
                  Ext
                </small>
                <small className='hidden lg:block'>Exterieur</small>
              </div>
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
              <span className='flex justify-center items-center rounded-full md:rounded-md border-2 border-green-600 h-4 w-4 md:h-4 md:w-10 text-xs md:text-sm '>
                <small className=''>13</small>
                <small className='hidden md:block'>&nbsp;pts</small>
              </span>
            </div>
          </div>
        </div>
      </td>
    </table>
  );
};
