import React, { useState, createContext, useEffect, useMemo } from "react";
import useAxios from "../hooks/useAxios";

const defaultUser = {
  name: "",
  email: "",
  address: "",
  last_name: "",
  phone: "",
  role: false,
};

export const UserContext = createContext(defaultUser);

const UserProvider = (props) => {
  const { get } = useAxios();
  const [user, setUser] = useState(defaultUser);
  const [userImageUrl, setUserImageUrl] = useState([]);

  useEffect(() => {
    getMyInfo();
  }, []);

  const getMyInfo = async () => {
    try {
      const response = await get("/admin/my_info");
      if (response.data && response.data.id) {
        setUser({ ...user, ...response.data });
        getImage(response.data.id);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const getImage = async (userId) => {
    if (!userId) return;
    try {
      const response = await get(`/admin/user/images/${userId}`, {
        responseType: "blob",
      });
      if (response.data) {
        setUserImageUrl(URL.createObjectURL(response.data));
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const value = useMemo(() => ({ userImageUrl, user }), [userImageUrl, user]);

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;
