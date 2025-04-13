import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetAccountQuery } from '../components/usersSlice';
import { useGetBookQuery } from '../components/bookSlice';
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
    if (!token){navigate("/login")};

  }, []);


  useLayoutEffect(() => {
    if (status.toLowerCase() === "fulfilled" ) {
      setAccount(user);
    }

  }, [status]);
  
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

      <div className="mt-20 m-3 relative flex flex-col w-[70%] h-[90%] overflow-scroll text-gray-700 shadow-md bg-clip-border">
        <div>
          <table className="text-left table-auto min-w-max">
            <thead className="table-header-group bg-indigo-950">
              <tr>
                <th colSpan={3} className="text-2xl">
                  Reserved Books:
                </th>
              </tr>
              <tr>
                <th className="p-1 pr-3">Book Title</th>
                <th className="p-1 pr-3">Author</th>
                <th className="p-1 pr-3">Book Cover</th>
              </tr>
            </thead>
            <tbody className="table-row-group">
              {account?.reservations.map((res) => (
                <tr key={res?.id}>
                  <td className="">{res?.title}</td>
                  <td>{res?.author}</td>
                  <td className="justify-center">
                    <img src={res?.coverimage} alt="" className="w-15" />
                  </td>
                  <td>
                    <button onClick={() => handleCheckInBook(res?.id)}
                      className="bg-emerald-900 px-2 text-center rounded-2xl text-[10px] text-white"
                    >
                      Check In
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-2xl"></p>
          <div key={account?.reservations.id}></div>
        </div>
      </div>
    </div>
  );
}
