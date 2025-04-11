import React, { useState } from "react"
import { ChevronLeftIcon, HomeIcon, StarIcon, RectangleGroupIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();


  return (
    <div className="flex">
      <div
        className={`bg-indigo-950 h-screen ${
          open ? "w-30" : " w-22"
        } duration-300 relative`}
      >
        <div className="flex flex-col">
          <ChevronLeftIcon
            className={`text-white w-6 absolute -right-0 top-4 cursor-pointer ${
              !open && "rotate-180"
            }`}
            onClick={() => setOpen(!open)}
          />
          <p className="text-indigo-200 text-4xl"></p>

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
                ${open ? "w-4" : null}`
              }
            />
            <p
              className={`text-amber-300 text-md ${!open ? "scale-0" : "ml-4"}`}
            >
              Favorites
            </p>
          </div>

          <div
            className={`inline-flex items-center cursor-pointer justify-start ml-2`}
            onClick={() => navigate("/account")}
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
        </div>
      </div>
    </div>
  );
}
