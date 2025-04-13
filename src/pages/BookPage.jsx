import { useParams } from "react-router-dom";
import { useGetBookQuery } from "../components/bookSlice";
import { useCheckOutBookMutation } from "../components/bookReservationSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import book from "../assets/book.png";

export default function BookPage({ token }) {
  const { bookid } = useParams();
  console.log('bookid', bookid);
  const { data } = useGetBookQuery(bookid);
  const [checkOutBook] = useCheckOutBookMutation();
  const navigate = useNavigate();

  const handleBookReservation = async (bookid) => {
    try {
      const response = await checkOutBook(bookid).unwrap();
      console.log('response',response);
      navigate("/account");
    } catch (error) {
      console.error(error.message);
    }
  }; 

  useEffect(() => {
    !token ? navigate('/login'): null
  }, [])
  

  return (
    <div className="container ml-20 bg-white h-full w-full ">
      <div>
        <p
          className="m-4 mt-10 
          text-6xl font-extrabold tracking-widest
          text-shadow-lg text-shadow-indigo-200
          text-center"
        >
          {data?.title}
        </p>
      </div>
      <div className=" relative h-full w-full  bg-white">
        <img src={book} alt="" className=" h-[900px] w-full p-0 m-0 " />
        <div className="flex absolute top-20 left-86">
          <div className="flex flex-col w-95">
            <p className="pt-30 text-2xl ">
              <span className="font-bold text-shadow-md mr-5">Author:</span>
              {data?.author}
            </p>

            <p className="py-10 text-2xl ">
              <span className="font-bold text-shadow-md mr-5">
                Description:
              </span>
              {data?.description}
            </p>
          </div>

          <div className="flex flex-col w-100 absolute left-100 top-20 items-center justify-center py-10 px-15">
            <img src={data?.coverimage} alt="" className="h-100" />
            <button
              className={`mt-5 py-2 px-10 rounded-md
             text-white drop-shadow-2xl drop-shadow-indigo-100
              ${!data?.available ? 'disabled bg-gray-600': 'bg-indigo-800'}`}
              onClick={() =>{data?.available ? handleBookReservation(bookid): null}}
            >
              {data?.available ? 'Reserve Book': 'Checked Out'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
