import { useParams } from "react-router-dom";
import {
  useCheckOutBookMutation,
  useGetBookQuery,
} from "../services/bookService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import book from "../assets/book.png";
import { Bounce, ToastContainer, toast } from "react-toastify";


export default function BookPage({ token }) {
  const { bookid } = useParams();
  const { data } = useGetBookQuery(bookid);
  const [checkOutBook] = useCheckOutBookMutation();
  const navigate = useNavigate();

  const notify = (type, message) => {
    toast(message, {
        type: type,
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        progress: undefined,
      closeOnClick: true,
        theme: "colored",
        transition: Bounce,
      });
    
  }

  const handleBookReservation = async (bookid) => {
    try {
      const response = await checkOutBook(bookid).unwrap();

      if (response) {
        notify('success', 'Book was successfully reserved');
      }
    } catch (error) {
       notify("warning", "Book was not reserved");  
      notify(error.message);
    }
  };

  useEffect(() => {
    !token ? navigate("/login") : null;
  }, []);

  return (
    <div className="container ml-20 bg-white h-full w-full ">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={true}
      />
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
        <div
          className="flex absolute 
              lg:top-20 lg:left-86 md:top-20 md:left-50"
        >
          <div className="flex flex-col lg:w-95 md:w-50 sm:w-20 sm:text-[9pts]">
            <p className="pt-30 text-2xl ">
              <span className="font-bold text-shadow-md mr-5">Author:</span>
              {data?.author}
            </p>

            <p className="py-10 text-2xl h-90 overflow-scroll">
              <span className="font-bold text-shadow-md mr-5">
                Description:
              </span>
              {data?.description}
            </p>
          </div>

          <div
            className="flex flex-col w-100 absolute 
                  lg:left-100 lg:top-20 md:left-25 md:top-25
                  items-center justify-center py-10 px-15"
          >
            <img src={data?.coverimage} alt="" className="w-40 items-center" />
            <button
              className={`mt-5 py-2 px-10 rounded-md
             text-white drop-shadow-2xl drop-shadow-indigo-100
              ${!data?.available ? "disabled bg-gray-600" : "bg-indigo-800"}`}
              onClick={() => {
                data?.available ? handleBookReservation(bookid) : null;
              }}
            >
              {data?.available ? "Reserve Book" : "Checked Out"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
