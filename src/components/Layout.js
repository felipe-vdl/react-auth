import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='py-8 flex flex-col items-center flex-grow bg-mesquita'>
        <Outlet />
      </div>
   </div>
  );
}