
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
export const metadata = {
  title: "Xtrack-userpage",
  description: "tarck your expense",
    icons: {
    icon: [
      
      { url: '/logo.png', sizes: '16x16', type: 'image/png' },
    ],
  },
}
const userpage = ({ params }) => {
  return (
    <>
      <nav className="nav bg-blue-950/40 rounded-2xl sticky  text-white px-8 py-4 flex justify-between items-center w-full">
     
        <div className='font-semibold flex  justify-center items-center'>
          <img width={80} src="./logo.gif" alt="" />

          <span className="t1 text-blue-300 text-4xl">
            X<span className="t2 text-white text-2xl">Track</span>
          </span>
        </div>

     
        <div className="nav t t2 flex items-center gap-10">
          <span className="text-lg">Welcome {params.username}</span>
          <Link href={"/"}>
          <button
            type="button"
            className=" bu text-white text-lg bg-gradient-to-br from-blue-500 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-4 py-2"
          >
            Log Out
          </button>
          </Link>
        </div>
      </nav>
      <div className='w-[100vw] h-[100vh] bg-amber-500 flex'>
        <div className="right w-1/2 h-full bg-green-900"></div>
        <div className="left w-1/2 h-full bg-blue-300"></div>
      </div>
    </>
  );
};

export default userpage;
