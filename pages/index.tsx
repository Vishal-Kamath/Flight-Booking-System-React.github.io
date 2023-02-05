import Head from 'next/head';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>AirEasy</title>
        <meta name="description" content="Flight Booking project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Vishal Kamath" />
        <meta
          name="keywords"
          content="HTML, CSS, tailwindcss, JavaScript, TypeScript, React, Next"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
