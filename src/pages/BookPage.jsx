import { useParams } from "react-router-dom";
import { useGetBookQuery } from "../components/bookSlice";
import { useCheckOutBookMutation } from "../components/bookReservationSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
    <div className="container ml-20">
      <div>
        <p
          className="m-4 mt-10 
          text-6xl font-extrabold tracking-widest
          text-shadow-lg text-shadow-indigo-200
          text-center"
        >
          {data?.title}
        </p>
        <p className="text-9xl flex flex-col items-center
        ">{data?.available}</p>
      </div>

      <div className="flex">
        <div className="flex flex-col w-200">

          <p className="pt-30 text-2xl ">
            <span className="font-bold text-shadow-md mr-5">Author:</span>
            {data?.author}
          </p>

          <p className="py-10 text-2xl ">
            <span className="font-bold text-shadow-md mr-5">Description:</span>
            {data?.description}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center py-10 px-15">
          <img src={data?.coverimage} alt="" className="h-100" />
          <button className="bg-indigo-800 mt-5 py-2 px-10 rounded-md
             text-white drop-shadow-2xl drop-shadow-indigo-100"
            onClick={()=>handleBookReservation(bookid)}
          >
            Reserve Book
          </button>
        </div>
      </div>
    </div>
  );
}
