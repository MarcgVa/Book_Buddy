import React,{ useEffect, useState } from 'react'
import { useGetAllBooksQuery } from '../components/bookSlice'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from 'flowbite-react';
import checkedOut from '../assets/CheckedOut.svg'

export default function BookListPage({ token }) {
  const [bookList, setBookList] = useState([]);
  const navigate = useNavigate();
  const {status, isLoading, data} = useGetAllBooksQuery();
  
  const handleSearch = (search) => {
    console.log(search.target.value)
  }

  const handleViewBook = (id) => {
    token ? navigate(`/book/${id}`) : navigate('/login')
  }

  useEffect(() => {
    if (status.toLowerCase() === 'fulfilled') {
      setBookList(data);
    }
  }, [status]);

  return (
    <div className="container max-w-[1224px] w-[90%]">
      <div className="flex justify-center">
        <p className="w-max p-3 text-5xl text-indigo-900 font-bold tracking-wider text-shadow-lg text-shadow-indigo-100">
          The Book Buddy Book List{" "}
        </p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-7 gap-4 m-10">
        {isLoading && <li>Loading books...</li>}
        {bookList.map((book) => (
          <div
            key={book?.id}
            id={book?.id}
            className="flex flex-col justify-center hover:drop-shadow-xl hover:drop-shadow-indigo-500"
            onClick={() => handleViewBook(book.id)}
          >
            <div className="relative">
              <img
                src={checkedOut}
                alt=""
                className={`absolute bottom-0.5  ${book?.available ? 'hidden':null} z-20`}
              />
              <img
                src={book?.coverimage}
                alt={book?.title}
                className="size-auto rounded-lg z-10"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
