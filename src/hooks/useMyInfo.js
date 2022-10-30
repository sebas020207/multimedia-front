import { useContext } from "react";
import { UserContext } from "../components/UserProvider";

const useMyInfo = () => {
  const { user, userImageUrl } = useContext(UserContext);
  return { ...user, userImageUrl };
};

export default useMyInfo;
