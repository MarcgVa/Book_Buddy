import React,{ useEffect, useState } from 'react'
import { useGetAllBooksQuery } from '../components/bookSlice'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from 'flowbite-react';
import checkedOut from '../assets/CheckedOut.svg'

export default function BookListPage({ token }) {
  const [bookList, setBookList] = useState([]);
  const navigate = useNavigate();
  const { status, isLoading, data } = useGetAllBooksQuery();
  
  const handleViewBook = (id) => {
    token ? navigate(`/book/${id}`) : navigate('/login')
  }

  const handleSearch = (e) => {
    
    if (sessionStorage.getItem("searchOnlyAvailableBooks")) {
      const searchResults = bookList.filter((item) =>
        item.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setBookList(searchResults);
        
    } else {
      const searchResults = data.filter((item) =>
        item.title.toLowerCase().includes(e.target.value.toLowerCase()));
      setBookList(searchResults); 
    }
  };

  const handleAvailableBooksOnly = (e) => {
    if (e.target.checked) {
      sessionStorage.setItem('searchOnlyAvailableBooks', e.target.checked);
      const availableBooksOnly = data.filter((item) => item.available);
      setBookList(availableBooksOnly);
    } else { 
      setBookList(data);
    }
  }

  useEffect(() => {
    if (status.toLowerCase() === 'fulfilled') {
      setBookList(data);
    }
  }, [status]);

  return (
    <div className="container max-w-[1224px] w-[90%]">
      <div className="flex justify-center">
        <p
          className="w-max p-3 text-5xl text-sky-600 font-bold tracking-wider 
        text-shadow-md text-shadow-red-900"
        >
          The Book Buddy Book List{" "}
        </p>
      </div>

      <div className="flex flex-1 justify-center px-2 lg:mr-20 lg:ml-10">
        <div className="grid w-full max-w-lg grid-cols-1 lg:max-w-xs">
          <input
            name="search"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleSearch}
            className="col-start-1 row-start-1 block w-full rounded-md bg-gray-700 py-1.5 pr-3 pl-10 text-base text-white outline-hidden placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:placeholder:text-gray-400 sm:text-sm/6"
          />
          <p
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400"
          >
            <span className="material-icons">search</span>
          </p>
        </div>
        <div className=" flex ml-4 items-center">
          <input
            id="isAvaiable"
            name="isAvailable"
            type="checkbox"
            onChange={(e)=>handleAvailableBooksOnly(e)}
            aria-describedby="available-books"
            className="rounded-sm border border-gray-600 bg-white 
              checked:border-sky-600 checked:bg-sky-600 
             "
          />
          <p className='text-xs ml-2'>Show Only Available Books</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-7 gap-4 m-10">
        {isLoading && <li>Loading books...</li>}
        {bookList.map((book) => (
          <div
            key={book?.id}
            id={book?.id}
            className="flex flex-col justify-center hover:drop-shadow-xl hover:drop-shadow-sky-500"
            onClick={() => handleViewBook(book.id)}
          >
            <div className="relative">
              <img
                src={checkedOut}
                alt=""
                className={`absolute bottom-0.5  ${
                  book?.available ? "hidden" : null
                } z-20`}
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
