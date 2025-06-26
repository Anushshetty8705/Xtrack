'use client';
import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useParams } from 'next/navigation';

const Addbox = () => {
  const now = new Date();
  const date = now.toLocaleDateString('en-GB');
  const time = now.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const [amounterror, setamounterror] = useState('');
  const [discrerror, setdiscerror] = useState('');
  const [amount, setamount] = useState('');
  const [dis, setdis] = useState('');
  const [show, setshow] = useState(false);
  const { username } = useParams();
  const [entries, setEntries] = useState([]);
  const [monthView, setMonthView] = useState(false);

  useEffect(() => {
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

  const groupByMonth = (entries) => {
    const grouped = {};
    entries.forEach(entry => {
      const [day, month, year] = entry.date.split('/');
      const key = `${month}-${year}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(entry);
    });
    return grouped;
  };

  const handleamount = (e) => {
    setamount(e.target.value);
    isNaN(e.target.value) ? setamounterror("* amount must be a number") : setamounterror("");
  };

  const handlevisbility = () => setshow(prev => !prev);

  const handledis = (e) => setdis(e.target.value);

  const handleadd = async () => {
    if (amount.length === 0) setamounterror("* This field is required");
    if (dis.length === 0) setdiscerror("* This field is required");

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
        const response = await fetch("/api/entry/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, date, time, description: dis, amount: parseFloat(amount) }),
        });

        const result = await response.json();
        if (result.success) {
          const updated = await fetch(`/api/entry/get?username=${username}`);
          const entriesData = await updated.json();
          setEntries(entriesData.entries);
          toast.dismiss(toastId);
          toast.success("Added successfully!");
          setamount('');
          setdis('');
          setshow(false);
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
    confirm("Are you sure....");
    try {
      const res = await fetch("/api/entry/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const result = await res.json();
      if (result.success) {
        toast.success("Entry deleted");
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: entry._id }),
      });
      const result = await res.json();
      if (result.success) {
        const updated = await fetch(`/api/entry/get?username=${username}`);
        const entriesData = await updated.json();
        setEntries(entriesData.entries);
        setamount(entry.amount);
        setdis(entry.description);
        setshow(true);
      }
    } catch (err) {
      toast.error("Server error while editing");
      console.error(err);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className='w-full h-full'>
        <div className="relative animate-fade-in-center mx-auto my-10 max-w-[90%] h-150 rounded-4xl bg-purple-900/40">
          <div className="relative top-5 mb-10 animate-fade-in-left text-2xl text-blue-500 font-semibold ml-10">
            Expense's
          </div>
          <button
            className="text-white bg-blue-700 px-4 py-1 rounded-lg ml-10 hover:bg-blue-900"
            onClick={() => setMonthView(!monthView)}
          >
            {monthView ? "Show All" : "Month View"}
          </button>

          <div className='animate-fade-in-left h-[80%] w-[92%] bg-slate-900/40 custom-scroll m-auto overflow-auto rounded-4xl'>
            {entries.length === 0 && <div className='text-slate-300 ml-5 mt-2'>No items to display</div>}

            {monthView ? (
              Object.entries(groupByMonth(entries)).map(([monthYear, monthEntries]) => {
                const monthTotal = monthEntries.reduce((sum, entry) => sum + entry.amount, 0);
                return (
                  <div key={monthYear} className="mb-6">
                    <div className="flex justify-between items-center px-5 mt-4">
                      <h2 className="text-xl text-blue-300 font-bold">
                        {monthYear.replace('-', '/')}
                      </h2>
                      <span className="text-green-400 font-semibold text-lg">
                        Total: ₹{monthTotal.toFixed(2)}
                      </span>
                    </div>
                    {monthEntries.map(entry => (
                      <div key={entry._id} className='my-5'>
                        <div className="grid gap-1 grid-cols-[0.75fr_5fr_0.75fr_0.75fr]">
                          <div className="text-white px-1 flex flex-col opacity-80 items-center animate-fade-in-down">
                            <span>{entry.date}</span><span className='hide'>{entry.time}</span>
                          </div>
                          <div className="text-white flex items-center opacity-80 overflow-x-auto animate-fade-in-down">
                            {entry.description}
                          </div>
                          <div className="text-red-500 font-semibold flex items-center justify-center text-xl animate-fade-in-down">
                            ₹{entry.amount}
                          </div>
                          <div className='flex items-center justify-center gap-2 animate-fade-in-down'>
                            <img onClick={() => handleedit(entry)} src="./edit.gif" alt="edit" className='w-10' />
                            <img onClick={() => handledelete(entry._id)} src="./delete.gif" alt="delete" className='w-10' />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })
            ) : (
              entries.map(entry => (
                <div key={entry._id} className='my-5'>
                  <div className="grid gap-1 grid-cols-[0.75fr_5fr_0.75fr_0.75fr]">
                    <div className="text-white px-1 flex flex-col opacity-80 items-center animate-fade-in-down">
                      <span>{entry.date}</span><span className='hide'>{entry.time}</span>
                    </div>
                    <div className="text-white flex items-center opacity-80 overflow-x-auto animate-fade-in-down">
                      {entry.description}
                    </div>
                    <div className="text-red-500 font-semibold flex items-center justify-center text-xl animate-fade-in-down">
                      ₹{entry.amount}
                    </div>
                    <div className='flex items-center justify-center gap-2 animate-fade-in-down'>
                      <img onClick={() => handleedit(entry)} src="./edit.gif" alt="edit" className='w-10' />
                      <img onClick={() => handledelete(entry._id)} src="./delete.gif" alt="delete" className='w-10' />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <span className={!show ? "b1 text-white rounded-full text-4xl relative bottom-10 left-[50%] iadd" : "hidden"} onClick={handlevisbility}>
            <img className='iadd animate-fade-in-down' width={70} src="./add.gif" alt="add" />
          </span>

          <div className={show ? "width w-[40%] h-[85%] absolute bottom-[20%] left-[30%] bg-slate-900 rounded-3xl animate-fade-in-center" : "hidden"}>
            <div className="my-4 flex justify-center">
              <img className='coin2 animate-fade-in-up w-20' src="./logo.gif" alt="logo" />
              <span className="animate-fade-in-up text-blue-300 t1 text-6xl">
                X<span className="text-white t2 font-semibold text-3xl">Track</span>
              </span>
            </div>

            <div className="animate-fade-in-up t m logo text-blue-500 text-xl mx-15 mb-4">Enter amount</div>
            <input
              className="animate-fade-in-up add text-white w-[80%] ml-14 border-1 border-white rounded-xl mb-3 focus:border-2 px-3 py-2 text-xl bg-slate-800"
              type="text"
              placeholder="Enter amount"
              value={amount}
              onChange={handleamount}
            />
            <div className='error3 text-red-500 w-80 font-medium ml-16 mb-4'>{amounterror}</div>

            <div className="animate-fade-in-up t m logo text-blue-500 text-xl mx-15 mb-4">Enter Description</div>
            <input
              className="add animate-fade-in-up input logo text-white w-[80%] ml-14 border-1 border-white rounded-xl mb-3 focus:border-2 px-3 py-2 text-xl bg-slate-800"
              type="text"
              placeholder="Enter description"
              value={dis}
              onChange={handledis}
            />
            <div className='error3 text-red-500 w-80 font-medium ml-16 mb-4'>{discrerror}</div>

            <span className={show ? "save text-white rounded-full text-4xl relative -bottom-8 left-[45%] animate-fade-in-up" : "hidden"} onClick={handleadd}>
              <button
                type="button"
                className="animate-fade-in-up save text-white text-lg bg-gradient-to-br from-blue-500 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2"
              >
                SAVE
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addbox;
