import React, { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import useOutsideCloser from '../hooks/useOutsideCloser';

const Header: React.FC = () => {
  const ref = useRef(null);
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  const openMenu = () => {
    const element = document.getElementById('dropdownAvatarName');
    // if (element) {
    element.style.display = 'block';
    // }
  };

  const openCloseMenu = () => {
    const element = document.getElementById('dropdownAvatarName');
    if (element.style.display === 'block') {
      element.style.display = 'none';
    } else {
      element.style.display = 'block';
    }
  };

  const closeMenu = () => {
    const element = document.getElementById('dropdownAvatarName');
    // if (element) {
    element.style.display = 'none';
    // }
  };

  useOutsideCloser(ref, closeMenu);

  let left = <div className='left'></div>;

  let right = null;

  if (status === 'loading') {
    left = (
      <div className='left'>
        {/* <Link href='/'>
          <a className='bold' data-active={isActive('/')}>
            Feed
          </a>
        </Link> */}
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: #000;
            display: inline-block;
          }

          .left a[data-active='true'] {
            color: gray;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className='right'>
        <p>Validating session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className='right'>
        <div className='p-1 rounded-md border border-black dark:border-white'>
          
        <Link href='/api/auth/signin'>
          <a data-active={isActive('/signup')}>Log in</a>
        </Link>
        </div>
        {/* <style jsx>{`
          a {
            text-decoration: none;
            color: #000;
            display: inline-block;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid black;
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }
        `}</style> */}
      </div>
    );
  }

  if (session) {
    left = (
      <div className='left flex gap-3'>
        <Link href='/'>
          <a className='hover:text-gray-400' data-active={isActive('/')}>
            Feed
          </a>
        </Link>

        <Link href='/fixture/list'>
          <a className='hover:text-gray-400' data-active={isActive('/fixture/list')}>Fixtures</a>
        </Link>
      </div>
    );
    right = (
      <div ref={ref} className='right'>
        <button
          id='dropdownAvatarNameButton'
          data-dropdown-toggle='dropdownAvatarName'
          onClick={openCloseMenu}
          className='m-0 p-0 flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white'
          type='button'
        >
          <span className='sr-only'>Open user menu</span>
          <img
            className='w-11 h-11 rounded-full'
            src={session.user.image}
            alt='user photo'
          />
        </button>

        <div
          id='dropdownAvatarName'
          className='right-10 hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 absolute'
        >
          <div className='py-3 px-4 text-sm text-gray-900 dark:text-white'>
            <div className='truncate'>{session.user.email}</div>
          </div>
          <ul
            className='py-1 text-sm text-gray-700 dark:text-gray-200'
            aria-labelledby='dropdownInformdropdownAvatarNameButtonationButton'
          >
            <li>
              <a
                href='#'
                className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
              >
                Earnings
              </a>
            </li>
          </ul>
          <div className='py-1' onClick={() => signOut()}>
            <a
              href='#'
              className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
            >
              Sign out
            </a>
          </div>
        </div>
      </div>
    );
  }

  let logo = (
    <div>
      <Link href='/'>
        <Image
          src='/assets/icons/byw-logo.png'
          alt='logo'
          width='64'
          height='40'
          className='rounded-lg dark:invert-0 invert'
        />
      </Link>
    </div>
  );

  return (
    <nav className='flex justify-between items-center p-5'>
      {logo}
      {left}
      {right}
    </nav>
  );
};

export default Header;
