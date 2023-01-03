import { Fixture } from "@prisma/client";

export const H2H: React.FC<{
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