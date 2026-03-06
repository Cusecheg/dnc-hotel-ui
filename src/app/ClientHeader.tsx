'use client';

import { SessionProvider } from 'next-auth/react';
import Header from './components/Layout/Header';


export default function ClientHeader() {
  return (
    <SessionProvider>
      <Header />
    </SessionProvider>
  );
}