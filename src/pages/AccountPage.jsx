import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAccountQuery } from "../services/authService";
import {
  useCheckInBookMutation,
  useGetReservationsQuery,
} from "../services/bookService";

export default function AccountPage() {
  const navigate = useNavigate;
  const [checkInBook] = useCheckInBookMutation();
  const { status, data: user } = useGetAccountQuery();
  const { status: resStatus, data: reservationList } =
    useGetReservationsQuery();
  console.log("resStatus", resStatus);
  console.log("ResList", reservationList);

  const [account, setAccount] = useState({
    firstname: "",
    lastname: "",
    email: "",
    id: "",
    reservations: [],
  });

  const [reservations, setReservations] = useState([]);

  const handleCheckInBook = async (id) => {
    try {
      await checkInBook(id).unwrap();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    localStorage.getItem("token") ? null : navigate("/login");
  }, []);

  useEffect(() => {
    if (status.toLowerCase() === "fulfilled") {
      setAccount(user);
    }
  }, [status]);

  useEffect(() => {
    setAccount((prev) => ({
      ...prev,
      reservations: reservationList,
    }));
  }, [resStatus]);

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
        <table className="table-fixed mt-20 m-3 mr-10 flex flex-col overflow-scroll bg-clip-border rounded-2xl">
          <caption
            className="caption-top m-0 p-5 bg-linear-to-b to-blue-400 from-55% from-emerald-600
                text-sky-100 flex justify-center text-3xl text-shadow-lg text-shadow-blue-900 "
          >
            Reserved Books
          </caption>
          <thead className="table flex bg-linear-to-b from-blue-400 to-55% to-emerald-600">
            <tr>
              <th colSpan={3} className="col-span-3 "></th>
            </tr>
            <tr>
              <th className="text-sky-100 text-shadow-lg text-shadow-blue-900 text-2xl py-4">
                Book Title
              </th>
              <th className="text-sky-100 text-shadow-lg text-shadow-blue-900 text-2xl py-4">
                Author
              </th>
              <th className="text-sky-100 text-shadow-lg text-shadow-blue-900 text-2xl py-4">
                Book Cover
              </th>
              <th className="text-emerald-600">bookch</th>
            </tr>
          </thead>
          <tbody className="table mb-15 bg-gray-200 rounded-b-2xl">
            {account?.reservations?.map((res) => (
              <tr key={res?.id} className="">
                <td className="table-cell text-center">{res?.title}</td>
                <td className="table-cell text-center">{res?.author}</td>
                <td className="flex justify-center items-center pt-5 mb-5">
                  <img src={res?.coverimage} alt="" className="w-25" />
                </td>
                <td className="">
                  <button
                    onClick={() => handleCheckInBook(res?.id)}
                    className="cursor-pointer bg-linear-to-br from-blue-400 to-emerald-700 px-4 m-0 text-center rounded-2xl text-[14pts] text-white"
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
