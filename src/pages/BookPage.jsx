import { useParams } from "react-router-dom";
import { useGetBookQuery } from "../components/bookSlice";
import { useCheckOutBookMutation } from "../components/bookReservationSlice";
import { useNavigate } from "react-router-dom";

export default function BookPage() {
  const { id } = useParams();
  const { data } = useGetBookQuery(id);
  const [checkOutBook] = useCheckOutBookMutation(id);

  const navigate = useNavigate();
  console.log(data);

  const handleBookReservation = async (id) => {
    try {
      const response = await checkOutBook(id).unwrap();
      console.log(response);
      navigate("/account");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container ">
      <p className="m-4 p-6 text-6xl font-extrabold tracking-widest text-shadow-lg flex flex-col justify-center">
        Book Details
      </p>
      <div className="">
        <p className="font-bold text-shadow-md">{data?.title}</p>
        <img src={data?.coverimage} alt="" className="h-60 inline px-4" />

        <p className="">
          <span className="font-bold text-shadow-md">Available:</span>{" "}
          {data?.available}
        </p>

        <p className="pb-3 text-2xl ">
          <span className="font-bold text-shadow-md">Author:</span>{" "}
          {data?.author}
        </p>

        <p className="pb-3 text-2xl ">
          <span className="font-bold text-shadow-md">Description:</span>{" "}
          {data?.description}
        </p>
        <div className="flex justify-end ">
          <button
            className="bg-red-800 py-2 px-10 rounded-md text-white"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
