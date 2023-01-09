import React, { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import useOutsideCloser from '../hooks/useOutsideCloser';
import { useState } from 'react';

const Header: React.FC = () => {
  const menuUserRef = useRef(null);
  const menuRef = useRef(null);
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  const openCloseMenuUser = () => {
    const element = document.getElementById('dropdownAvatarName');
    if (element.style.display === 'block') {
      element.style.display = 'none';
    } else {
      element.style.display = 'block';
    }
  };

  const closeMenuUser = () => {
    const element = document.getElementById('dropdownAvatarName');
    // if (element) {
    element.style.display = 'none';
    // }
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  useOutsideCloser(menuUserRef, closeMenuUser);
  useOutsideCloser(menuRef, closeMenu);

  let menu = <div className='left'></div>;

  let right = null;

  if (status === 'loading') {
    menu = (
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
    menu = (
      <div className=''>
        <button
          data-collapse-toggle='navbar-hamburger'
          type='button'
          className='inline-flex items-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          aria-controls='navbar-hamburger'
          aria-expanded='false'
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            className='w-6 h-6'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
              clip-rule='evenodd'
            ></path>
          </svg>
        </button>
      </div>
    );
    right = (
      <div ref={menuUserRef} className='right'>
        <button
          id='dropdownAvatarNameButton'
          data-dropdown-toggle='dropdownAvatarName'
          onClick={openCloseMenuUser}
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
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <Link href='/'>
        <Image
          src='/assets/icons/byw-logo.png'
          alt='logo'
          width='64'
          height='40'
          className='rounded-lg dark:invert-0 invert cursor-pointer'
        />
      </Link>
    </div>
  );

  return (
    <div>
      <div
        ref={menuRef}
        className={`${
          showMenu ? 'w-40 backdrop-blur-md bg-gray-500/10 dark:bg-black/10 shadow-lg' : 'w-0'
        } h-full fixed transition-all duration-150 z-40`}
      >
        <div
          className={`${
            showMenu ? 'visible' : 'invisible'
          } flex flex-col items-center justify-between h-full py-5`}
        >
          <div className='flex flex-col space-y-4 mt-6 items-center'>
            <div>
              <Link href='/'>
                <a
                  className='hover:text-gray-400'
                  data-active={isActive('/fixture/list')}
                >
                  Home
                </a>
              </Link>
            </div>
            <div>
              <Link href='/fixture/list'>
                <a
                  className='hover:text-gray-400'
                  data-active={isActive('/fixture/list')}
                >
                  Fixtures
                </a>
              </Link>
            </div>
          </div>

          <div className='' onClick={() => signOut()}>
            <a
              href='#'
              className='block rounded-md p-2 text-sm text-gray-700 hover:bg-red-600 dark:hover:bg-red-600 dark:text-gray-200 dark:hover:text-white'
            >
              Sign out
            </a>
          </div>
        </div>
      </div>

      <nav className='relative flex justify-between items-center px-6 py-4'>
        {menu}
        {logo}
        {right}
      </nav>
    </div>
  );
};

export default Header;
