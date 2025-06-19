'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

const Phonenumber = () => {
  const router = useRouter(); 
  const [Phone, setPhone] = useState('')
  const [phoneerror, setphoneerror] = useState('')
  const [cpassword, setcpassword] = useState('')
  const [name, setname] = useState("")
  const [fond, setfond] = useState(false)
  const [ispassword, setispassword] = useState(false)
  const [password, setpassword] = useState('')
  const [passwerror, setpasswerror] = useState('')
  const [cpasswerror, setcpasswerror] = useState('')
  const [iscpassword, setiscpassword] = useState(false)



  const handlephone = (e) => {
    const value = e.target.value;
    setPhone(value)
    if (isNaN(value)) {
      setphoneerror("* Enter a valid number");
    } else if (value.length !== 10) {
      setphoneerror("* Number must be exactly 10 digits");
    } else {
      setphoneerror("");
    }
  }




  const handlechangepass = (e) => {
    const value = e.target.value;
    setpassword(value);
    value.length < 8 ? setpasswerror("* Password must be 8 characters") : setpasswerror("");
  };




  const handlechangepas = (e) => {
    const value = e.target.value;
    setcpassword(value);
    password !== value ? setcpasswerror("  * password don't match") : setcpasswerror("")

  };



  function showpassword() {
    !ispassword ? setispassword(true) : setispassword(false)
  }



  function show() {
    !iscpassword ? setiscpassword(true) : setiscpassword(false)
  }




const handlesearch = async () => {
  if (Phone.length === 0) {
    setphoneerror("* This field is required");
    return;
  }

  if (Phone.length === 10 && !isNaN(Phone)) {
    const toastId = toast.loading('Searching.....', {
      icon: '⏳',
      style: {
        fontSize: '20px',
        borderRadius: '10px',
        background: 'blue',
        color: '#fff',
        fontWeight: '600',
        padding: '12px 24px',
      },
    });

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: Phone }),
      });

      const result = await response.json();
      toast.dismiss(toastId);

      if (result.error === "false") {
        setname(result.user.username);
        setfond(true);
        toast.success(`Account found for ${result.user.username}`);
      } else {
        toast.error(result.message || "Search failed", {
          icon: '😔',
          style: {
            fontSize: '18px',
            borderRadius: '10px',
            background: '#990000',
            color: '#fff',
            fontWeight: '600',
            padding: '12px 24px',
          },
        });
      }
    } catch (error) {
      toast.dismiss(toastId);
      console.error(error);
      toast.error("Server error. Please try again.");
    }
  }
};





  
  const handlechange = (params) => {
    if (password.length === 0) { setpasswerror(" * This field is required") }

    if (password !== cpassword) { setcpasswerror(" * password don't match") }
    if (cpassword.length === 0) { setcpasswerror(" * This field is required") }
    if (password.length > 7 && cpassword.length > 7 && password === cpassword) {
      const toastId = toast.loading('Changing.....', {
        icon: '⏳',
        style: {
          fontSize: '20px',
          borderRadius: '10px',
          background: 'blue',
          color: '#fff',
          fontWeight: '600',
          padding: '12px 24px',
        },
      });
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "phone": Phone,
        "cpassword": cpassword
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("/api/change", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          toast.dismiss(toastId);
          if (result.error === "false") {
            toast.success('Password changed successfully');
            router.push('/'); 
          } else {
            toast.error(result.message || "Search failed", {
              icon: '😔',
              style: {
                fontSize: '18px',
                borderRadius: '10px',
                background: '#990000 ',
                color: '#fff',
                fontWeight: '600',
                padding: '12px 24px',
              },
            });
          }
        })
    }

  }


  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div >
        <div className="w-[35%] forgotbox  bg-purple-900/30   rounded-3xl flex flex-col items-center  mx-auto my-10 animate-fade-in-center">
          <div className="find font-semibold text-blue-500 text-3xl mt-10 mr-60 mb-5 animate-fade-in-up">Find your account</div>

          <div className="enter text-blue-500 text-xl mb-3 mr-69 animate-fade-in-up">Enter  phone number</div>
          <div className="phone flex ml-20 w-[100%] gap-4 ">

            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Enter Phone Number"
              value={Phone}
              onChange={handlephone}
              autoComplete="off"
              className="inpphone animate-fade-in-up text-white border  border-slate-600 w-8/12  mb-2 rounded-2xl focus:border-2 px-3 py-2.5 text-lg bg-slate-800 ml-0 z-10 relative"
            />
            <div className='hidden show  ml-6 mb-2 text-red-500'>{phoneerror}</div>

            <div>
              <button
                type="button"
                onClick={handlesearch}
                className="search animate-fade-in-up z-10 relative text-white text-lg sm:text-xl bg-gradient-to-br from-blue-500 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5"
              >
                Search
              </button>
            </div>
          </div>
          <div className='hide error text-red-500 w-80  mr-30 font-medium  mb-1'>{phoneerror}</div>
          {fond && <>
            <div className="text-blue-500 flex flex-col justify-start">
              <div className='text-2xl  mr-75 mb-3 animate-fade-in-down font-semibold account'>Account found</div>
              <div className='username text-xl mb-2 ml-3 animate-fade-in-down'>Username</div>
              <div>
                <input type="text" className="animate-fade-in-down input m logo text-white  w-4/5 mb-2 rounded-2xl focus:border-2 px-3 py-2.5 text-lg bg-slate-800 ml-3" value={name} readOnly />
              </div>
            </div>
            <div className="enter text-blue-500 animate-fade-in-down  text-lg mr-65 mb-2">Enter New password</div>
            <div className='animate-fade-in-down relative w-4/5'>

              <input
                className=" input m logo text-white  w-full mb-1 rounded-xl focus:border-2 px-3 py-2.5 text-xl bg-slate-800"
                type={ispassword ? 'text' : 'password'}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => handlechangepass(e)}
              />
              <img className='lview  invert-75  absolute top-2 left-98' width={32} src={ispassword ? "./view.png" : './hide.png'} alt="" onClick={() => showpassword()} />
            </div>
            <div className='passerror text-red-500 w-80  font-medium mr-22 mb-1'>{passwerror}</div>

            <div className="animate-fade-in-up enter text-blue-500 text-lg mr-65 mb-2">Confirm password</div>
            <div className='animate-fade-in-down relative w-4/5'>

              <input
                className="input m logo  text-white  w-full mb-1 rounded-xl focus:border-2 px-3 py-2.5 text-xl bg-slate-800"
                type={iscpassword ? 'text' : 'password'}
                placeholder="Enter Password"
                value={cpassword}
                onChange={(e) => handlechangepas(e)}
              />
              <img className='lview  invert-75  absolute top-2 left-98' width={32} src={iscpassword ? "./view.png" : './hide.png'} alt="" onClick={() => show()} />
              <div className='error text-red-500 w-80  font-medium ml-2 mb-3'>{cpasswerror}</div>

            </div>
            <button
              type="button"
              onClick={() => handlechange()}
              className="bu bu1 animate-fade-in-up  text-white text-xl bg-gradient-to-br from-blue-500 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-2.5 py-2 mb-5 "

            >
              Change
            </button>
          </>}

        </div>
      </div>
    </>
  )
}

export default Phonenumber
