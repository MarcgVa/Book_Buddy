import React, { useState, useEffect } from "react";
import { useGetAccountQuery } from "../../services/authService";
import { useNavigate } from "react-router-dom";


export default function AccountSettings() {
  const { status, data: user } = useGetAccountQuery();
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    firstname: "",
    lastname: "",
    email: "",
    id: "",
  });

  useEffect(() => {
    localStorage.getItem("token") ? null : navigate("/login");
  }, []);

  useEffect(() => {
    if (status.toLowerCase() === "fulfilled") {
      setAccount(user);
    }
  }, [status]);

  return (
    <div className="flex flex-col h-full w-full ml-20 mt-20 mb-0">

      <p className="ml-3 text-4xl font-bold tracking-wider text-shadow-md text-shadow-indigo-200  sticky top-0">
        {
          <>
            <span className="pr-2">{account?.firstname}</span>
            <span>{account?.lastname}</span>
          </>
        }
      </p>

      <div className=" flex flex-col relative p-2 items-start  ">
        <div className="inline-flex items-center p-1 pr-20 w-100 relative top-2">
          <p className="font-semibold pr-3">Account Number: </p>
          {account?.id}
        </div>

        <div
          className="inline-flex items-center p-1 pr-20 w-100 relative top-2">
          <p className="font-semibold pr-3">Email Address: </p>
          {account?.email}
        </div>
      </div>
    </div>
  );
}
