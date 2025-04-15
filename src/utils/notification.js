
import { toast,Bounce } from "react-toastify";

const notify = (type, message, timeout) => {
  toast(message, {
    type: type,
    position: "top-right",
    autoClose: timeout,
    hideProgressBar: true,
    progress: undefined,
    closeOnClick: true,
    theme: "colored",
    transition: Bounce,
  });
}


export default notify;
    
