import React from 'react';
import { Link } from 'react-router';
import logo from '../assets/logo.png';
function Navbar() {
  const routes = [
    {
      title: 'Home',
      path: '/',
      icon: '🏠',
    },
    {
      title: 'Memory Game',
      path: '/memory-game',
      icon: '🧠🎮',
    },
    {
      title: 'Swimming',
      path: '/swimming',
      icon: '🏊🏻‍♂️🎮',
    },
  ];
  const currentPath = window.location.pathname;

  return (
    <div className='h-[100%] w-[12%] md:w-[5%] rounded-xl px-1 border border-white flex flex-col gap-10 justify-center '>
      <img src={logo} alt='' />
      <nav className='space-y-3'>
        {routes.map((route, index) => (
          <Link
            to={route.path}
            className={` flex  items-center justify-center rounded-full aspect-square  bg-[#ffffff81] ${
              currentPath === route.path ? 'bg-[#ffffff]' : ''
            }`}
          >
            {route.icon}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Navbar;
