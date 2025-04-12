import React, { useState } from "react"
import { ChevronLeftIcon, HomeIcon, StarIcon, RectangleGroupIcon, UserIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();


  return (
    <div className="flex h-full sticky top-0 left-0">
      <div
        className={`bg-indigo-950 h-screen ${
          open ? "w-30" : " w-22"
        } duration-300 relative`}
      >
        <div className="flex flex-col">
          <div
            className="inline-flex items-center mt-6 justify-start ml-2"
            onClick={() => navigate("/")}
          >
            <HomeIcon
              className={`text-amber-300 w-4 cursor-pointer block float-left`}
            />
            <p
              className={`text-amber-300 text-md ${!open ? "scale-0" : "ml-4"}`}
            >
              Home
            </p>
          </div>

          <div
            className="inline-flex items-center cursor-pointer justify-start ml-2"
            onClick={() => navigate("/account")}
          >
            <StarIcon
              className={`text-amber-300 cursor-pointer block float-left 
                ${open ? "w-4" : null}`}
            />
            <p
              className={`text-amber-300 text-md ${!open ? "scale-0" : "ml-4"}`}
            >
              Favorites
            </p>
          </div>

          <div
            className={`inline-flex items-center cursor-pointer justify-start ml-2`}
            onClick={() => navigate("/bookList")}
          >
            <RectangleGroupIcon
              className={`text-amber-300 w-4 float-left justify-center`}
            />
            <p
              className={`text-amber-300 text-md ${!open ? "scale-0" : "ml-4"}`}
            >
              Books
            </p>
          </div>

          <div
            onClick={() => navigate("/login")}
            className="inline-flex items-center cursor-pointer justify-start ml-2"
          >
            <UserIcon className={`text-amber-300 text-md w-4`} />
            <button
              className={`text-amber-300 text-md ${!open ? "scale-0" : "ml-4"}`}
            >
              Login
            </button>
          </div>
        </div>
        <ChevronLeftIcon
          className={`text-white w-6 absolute -right-0 bottom-4 cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
      </div>
    </div>
  );
}
