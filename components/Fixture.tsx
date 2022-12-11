import React from 'react';
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

const perc2color = (perc) => {
  var r,
    g,
    b = 0;
  if (perc < 50) {
    r = 255;
    g = Math.round(5.1 * perc);
  } else {
    g = 255;
    r = Math.round(510 - 5.1 * perc);
  }
  var h = r * 0x10000 + g * 0x100 + b * 0x1;
  return '#' + ('000000' + h.toString(16)).slice(-6);
};

const H2H: React.FC<{
  fixtures: Fixture[];
  homeId: number;
  awayId: number;
}> = ({ fixtures, homeId, awayId }) => {
  let homeWins = 0;
  let awayWins = 0;
  let draws = 0;

  fixtures.forEach((fixture) => {
    if (fixture.teamHomeId === homeId && fixture.teamAwayId === awayId) {
      if (fixture.winnerHome) homeWins++;
      else if (fixture.winnerAway) awayWins++;
      else draws++;
    } else if (fixture.teamHomeId === awayId && fixture.teamAwayId === homeId) {
      if (fixture.winnerHome) awayWins++;
      else if (fixture.winnerAway) homeWins++;
      else draws++;
    }
  });
  if (homeWins! && awayWins! && draws!) {
    return (
      <div className='bg-gray-800 text-xs text-yellow-500 rounded-md my-2 py-1 grid grid-cols-1 grid-rows-1 text-center'>
        <small>No head to head</small>
      </div>
    );
  } else {
    return (
      <div className='bg-gray-800 text-xs text-yellow-500 rounded-md my-2 py-1 grid grid-cols-3 grid-rows-1 text-center'>
        <small>
          {homeWins} VICTOIRE{homeWins > 1 ? 'S' : ''}
        </small>
        <small>
          {draws} NULL{draws > 1 ? 'S' : ''}
        </small>
        <small>
          {awayWins} VICTOIRE{awayWins > 1 ? 'S' : ''}
        </small>
      </div>
    );
  }
};

const Span: React.FC<{ fixture: Fixture; teamId: number }> = ({
  fixture,
  teamId,
}) => {
  if (
    !fixture ||
    fixture.date > new Date() ||
    (fixture.status_ != 'FT' &&
      fixture.status_ != 'AET' &&
      fixture.status_ != 'PEN')
  ) {
    return (
      <span className='flex justify-center items-center rounded-full bg-slate-400 h-4 w-4 text-sm text-slate-800'>
        <small>{fixture.status_}</small>
      </span>
    );
  }
  if (
    (fixture?.winnerHome && fixture?.teamHomeId === teamId) ||
    (fixture?.winnerAway && fixture?.teamAwayId === teamId)
  ) {
    return (
      <span className='flex justify-center items-center rounded-full bg-green-600 h-4 w-4 text-sm text-slate-800'>
        <small>V</small>
      </span>
    );
  } else if (
    (fixture?.winnerAway && fixture?.teamHomeId === teamId) ||
    (fixture?.winnerHome && fixture?.teamAwayId === teamId)
  ) {
    return (
      <span className='flex justify-center items-center rounded-full bg-red-600 h-4 w-4 text-sm text-slate-800'>
        <small>D</small>
      </span>
    );
  } else {
    return (
      <span className='flex justify-center items-center rounded-full bg-yellow-600 h-4 w-4 text-sm text-slate-800'>
        <small>N</small>
      </span>
    );
  }
};

