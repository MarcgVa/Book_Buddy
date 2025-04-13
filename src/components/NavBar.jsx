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
    sessionStorage.clear();
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
          <div
            className="inline-flex items-center mt-6 justify-start ml-2"
            onClick={() => navigate("/")}
          >
            <HomeIcon
              className={`text-sky-200 w-5 cursor-pointer block float-left`}
            />
            <p
              className={`text-sky-200 text-md ${!open ? "hidden" : "ml-4"}`}
            >
              Home
            </p>
          </div>

          <div
            className={`inline-flex items-center cursor-pointer justify-start ml-2`}
            onClick={() => navigate("/bookList")}
          >
            <BookOpenIcon
              className={`text-sky-200 w-5 float-left justify-center`}
            />
            <p
              className={`text-sky-200 text-md ${!open ? "hidden" : "ml-4"}`}
            >
              Books
            </p>
          </div>

          <div
            className={`inline-flex items-center cursor-pointer justify-start ml-2`}
            onClick={() => handleNavigation("/account")}
          >
            <UserIcon
              className={`${!token ? "hidden" : null
                } text-sky-200 w-5 cursor-pointer block float-left`}
            />
            <p
              className={`${!token ? "hidden" : null} text-sky-200 text-md ${
                !open ? "hidden" : "ml-4"
              }`}
            >
              Account
            </p>
          </div>

          <div
            onClick={() => navigate("/login")}
            className="inline-flex items-center cursor-pointer justify-start ml-2"
          >
            {!token ? (
              <>
                <LockClosedIcon className="text-sky-200 text-md w-5" />
                <p
                  className={`text-sky-200 text-md ${
                    !open ? "hidden" : "ml-4"
                  }`}
                >
                  Login
                </p>
              </>
            ) : (
              <div onClick={handleLogout} className="inline-flex">
                <LockOpenIcon className="text-sky-200 text-md w-5" />
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
        <ChevronLeftIcon
          className={`text-sky-200 w-8 absolute -right-0 bottom-4 cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
      </div>
    </div>
  );
}
