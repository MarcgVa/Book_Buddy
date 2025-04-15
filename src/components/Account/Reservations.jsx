import React, { useEffect, useState } from "react";
import {
  useGetReservationsQuery,
  useCheckInBookMutation,
} from "../../services/bookService";
import { ToastContainer, toast, Slide } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Reservations() {

  const { status, data: reservationList } = useGetReservationsQuery();
  const [checkInBook] = useCheckInBookMutation();
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("token") ? null : navigate("/login");
  }, []);

  useEffect(() => {
    if (status.toLowerCase() === "fulfilled") {
      setReservations(reservationList);
    }
  }, [status]);

  const notify = (type, message) => {
    toast(message, {
      type: type,
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      progress: undefined,
      closeOnClick: true,
      theme: "colored",
      transition: Slide,
    });
  };

  const handleCheckInBook = async (id) => {
    try {
      await checkInBook(id).unwrap();
      notify('success','Book returned to library')
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex justify-center">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={true}
      />
      <div className="mt-20 ml-20 ">
        <p className="text-4xl font-bold tracking-wider text-shadow-md text-shadow-indigo-200 bg-white sticky top-0
                      underline mb-5"
        >
          Reserved Books
        </p>
        <ul className="flex-col justify-center w-90 h-200 overflow-scroll scroll-">
          {reservations?.map((res) => (
            <li key={res?.id} className="flex mb-10">
              <img src={res?.coverimage} alt="" className="w-30" />
              <div className="flex-col ml-4 justify-center items-center ">
                <p className="">
                  <span className="text-lg font-bold">Author:</span>{res?.author}
                </p>
                <p>
                  <span className="text-lg font-bold">Title:</span> {res?.title}
                </p>
                <button
                  onClick={() => handleCheckInBook(res?.id)}
                  className="cursor-pointer bg-linear-to-br from-blue-400 
                  to-emerald-700 justify-center text-center rounded-2xl 
                  px-4 text-[12px] text-white"
                >
                  Check In
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