const Fixture: React.FC<{ fixture: FixtureProps }> = ({ fixture }) => {
  console.log(fixture);
  return (
    // <div className="flex justify-between p-2 bg-inherit border" onClick={() => Router.push("/fixture/[id]", `/fixture/${fixture.id}`)}>

    <tr className='rounded-sm border-b-2 border-gray-200'>
      <td className='px-3'>
        <div className='align-middle text-center'>
          <small>
            {fixture.date.toLocaleDateString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </small>
          <br />
          <small>{fixture.date.toLocaleTimeString()}</small>
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
      <td>
        <div className='flex justify-center align-middle text-center'>
          <p>0</p>
        </div>
      </td>

      <td>
        <table className='flex w-full justify-between my-2'>
          <td>
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
                <Span
                  fixture={fixture.TeamHome.Fixtures[0]}
                  teamId={fixture.TeamHome.id}
                ></Span>
                <Span
                  fixture={fixture.TeamHome.Fixtures[1]}
                  teamId={fixture.TeamHome.id}
                ></Span>
                <Span
                  fixture={fixture.TeamHome.Fixtures[2]}
                  teamId={fixture.TeamHome.id}
                ></Span>
                <Span
                  fixture={fixture.TeamHome.Fixtures[3]}
                  teamId={fixture.TeamHome.id}
                ></Span>
                <Span
                  fixture={fixture.TeamHome.Fixtures[4]}
                  teamId={fixture.TeamHome.id}
                ></Span>
                <span className='flex justify-center items-center rounded-sm border-2 border-green-600 h-4 w-10 text-sm'>
                  <small className=''>13 pts</small>
                </span>
              </div>
            </div>
            <div className='flex items-center space-x-2'>
              <small>Domicile</small>
              <div className='flex-grow flex space-x-1 justify-end'>
                <Span
                  fixture={fixture.TeamHome.FixturesHome[0]}
                  teamId={fixture.TeamHome.id}
                ></Span>
                <Span
                  fixture={fixture.TeamHome.FixturesHome[1]}
                  teamId={fixture.TeamHome.id}
                ></Span>
                <Span
                  fixture={fixture.TeamHome.FixturesHome[2]}
                  teamId={fixture.TeamHome.id}
                ></Span>
                <Span
                  fixture={fixture.TeamHome.FixturesHome[3]}
                  teamId={fixture.TeamHome.id}
                ></Span>
                <Span
                  fixture={fixture.TeamHome.FixturesHome[4]}
                  teamId={fixture.TeamHome.id}
                ></Span>
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
          <td>
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
                <Span
                  fixture={fixture.TeamAway.Fixtures[0]}
                  teamId={fixture.TeamAway.id}
                ></Span>
                <Span
                  fixture={fixture.TeamAway.Fixtures[1]}
                  teamId={fixture.TeamAway.id}
                ></Span>
                <Span
                  fixture={fixture.TeamAway.Fixtures[2]}
                  teamId={fixture.TeamAway.id}
                ></Span>
                <Span
                  fixture={fixture.TeamAway.Fixtures[3]}
                  teamId={fixture.TeamAway.id}
                ></Span>
                <Span
                  fixture={fixture.TeamAway.Fixtures[4]}
                  teamId={fixture.TeamAway.id}
                ></Span>
                <span className='flex justify-center items-center rounded-sm border-2 border-green-600 h-4 w-10 text-sm'>
                  <small className=''>13 pts</small>
                </span>
              </div>
            </div>
            <div className='flex items-center space-x-2'>
              <small>Exterieur</small>
              <div className='flex-grow flex space-x-1 justify-end'>
                <Span
                  fixture={fixture.TeamAway.FixturesAway[0]}
                  teamId={fixture.TeamAway.id}
                ></Span>
                <Span
                  fixture={fixture.TeamAway.FixturesAway[1]}
                  teamId={fixture.TeamAway.id}
                ></Span>
                <Span
                  fixture={fixture.TeamAway.FixturesAway[2]}
                  teamId={fixture.TeamAway.id}
                ></Span>
                <Span
                  fixture={fixture.TeamAway.FixturesAway[3]}
                  teamId={fixture.TeamAway.id}
                ></Span>
                <Span
                  fixture={fixture.TeamAway.FixturesAway[4]}
                  teamId={fixture.TeamHome.id}
                ></Span>
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

      <td>
        <div className='flex justify-center align-middle text-center'>
          <p>0</p>
        </div>
      </td>
      <td>
        <div className='flex justify-center align-middle text-center'>
          <div
            className='flex w-20 h-14 rounded-md justify-center text-center items-center border border-gray-200'
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

export default Fixture;
