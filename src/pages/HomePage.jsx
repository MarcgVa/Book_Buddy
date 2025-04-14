import React from 'react'
import logo from '../assets/book_buddy_logo.png'





export default function HomePage() {

  return (
    <div className="container flex flex-col justify-center">
      <div className='flex h-fit w-screen justify-center'>
        <p className="text-9xl font-bold tracking-widest text-sky-600 text-shadow-lg text-shadow-blue-900 ">Welcome</p>
      </div>
      <div className="flex h-fit w-screen mt-10 justify-center items-center">
        <img src={logo} alt=""className="flex rounded-4xl " />
      </div>
    </div>
  );
}
