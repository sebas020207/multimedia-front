import { useContext } from "react";
import { AlertContext, on } from "../components/AlertProvider";

const useAlert = () => {
  const {  setMessage, setShow } = useContext(AlertContext);

  const openAlert = (message = "") => {
    if (!message) return false;
    return new Promise((resolve, reject) => {
      setMessage(message);
      setShow(true);
      on("accept", () => resolve(true));
      on("cancel", () => resolve(false));
    });
  };

  return { openAlert };
};

export default useAlert;
