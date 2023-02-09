export const ComparisonMini: React.FC<{
  name: string;
  homePercent: string;
  awayPercent: string;
  bold?: boolean;
}> = ({ name, homePercent, awayPercent, bold }) => {
  return (
    <div
      className={`${
        bold && 'font-bold'
      } w-full font-mono text-xs whitespace-nowrap h-8`}
    >
      <div>{name}</div>
      <div className='flex text-center align-middle'>
        <div className='w-10'>
          {parseFloat(homePercent?.split('%')[0]).toFixed(0)}%
        </div>
        <div className='flex w-full self-center'>
          <div className='w-full bg-gray-200 h-1 flex justify-end rounded-l-lg'>
            <div
              className='bg-blue-600 h-1 rounded-l-lg'
              style={{
                width: homePercent,
              }}
            ></div>
          </div>
          <div className='w-full bg-gray-200 h-1 rounded-r-lg'>
            <div
              className='bg-orange-600 h-1 rounded-r-lg'
              style={{
                width: awayPercent,
              }}
            ></div>
          </div>
        </div>
        <div className='w-10'>
          {parseFloat(awayPercent?.split('%')[0]).toFixed(0)}%
        </div>
      </div>
    </div>
  );
};
