import Link from 'next/link';
import React from 'react';
import Logo from './logo';

const Header: React.FC<{ signContainer: boolean }> = ({ signContainer }) => {
  return (
    <header className="w-full border-b-2 border-blue-200 border-opacity-20 bg-blue-200 bg-opacity-20 px-[4vw] py-2">
      <section className="m-auto flex max-w-7xl justify-between">
        <Logo classname={'text-4xl'} />
        {signContainer && (
          <nav className="flex content-center gap-2 rounded-full bg-gray-200 p-1">
            <Link
              href={'/user/signin'}
              className="grid place-content-center rounded-full bg-cyan-400 py-1 px-2 font-bold text-white"
            >
              Sign In
            </Link>
            <span className="text-xl">/</span>
            <Link
              href={'/user/signup'}
              className="grid place-content-center rounded-full bg-cyan-400 py-1 px-2 font-bold text-white"
            >
              Sign Up
            </Link>
          </nav>
        )}
      </section>
    </header>
  );
};

export default Header;
