'use client';
import { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        toast('Lets start ', {

          style: {
            fontSize: '20px',
            borderRadius: '10px',
            background: 'blue',
            color: '#fff',
          },
          icon: '😊',
        });
      }, 100); // Avoid hydration mismatch
    }
  }, []);

  const handleLogin = () => {
    const toastId = toast.loading('Logging in...', {
      icon: '⏳',
      style: {
        fontSize: '20px',
        borderRadius: '10px',
        background: 'blue', // cool gradient
        color: '#fff',
        fontWeight: '600',
        padding: '12px 24px',
      },
    });
  


    setTimeout(() => {
      toast.dismiss(toastId); // remove loading toast
      toast.success('Logged in successfully!', {
        icon: '✅',
        style: {
          fontSize: '18px',
          borderRadius: '10px',
          background: '#22c55e', // green
          color: '#fff',
          fontWeight: '600',
          padding: '12px 24px',
        },
      });
      router.push('/home'); // navigate after success toast
    }, 2000); // wait 2 seconds
  }
 return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="relative flex w-full object-contain">
        <div className="image w-1/2 mb-20 ml-36 mt-10 justify-center items-center">
          <Image
            className="rounded-3xl relative bg-blue-900/20 h-[90vh] p-10 pb-0 ml-24"
            src="/home.png"
            width={500}
            height={400}
            alt="home"
          />
        </div>
        <div className="p-10 rounded-3xl relative home w-1/2 mt-10 m-20 ml-0 flex items-center justify-center flex-col bg-blue-900/20">
          <div>  
             <div className="mb-10">
              <span className="text-blue-300 text-6xl ">
                X<span className="text-white font-semibold text-3xl">Track</span>
              </span>
            </div>
            <div className="mb-10">
              <span className="text-white text-2xl text-center">
                "Every rupee counts — <span className="text-blue-300">let’s track it wisely"</span>
              </span>
            </div>
            <div className="flex flex-col w-full justify-center items-center">
              <input
                className="text-white mr-18 w-5/6 mb-10 rounded-xl focus:border-2 px-3 py-2.5 text-xl bg-slate-800"
                type="text"
                placeholder="Enter Username"
              
              />
                <input
                className="text-white mr-18 w-5/6 mb-10 rounded-xl focus:border-2 px-3 py-2.5 text-xl bg-slate-800"
                type="password" 
                placeholder="Enter Password"
              />
            </div>
            <div className="items-center justify-center flex flex-col ">
              <button
                onClick={handleLogin}
                type="button"
                className="text-white  text-xl bg-gradient-to-br from-blue-500 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-4 py-2 text-center me-2 mb-10 mr-20"
              >
                Log In
              </button>
              <div className="sig w-full">
                <span className='text-white text-xl ml-8 opacity-60 '>To Join <span className='text-blue-300 text-3xl'>X</span><span className='text-white text-xl'>Track </span>family</span>
               <Link href={"/signing"}> <button
                type="button"
                className="text-white text-xl bg-gradient-to-br from-blue-500 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-4 py-2 text-center ml-4 me-2 mb-2"  >
                  Sign In
              </button>
              </Link>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
