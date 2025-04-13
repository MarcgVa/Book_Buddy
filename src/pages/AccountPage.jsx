import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetAccountQuery } from '../components/usersSlice';
import { useCheckInBookMutation } from '../components/bookReservationSlice';


export default function AccountPage({ token }) {
  const navigate = useNavigate;
  const { status, data: user } = useGetAccountQuery();
  const [checkInBook] = useCheckInBookMutation();
  const [account, setAccount] = useState(user);

  console.log('account', account);

  const handleCheckInBook = async (id) => { 
    try {
      const response = await checkInBook(id).unwrap();
      if (response) {

        navigate("/account");
      }      
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    if (status.toLowerCase() === "fulfilled") {
      setAccount(user);
    }
    if (!token){navigate("/login")};

  }, []);

  
  return (
    <div className="flex flex-col h-full w-full">
      <p className="m-4 text-3xl font-bold tracking-wider text-shadow-md text-shadow-indigo-200">
        {
          <>
            <span className="pr-2">{account?.firstname}</span>
            <span>{account?.lastname}</span>
          </>
        }
      </p>

      <div className=" flex flex-col relative p-2 items-start  ">
        <div
          className="inline-flex items-center 
            p-1 pr-20 w-100
            relative top-2"
        >
          <p className="font-semibold pr-3">Account Number: </p>
          {account?.id}
        </div>

        <div
          className="inline-flex items-center 
            p-1 pr-20 w-100
            relative top-2"
        >
          <p className="font-semibold pr-3">Email Address: </p>
          {account?.email}
        </div>
      </div>

      <div className="ml-10">
        <table className="table-fixed mt-20 m-3 mr-10 flex flex-col overflow-scroll text-gray-700 shadow-md bg-clip-border">
          <thead className="table bg-indigo-950">
            <tr>
              <th colSpan={3} className="text-2xl text-lime-400">
                Reserved Books:
              </th>
            </tr>
            <tr className=' flex justify-evenly'>
              <th className="text-lime-400">Book Title</th>
              <th className="text-lime-400">Author</th>
              <th className="text-lime-400">Book Cover</th>
            </tr>
          </thead>
          <tbody className="table  ml-5 mb-5">
            {account?.reservations.map((res) => (
              <tr key={res?.id} className=''>
                <td className="table-cell ">{res?.title}</td>
                <td className='table-cell text-start'>{res?.author}</td>
                <td className="table-cell text-center  pt-5">
                  <img src={res?.coverimage} alt="" className="w-25" />
                </td>
                <td className=''>
                  <button
                    onClick={() => handleCheckInBook(res?.id)}
                    className="bg-emerald-900 px-2 text-center rounded-2xl text-[10px] text-white"
                  >
                    Check In
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
