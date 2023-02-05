import React from 'react';
import Footer from './footer';
import Header from './header';

const Layout: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({
  children,
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header signContainer={true} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
