// import React from "react";

// function AdminLogin() {
//   const handleLogin = async () => {
//     // Send POST Request
//     // ......

//     const response = await fetch(
//       "https://energyhx-2.herokuapp.com/api/v1/admins"
//     );
    
//     const responseJson = await response.json();
//     const user = responseJson.data.filter(
//       (admin) => admin.email === user.email
//     );
//   };
//   return  
// }

// export default AdminLogin;

import { createContext, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import AdminLogInCompLarge from "./AdminLogInCompLarge";
import Header from "../../Components/Header/Header";
import AdminLogInCompSmall from "./AdminLogInCompSmall";
import { adminLoginContext } from ".././.././Data/data";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AdminContext = createContext();

export let loginToken;

export function AdminContextProvider({ children }) {
  const [data, setData] = useState(() =>
    JSON.parse(localStorage.getItem("adminState"))
  );
  const [adminInfo, setAdminInfo] = useState(
    JSON.parse(localStorage.getItem("data"))
  );
  const [auth, setAuth] = useState(true)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    localStorage.setItem("adminState", adminLoginContext?.storage_object);
  }, []);

  return (
    <AdminContext.Provider value={{ data, setData, adminInfo, setAdminInfo, setAuth, auth, formError, setFormError }}>
      {children}
    </AdminContext.Provider>
  );
}

function AdminLoginForm() {
  return (
    <AdminContextProvider>
      <AdminLogInFormHelper />
    </AdminContextProvider>
  );
}

function AdminLogInFormHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, setData, setAdminInfo, adminInfo,auth, setAuth, formError, setFormError } = useContext(AdminContext);
  
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(data);
  }, []);
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const sendData = async (e) => {
    e.preventDefault();
    const options = {
      url: "https://energyhx-2.herokuapp.com/api/v1/auth/admins/login",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    };

    axios(options)
      .then((response) => {
        // console.log(data);
        const responseValues = response.data?.data;
        setAdminInfo(responseValues);
        console.log(response)
        // delete responseValues.token;
        loginToken = responseValues.token
        localStorage.setItem('BearerToken', responseValues.token)
        localStorage.setItem("data", JSON.stringify(responseValues));
        // console.log(auth)
        console.log(setAuth(true))
        navigate("/admin-dashboard");
        // console.log(response)
      })
      .catch((err) => {
        console.log(err.message)
        setFormError(err.response.data.message);
      });
  };

  return (
    <motion.div className="bg-[#f3eded] min-h-screen">
      <div className="page-header bg-[#000000] text-[#fff]">
        <Header onOpen={handleIsOpen} isOpen={isOpen} />
      </div>
      <AdminLogInCompSmall
        AdminData={data}
        setAdminData={setData}
        sendData={sendData}
        formError={formError}
      />
      <AdminLogInCompLarge
        AdminData={data}
        setAdminData={setData}
        sendData={sendData}
        formError={formError}
      />
    </motion.div>
  );
}

export default AdminLoginForm;

