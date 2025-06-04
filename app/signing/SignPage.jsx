'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { toast, Toaster } from 'react-hot-toast';


const SignPage = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container  w-150  mx-auto bg-blue-900/20 mt-15 rounded-4xl h-[85vh]">
        <div className="items-center flex flex-col">
          <div className="my-10">
            <span className="text-blue-300 text-6xl ">
              X<span className="text-white font-semibold text-3xl">Track</span>
            </span>
          </div>
        </div>
        <div className="input">
          <div className="text-white text-lg mx-15 mb-5">Enter your Email</div>
          <input
            className="text-white ml-20 w-4/5 mb-5 rounded-2xl focus:border-2 px-3 py-2.5 text-lg bg-slate-800"
            type="email"
            placeholder="Enter Email"
          
          />
          <div className="text-white text-lg mx-15 mb-5">Enter your Password</div>
          <input
            className="text-white ml-20 w-4/5 mb-5 rounded-2xl focus:border-2 px-3 py-2.5 text-lg bg-slate-800"
            type="password"
            placeholder="Enter Password"

          
          />
          <div className="text-white text-lg mx-15 mb-5">Enter your Phone Number</div>
          <input
            className="text-white ml-20 w-4/5 mb-10 rounded-2xl focus:border-2 px-3 py-2.5 text-lg bg-slate-800"
            type="text"
            placeholder="Enter Phone Number"
        
          />
          <div className="flex items-center justify-center">
            <Link href={"/"}>
            <button
              type="button"
           
              className="text-white text-xl bg-gradient-to-br from-blue-500 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2 text-center ml-8 me-2 mb-2"
            >
              Sign In
            </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignPage;
