import React, { useState } from "react"
import { ChevronLeftIcon, HomeIcon, StarIcon, RectangleGroupIcon, UserIcon, BookOpenIcon, LockClosedIcon, LockOpenIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

export default function NavBar({ token, setToken }) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleNavigation = (page) => { 
    token? navigate(page) : navigate('/login');
  }
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
  }

  return (
    <div className="flex h-full sticky top-0 left-0">
      <div
        className={`bg-sky-950 h-screen ${
          open ? "w-35" : " w-15"
        } duration-300 relative`}
      >
        <div className="flex flex-col">
          {/* Home */}
          <div
            className="inline-flex items-center mt-6 justify-start ml-2"
            onClick={() => navigate("/")}
          >
            <p>
              <span className="material-icons text-sky-200">home</span>
            </p>
            <p className={`text-sky-200 text-md ${!open ? "hidden" : "ml-4"}`}>
              Home
            </p>
          </div>

          {/* Books */}
          <div
            className={`inline-flex items-center cursor-pointer justify-start ml-2`}
            onClick={() => navigate("/bookList")}
          >
            <p className="text-sky-200">
              <span className="material-icons">library_books</span>
            </p>
            <p className={`text-sky-200 text-md ${!open ? "hidden" : "ml-4"}`}>
              Books
            </p>
          </div>

          {/* Account */}
          <div
            className={`${!token ? "hidden" : null}  
                inline-flex items-center cursor-pointer justify-start ml-2`}
            onClick={() => handleNavigation("/account")}
          >
            <p className="text-sky-200">
              <span className="material-icons">settings</span>
            </p>
            <p className={` text-sky-200 text-md ${!open ? "hidden" : "ml-4"}`}>
              Account
            </p>
          </div>

          {/* Login */}
          <div
            onClick={() => navigate("/login")}
            className="inline-flex items-center cursor-pointer justify-start ml-2"
          >
            {!token ? (
              <>
                <p className="text-sky-200">
                  <span className="material-icons">login</span>
                </p>
                <p
                  className={`text-sky-200 text-md flex ${
                    !open ? "hidden" : "ml-4"
                  }`}
                >
                  Login
                </p>
              </>
            ) : (
              // * Logout *
              <div onClick={handleLogout} className="inline-flex">
                <p className="text-sky-200">
                  <span className="material-icons">logout</span>
                </p>
                <p
                  className={`text-sky-200 text-md ${
                    !open ? "hidden" : "ml-4"
                  }`}
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        </div>
        <div onClick={()=>setOpen(!open)}>
          {!open ? (
            <span className="material-icons text-sky-200 absolute -right-0 bottom-4 cursor-pointer">
              chevron_right
            </span>
          ) : (
            <span className="material-icons text-sky-200 absolute -right-0 bottom-4 cursor-pointer">
              chevron_left
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
