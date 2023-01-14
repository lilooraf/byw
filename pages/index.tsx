import React, { useRef } from 'react';
import Image from 'next/image';

const Home = (props) => {
  const ref = useRef(null);

  const addOpacity = () => {
    ref.current.classList.add('opacity-100');
  };

  const removeOpacity = () => {
    ref.current.classList.remove('opacity-0');
  };

  return (
    <div className='bg-black text-white'>
      <div className=''>
        <div className='z-10 whitespace-nowrap absolute flex justify-center md:w-1/2 w-full md:mt-32 mt-3 '>
          <div className='text-transparent bg-clip-text bg-gradient-to-br from-white via-yellow-500 to-orange-600'>
            <div className='text-5xl font-bold'>Welcome to</div>
            <div className='text-5xl font-bold'>Bet You Win</div>
            <div className='text-2xl font-bold'>The best way to win</div>
          </div>
        </div>
      </div>
      <div className='w-full flex justify-center'>
        <div
          ref={ref}
          className='md:px-20 mt-40 md:mt-0 max-w-[70rem] md:max-w-80 transition-opacity delay-150 duration-1000 opacity-0'>
          <Image
            onLoad={removeOpacity}
            onLoadingComplete={addOpacity}
            src='/assets/wallpapers/background.png'
            width={1920}
            height={1280}
          />
        </div>
      </div>
      <div className=''>
        <div className='mt-8 md:mt-32 pb-20'>
          <div className='text-center px-10'>
            <p className='text-3xl font-bold inline'>What is&nbsp;</p>
            <p className='text-3xl font-bold inline text-transparent bg-clip-text bg-gradient-to-l from-white via-yellow-500 to-orange-600'>
              Bet You Win
            </p>
            <p className='text-3xl font-bold inline'>?</p>
            <br />
            <br />
            <div className='text-2xl font-bold'>
              It's a platform that allows you to bet on your favorite teams and
              players.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
