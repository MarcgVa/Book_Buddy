import React, { useState } from "react";
import logo from "../assets/book_buddy_logo.png";
import { useLoginMutation } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const handleSubmit = async (submit) => {
    submit.preventDefault();

    const response = await login(loginData).unwrap();
    if (response) {
      navigate("/");
    }
  };

  const handleUpdate = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Book Buddy Library"
            src={logo}
            className="mx-auto size-20 w-auto rounded-2xl"
          />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
                  onChange={handleUpdate}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
                  onChange={handleUpdate}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold
                 text-blue-400 shadow-xs hover:bg-red-700 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-red-900"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* Registration  */}
          <div className="flex-col w-100 justify-center items-center mt-2">
            <p className="flex w-100 justify-center pt-3 text-sm">
              Don't have an account?{" "}
            </p>
            <div
              className="flex m-auto justify-center cursor-pointer w-25
              text-xs text-center text-white text-shadow-xs text-shadow-blue-900
              bg-linear-to-r from-blue-400 from-35% to-red-700 rounded-md"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
