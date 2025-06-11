'use client';
import React from 'react'
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

const addbox = () => {
    const [amounterror, setamounterror] = useState('')
    const [discrerror, setdiscerror] = useState('')
    const [amount, setamount] = useState('')
    const [dis, setdis] = useState('')
    const [show, setshow] = useState(false)
    const handleamount = (e) => {
        setamount(e.target.value)
        isNaN(amount) ? setamounterror("* amount must be a number") : setamounterror("")
    }
    const handlevisbility = () => {
        show ? setshow(false) : setshow(true)
    }

    const handledis = (e) => {
        setdis(e.target.value)
        dis.length < 7 ? setdiscerror("* Discrption should atleast be 8 character") : setdiscerror("")
    }
    const handleadd = () => {
        if (amount.length === 0) { setamounterror("* This field is required") }
        if (dis.length === 0) { setdiscerror("* This field is required") }
        if (amount.length!== 0 && !isNaN(amount) && dis.length>7) {
            const toastId = toast.loading('Adding...', {
                icon: '⏳',
                style: {
                    fontSize: '20px',
                    borderRadius: '10px',
                    background: 'blue', // cool gradient
                    color: '#fff',
                    fontWeight: '600',
                    padding: '12px 24px',
                },
            }
            );
            setTimeout(() => {
                toast.dismiss(toastId); // remove loading toast
                toast.success('Added successfully!', {
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
                handlevisbility()

            }, 2000);

        }
    }

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div className='w-full  h-full '>
                <div className="relative mx-auto my-10 max-w-[90%] h-150 rounded-4xl bg-blue-950/40">
                    <div className="relative mx-14 pt-5 mb-5 text-slate-400  flex gap-4">
                        <button className='border-2 px-5 py-2 rounded-full border-white hover:bg-slate-700'>today</button>
                        <button className='border-2 px-4 py-2 rounded-full border-white hover:bg-slate-700'>weekly</button>
                        <button className='border-2 px-4 py-2 rounded-full border-white hover:bg-slate-700'>monthly</button>
                        <button className='border-2 px-5 py-2 rounded-full border-white hover:bg-slate-700'>Graph</button>
                    </div>
                    <div className='h-[80%] w-[92%] bg-slate-800/30 m-auto overflow-auto rounded-4xl'>
                        <div className='flex justify-evenly mt-3 mx-3  py-2 rounded-3xl text-slate-100/20'>
                            <div className=' w-[12.5%] flex flex-col items-center'>
                                <span>date</span>
                                <span>time</span>
                            </div>
                            <div className=' w-[75%] flex items-center '>
                                <div className='w-[92%]'>message</div>
                                <div className='text-red-400'>₹3000</div>
                            </div>

                            <div className='flex gap-10 w-[12.5%] ml-2 '>
                                <button><img width={60 } src="./edit.gif" alt="" /></button>
                                <button><img width={60} src="./delete.gif" alt="" /></button>
                            </div>
                            <div></div>
                        </div>
                    </div>
                    <span className={!show ? "b1 text-white rounded-full text-4xl relative bottom-6 left-[50%] bg-amber-500" : "hidden"} onClick={() => handlevisbility()}> <img width={100} src="./add.gif" alt="" />

                    </span>
                    <div className={show ? " w-[40%] h-[85%] absolute bottom-[20%] left-[30%] '{}' bg-slate-800  rounded-3xl" : "hidden"}>
                        <div className="t t4 my-4 flex justify-center">
                            <img className='coin' width={80} src="./logo.gif" alt="" />
                            <span className="text-blue-300  t1 text-6xl ">
                                X<span className="text-white  t2 font-semibold text-3xl">Track</span>
                            </span>

                        </div>
                        <div className="t m logo text-white text-xl mx-15 mb-4">Enter amount</div>
                        <input
                            className="input logo text-white w-[80%] ml-14 border-1 border-white rounded-xl mb-3 focus:border-2 px-3 py-2 text-xl bg-slate-800"
                            type="text"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => handleamount(e)}

                        />
                        <div className='error text-red-500 w-80  font-medium ml-16 mb-4'>  {amounterror}
                        </div>
                        <div className="t m logo text-white text-xl mx-15 mb-4">Enter Descripton</div>
                        <input
                            className="input logo text-white w-[80%] ml-14 border-1 border-white rounded-xl mb-3 focus:border-2 px-3 py-2 text-xl bg-slate-800"
                            type="text"
                            value={dis}
                            onChange={(e) => handledis(e)}
                            placeholder="Enter descrpition"
                        />
                        <div className='error text-red-500 w-80  font-medium ml-16 mb-4'>{discrerror}
                        </div>
                        <span className={show ? "b1 text-white rounded-full text-4xl relative -bottom-10 left-[50%] bg-amber-500" : "hidden"} onClick={() => handleadd()}>+</span>
                    </div>
                </div>

            </div>
        </>
    )
}

export default addbox