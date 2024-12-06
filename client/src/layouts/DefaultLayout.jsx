import React from 'react';
import Navbar from '../components/Navbar';

function DefaultLayout({ children, wrapperClassName }) {
  return (
    <div className='  top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[99vw] md:w-[95vw] h-[98vh] md:h-[95vh] bg-[#6c6cdb92] relative rounded-lg shadow-md p-2 md:p-5 border border-white flex items-center gap-3'>
      <Navbar />
      <div
        className={` w-full max-h-[100%] flex-1 overflow-hidden  overscroll-y-auto flex flex-col gap-1 ${wrapperClassName}`}
      >
        {children}
      </div>
    </div>
  );
}

export default DefaultLayout;
