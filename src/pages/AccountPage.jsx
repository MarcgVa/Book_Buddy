import Reservations from "../components/Account/Reservations";
import AccountSettings from "../components/Account/AccountSettings";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function AccountPage() {
  const navigate = useNavigate();

  
  useEffect(() => {
    localStorage.getItem("token") ? null : navigate("/login");
  }, []);



  return (
    <div className="flex">
        <AccountSettings />
        <Reservations />
    </div>
  );
}
