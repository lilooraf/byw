import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  const hideUnhideById = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.display =
        element.style.display === 'none' ? 'block' : 'none';
    }
  };

  let left = (
    <div className='left'>
      <Link href='/'>
        <a className='bold' data-active={isActive('/')}>
          Feed
        </a>
      </Link>
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

  let right = null;

  if (status === 'loading') {
    left = (
      <div className='left'>
        <Link href='/'>
          <a className='bold' data-active={isActive('/')}>
            Feed
          </a>
        </Link>
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
        <Link href='/api/auth/signin'>
          <a data-active={isActive('/signup')}>Log in</a>
        </Link>
        <style jsx>{`
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
        `}</style>
      </div>
    );
  }

  if (session) {
    left = (
      <div className='left'>
        <Link href='/'>
          <a className='bold' data-active={isActive('/')}>
            Feed
          </a>
        </Link>
        <Link href='/fixture/list'>
          <a data-active={isActive('/fixture/list')}>Fixtures</a>
        </Link>
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
        {/* <p>
          {session.user.name} ({session.user.email})
        </p> */}

        <button
          id='dropdownAvatarNameButton'
          data-dropdown-toggle='dropdownAvatarName'
          onClick={() => hideUnhideById('dropdownAvatarName')}
          className='flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white'
          type='button'
        >
          <span className='sr-only'>Open user menu</span>
          <img
            className='mr-2 w-8 h-8 rounded-full'
            src={session.user.image}
            alt='user photo'
          />
          {session.user.name}
          <svg
            className='w-4 h-4 mx-1.5'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clip-rule='evenodd'
            ></path>
          </svg>
        </button>

        <div
          id='dropdownAvatarName'
          className='hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 absolute'
        >
          <div className='py-3 px-4 text-sm text-gray-900 dark:text-white'>
            <div className='truncate'>{ session.user.email }</div>
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

        <div>
          {/* <img className='rounded-full h-12' src={session.user.image} /> */}

          {/* <Link href="/profile">
          <button>
            <a>Profile</a>
          </button>
        </Link> */}
        </div>
        {/* <Link href="/create">
          <button>
            <a>New post</a>
          </button>
        </Link> */}
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  return (
    <nav>
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }
      `}</style>
    </nav>
  );
};

export default Header;
