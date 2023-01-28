import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const Home = (props) => {
  const ref = useRef(null);
  const paralaxRef = useRef([]);

  const addOpacity = () => {
    ref.current.classList.add('opacity-100');
  };

  const removeOpacity = () => {
    ref.current.classList.remove('opacity-0');
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
      paralaxRef.current.forEach((element) => {
        if (element?.style) {
          let moving_value = element.getAttribute('data-value');
          let x = (e.clientX * moving_value) / 300;
          let y = (e.clientY * moving_value) / 300;
          element.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
    });
  }

  return (
    <div className='bg-black text-white select-none'>
      <div className=''>
        <div className='z-10 whitespace-nowrap absolute flex justify-center md:w-1/2 w-full md:mt-32 mt-3 '>
          <div className='text-transparent bg-clip-text bg-gradient-to-br from-white via-yellow-500 to-orange-600'>
            <div className='text-5xl font-bold'>Welcome to</div>
            <div className='text-5xl font-bold'>Bet You Win</div>
            <div className='text-2xl font-bold'>The best way to win</div>
          </div>
        </div>
      </div>
      <div className='w-full flex justify-center mb-20'>
        <div
          ref={ref}
          className='md:px-20 mt-40 md:mt-0 max-w-[70rem] md:max-w-80 transition-opacity delay-150 duration-1000 opacity-0'
        >
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
        <div className='mt-8 md:mt-32'>
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

          <div className='w-full flex justify-center'>
            <div className='relative w-full max-w-[1420px] h-full max-h-[900px] '>
              <div className='h-screen max-h-[1200px] w-full flex justify-center items-center align-middle text-center'>
                <div className='z-10 mx-10 md:w-1/2'>
                  <div className='text-3xl font-bold inline text-transparent bg-clip-text bg-gradient-to-l from-white via-yellow-500 to-orange-600'>
                    How does it work?
                  </div>
                  <br />
                  <br />
                  <div className='text-2xl font-bold'>
                    Our algorithm predicts the outcome of the match based on the
                    statistics of the players and teams.
                  </div>
                </div>
              </div>
              <div
                className='absolute w-40 h-40 top-16'
                data-value='5'
                ref={(ref) => {
                  paralaxRef.current[0] = ref;
                }}
              >
                <Image src='/assets/blobs/blob1.svg' layout='fill' />
              </div>
              <div
                className='absolute w-24 h-24 top-44 right-36'
                data-value='-2'
                ref={(ref) => {
                  paralaxRef.current[1] = ref;
                }}
              >
                <Image src='/assets/blobs/blob4.svg' layout='fill' />
              </div>
              <div
                className='absolute w-64 h-64 right-1/4 top-1/2'
                data-value='4'
                ref={(ref) => {
                  paralaxRef.current[2] = ref;
                }}
              >
                <Image src='/assets/blobs/blob3.svg' layout='fill' />
              </div>
              <div
                className='absolute w-80 h-80 hidden md:block bottom-1/4 md:top-3/4 left-4'
                data-value='-4'
                ref={(ref) => {
                  paralaxRef.current[3] = ref;
                }}
              >
                <Image src='/assets/blobs/blob4.svg' layout='fill' />
              </div>
              <div
                className='absolute w-20 h-20 md:right-36 right-8 bottom-0'
                data-value='-8'
                ref={(ref) => {
                  paralaxRef.current[4] = ref;
                }}
              >
                <Image src='/assets/blobs/blob2.svg' layout='fill' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
