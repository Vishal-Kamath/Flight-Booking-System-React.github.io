import Link from 'next/link';
import React from 'react';

const Layout: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({
  children,
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="w-full border-b-2 border-blue-200 border-opacity-20 bg-blue-200 bg-opacity-20 px-[4vw] py-2">
        <section className="m-auto flex max-w-7xl justify-between">
          <div className="text-4xl font-semibold">
            <span>Air</span>
            <span className="text-cyan-400">Easy</span>
          </div>
          <nav className="flex content-center gap-2 rounded-full bg-gray-200 p-1">
            <Link
              href={'/signin'}
              className="grid place-content-center rounded-full bg-cyan-400 py-1 px-2 font-bold text-white"
            >
              Sign In
            </Link>
            <span className="text-xl">/</span>
            <Link
              href={'/signup'}
              className="grid place-content-center rounded-full bg-cyan-400 py-1 px-2 font-bold text-white"
            >
              Sign Up
            </Link>
          </nav>
        </section>
      </header>
    </div>
  );
};

export default Layout;
