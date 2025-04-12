import React,{ useEffect, useState } from 'react'
import { useGetAllBooksQuery } from '../components/bookSlice'
import { useNavigate } from 'react-router-dom'


export default function BookListPage() {
  const [bookList, setBookList] = useState([]);

  const {status, isLoading, data} = useGetAllBooksQuery();
  
  const handleSearch = (search) => {
    console.log(search.target.value)
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
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-4 m-10">
        {isLoading && <li>Loading books...</li>}
        {bookList.map((book) => (
          <div key={book.id} className="flex justify-center hover:drop-shadow-xl hover:drop-shadow-indigo-500">
            <img src={book.coverimage} alt={book.title} className="size-auto rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
