import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: "TestTest@example.com",
    mobile: "123456789",
    name: "TestUser",
    _id: "TestID",
  });
  const [token, setToken] = useState("TestToken");
  const navigateTo = useNavigate();

  const [fetchAgain, setFetchAgain] = useState(false);

  useEffect(() => {
    console.log("AdminProvider: fetchAgain:", fetchAgain);
    // Set initial user and token from local storage
    setToken((prev) => {
      const token = JSON.parse(localStorage.getItem("token"));
      return token ? token : "TestToken";
    });
    setUser((prev) => {
      const user = JSON.parse(localStorage.getItem("User"));
      return user
        ? user
        : {
            email: "TestTest@example.com",
            mobile: "123456789",
            name: "TestUser",
            _id: "TestID",
          };
    });
  }, [fetchAgain]);

  useEffect(() => {
    // Redirect to auth page if user is not logged in
    if (!user) {
      navigateTo("/auth");
    }
  }, [navigateTo, user]);

  return (
    <AdminContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        setFetchAgain,
        fetchAgain,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const AdminState = () => {
  return useContext(AdminContext);
};

export default AdminProvider;
