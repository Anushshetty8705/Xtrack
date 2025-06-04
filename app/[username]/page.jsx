import React from 'react';
import Link from 'next/link';
const Homepage = ({ params }) => {
  return (
    <>
      <nav className="bg-blue-950/40 rounded-2xl sticky  text-white px-8 py-4 flex justify-between items-center w-full">
     
        <div className='font-semibold '>
          <span className="text-blue-300 text-4xl">
            X<span className="text-white text-2xl">Track</span>
          </span>
        </div>

     
        <div className="flex items-center space-x-8">
          <span className="text-lg">Welcome {params.username}</span>
          <Link href={"/"}>
          <button
            type="button"
            className="text-white text-lg bg-gradient-to-br from-blue-500 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-4 py-2"
          >
            Log Out
          </button>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Homepage;
