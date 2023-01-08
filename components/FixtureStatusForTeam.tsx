import { Fixture } from "@prisma/client";

export const FixtureStatusForTeam: React.FC<{ fixture: Fixture; teamId: number }> = ({
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
        <span className='flex justify-center items-center rounded-full bg-slate-400 h-4 w-4 text-sm text-white dark:text-gray-800'>
          <small>{fixture.status_}</small>
        </span>
      );
    }
    if (
      (fixture?.winnerHome && fixture?.teamHomeId === teamId) ||
      (fixture?.winnerAway && fixture?.teamAwayId === teamId)
    ) {
      return (
        <span className='flex justify-center items-center rounded-full bg-green-600 h-4 w-4 text-sm text-white dark:text-gray-800'>
          <small>V</small>
        </span>
      );
    } else if (
      (fixture?.winnerAway && fixture?.teamHomeId === teamId) ||
      (fixture?.winnerHome && fixture?.teamAwayId === teamId)
    ) {
      return (
        <span className='flex justify-center items-center rounded-full bg-red-600 h-4 w-4 text-sm text-white dark:text-gray-800'>
          <small>D</small>
        </span>
      );
    } else {
      return (
        <span className='flex justify-center items-center rounded-full bg-yellow-600 h-4 w-4 text-sm text-white dark:text-gray-800'>
          <small>N</small>
        </span>
      );
    }
  };
  