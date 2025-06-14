'use client';
import React from 'react'
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useParams } from 'next/navigation';



const addbox = () => {
    const [amounterror, setamounterror] = useState('')
    const [discrerror, setdiscerror] = useState('')
    const [amount, setamount] = useState('')
    const [dis, setdis] = useState('')
    const [show, setshow] = useState(false)
    const { username } = useParams();
    const [entries, setEntries] = useState([]);
    React.useEffect(() => {
        const fetchEntries = async () => {
            try {
                const res = await fetch(`/api/entry/get?username=${username}`);
                const data = await res.json();
                if (data.success) {
                    setEntries(data.entries);
                } else {
                    toast.error(data.message || "Could not load entries");
                }
            } catch (err) {
                toast.error("Server error while loading entries");
            }
        };

        fetchEntries();
    }, [username]);

    const handleamount = (e) => {
        setamount(e.target.value)
        isNaN(amount) ? setamounterror("* amount must be a number") : setamounterror("")
    }
    const handlevisbility = () => {
        show ? setshow(false) : setshow(true)
    }

    const handledis = (e) => {
        setdis(e.target.value)

    }
    const handleadd = async () => {
        if (amount.length === 0) {
            setamounterror("* This field is required");
        }
        if (dis.length === 0) {
            setdiscerror("* This field is required");
        }

        if (amount.length !== 0 && !isNaN(amount)) {
            const toastId = toast.loading('Adding...', {
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
                // 1. Send add request
                const response = await fetch("/api/entry/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        date: new Date().toLocaleDateString(),
                        time: new Date().toLocaleTimeString(),
                        description: dis,
                        amount: parseFloat(amount),
                    }),
                });

                const result = await response.json();

                if (result.success) {
                    // 2. Refresh entries list
                    const updated = await fetch(`/api/entry/get?username=${username}`);
                    const entriesData = await updated.json();
                    setEntries(entriesData.entries);

                    toast.dismiss(toastId);
                    toast.success("Added successfully!");
                    setamount('');
                    setdis('');
                    setshow(false);
                    handlevisbility();
                } else {
                    toast.dismiss(toastId);
                    toast.error(result.message || "Failed to add entry");
                }
            } catch (err) {
                toast.dismiss(toastId);
                toast.error("Server error");
            }
        }
    };
    const handledelete = async (id) => {
        confirm("Are you sure....")
        try {
            const res = await fetch("/api/entry/delete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id })
            });

            const result = await res.json();

            if (result.success) {
                toast.success("Entry deleted");

                // Refresh entries after deletion
                const updated = await fetch(`/api/entry/get?username=${username}`);
                const entriesData = await updated.json();
                setEntries(entriesData.entries);
            } else {
                toast.error(result.message || "Delete failed");
            }
        } catch (err) {
            toast.error("Server error while deleting");
            console.error(err);
        }
    };
    const handleedit = async (entry) => {
        try {
            const res = await fetch("/api/entry/edit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: entry._id })
            });
            const result = await res.json();

            if (result.success) {
                const updated = await fetch(`/api/entry/get?username=${username}`);
                const entriesData = await updated.json();
                setEntries(entriesData.entries);
                setamount(entry.amount)
                setdis(entry.description)
                setshow(true)

            }
        } catch (err) {
            toast.error("Server error while deleting");
            console.error(err);
        }


    }




    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div className='w-full  h-full  '>
                <div className="h relative  animate-fade-in-center mx-auto my-10 max-w-[90%] h-150 rounded-4xl bg-blue-950/40">
              
                <div className="tex relative top-5 mb-10  animate-fade-in-left text-2xl text-white ml-10 ">Expense's</div>
              
                    <div className='h1 animate-fade-in-left h-[80%] w-[92%] bg-slate-800/30 custom-scroll m-auto overflow-auto rounded-4xl'>
                        {entries.length === 0 && <div className='text-slate-300 ml-5 mt-2'>No items to display</div>}

                        {entries.map(entry => (
                            <div key={entry.id} className='w animate-fade-in-down flex justify-evenly mt-3 mx-3  py-2 rounded-3xl text-slate-100/90'>
                                <div className=' w-[12.5%] flex flex-col items-center'>
                                    <span className=' w-[100%]'>{entry.date}</span>
                                    <span className=' w-[100%]'>{entry.time}</span>
                                </div>
                                <div className=' w-[75%] flex items-center '>
                                    <div className='w-[92%]'>{entry.description}</div>
                                    <div className=' text-red-500 font-semibold text-2xl'>₹{entry.amount}</div>
                                </div>

                                <div className=' flex gap-10 w-[12.5%] ml-2 '>
                                    <button onClick={() => handleedit(entry)}><img width={40} src="./edit.gif" className='' alt="" /></button>
                                    <button onClick={() => handledelete(entry._id)}><img width={40} src="./delete.gif" className='' alt="" /></button>
                                </div>
                                <div></div>
                            </div>
                        ))}
                    </div>
                    <span className={!show ? "b1 text-white rounded-full text-4xl relative bottom-10 left-[50%] add  " : "hidden"} onClick={() => handlevisbility()}> <img className='add animate-fade-in-down' width={70} src="./add.gif" alt="" />

                    </span>
                    <div className={show ? "width w-[40%] h-[85%] absolute bottom-[20%] left-[30%]  bg-slate-800  rounded-3xl animate-fade-in-center" : "hidden"}>
                        <div className="t t4 my-4 flex justify-center">
                            <img className='coin2 animate-fade-in-up' width={80} src="./logo.gif" alt="" />
                            <span className="animate-fade-in-up text-blue-300  t1 text-6xl ">
                                X<span className=" text-white t2   font-semibold text-3xl">Track</span>
                            </span>

                        </div>
                        <div className="animate-fade-in-up t m logo text-white text-xl mx-15 mb-4">Enter amount</div>
                        <input
                            className=" animate-fade-in-up input logo text-white w-[80%] ml-14 border-1 border-white rounded-xl mb-3 focus:border-2 px-3 py-2 text-xl bg-slate-800"
                            type="text"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => handleamount(e)}

                        />
                        <div className='error text-red-500 w-80  font-medium ml-16 mb-4'>  {amounterror}
                        </div>
                        <div className="animate-fade-in-up t m logo text-white text-xl mx-15 mb-4">Enter Descripton</div>
                        <input
                            className="animate-fade-in-up input logo text-white w-[80%] ml-14 border-1 border-white rounded-xl mb-3 focus:border-2 px-3 py-2 text-xl bg-slate-800"
                            type="text"
                            value={dis}
                            onChange={(e) => handledis(e)}
                            placeholder="Enter descrpition"
                        />
                        <div className='error text-red-500 w-80  font-medium ml-16 mb-4'>{discrerror}
                        </div>
                        <span className={show ? "b1 text-white rounded-full text-4xl relative -bottom-8 left-[45%] animate-fade-in-up" : "hidden"} onClick={() => handleadd()}>
                            <button
                                type="button"
                                className="animate-fade-in-up bu3 text-white text-lg bg-gradient-to-br from-blue-500 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-4 py-2"
                            >
                           SAVE
                            </button>
                        </span>
                    </div>
                </div>

            </div>
        </>
    )
}

export default addbox