import Link from 'next/link';
import React from 'react';

const Logo: React.FC<{ classname: string }> = ({ classname }) => {
  return (
    <Link href={'/'} className={`${classname} font-semibold`}>
      <span>Air</span>
      <span className="text-cyan-400">Easy</span>
    </Link>
  );
};

export default Logo;
