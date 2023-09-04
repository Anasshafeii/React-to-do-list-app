import { createContext, useState, useContext } from "react";
import SnackBar from "../Components/SnackBar";
const SnackBarContext = createContext();

export const SnackBarProvider = ({ children }) => {
  const [openToast, setOpenToast] = useState(false);
  const [message, setMessage] = useState("");

  function showToast(message) {
    setOpenToast(true);
    setMessage(message);
    setTimeout(() => {
      setOpenToast(false);
    }, 2000);
  }
  return (
    <>
      <SnackBarContext.Provider value={showToast}>
        <SnackBar openToast={openToast} message={message} />
        {children}
      </SnackBarContext.Provider>
    </>
  );
};

export const useSnackBar = () => {
  return useContext(SnackBarContext);
};
