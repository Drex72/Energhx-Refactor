import { createContext, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import AdminSignUpCompLarge from "./AdminSignUpCompLarge";
import Header from "../../Components/Header/Header";
import AdminSignUpCompSmall from "./AdminSignUpCompSmall";
import { adminContext } from ".././.././Data/data";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AdminContext = createContext();

export function AdminContextProvider({ children }) {
  const [data, setData] = useState(() =>
    JSON.parse(localStorage.getItem("adminState"))
  );
  const [loading, setLoading] = useState(false)
  const adminToken = localStorage.getItem("BearerToken");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${adminToken}`);
  const [adminInfo, setAdminInfo] = useState(
    JSON.parse(localStorage.getItem("data"))
  );

  useEffect(() => {
    localStorage.setItem("adminState", adminContext?.storage_object);
  }, []);

  return (
    <AdminContext.Provider value={{ data, setData, adminInfo, setAdminInfo, loading,setLoading,myHeaders, adminToken }}>
      {children}
    </AdminContext.Provider>
  );
}

function AdminSignUpForm() {
  return (
    <AdminContextProvider>
      <AdminSignUpFormHelper />
    </AdminContextProvider>
  );
}

function AdminSignUpFormHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, setData, setAdminInfo } = useContext(AdminContext);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(data);
  }, []);
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const sendData = async (e) => {
    e.preventDefault();
    console.log(data);
    const options = {
      url: "https://energyhx-2.herokuapp.com/api/v1/auth/admins",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    };

    axios(options)
      .then((response) => {
        const responseValues = response.data?.data;
        setAdminInfo(responseValues);
        // delete responseValues.token;
        localStorage.setItem("data", JSON.stringify(responseValues));
        navigate("/admin-dashboard");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <motion.div className="bg-[#f3eded] min-h-screen">
      <div className="page-header bg-[#000000] text-[#fff]">
        <Header onOpen={handleIsOpen} isOpen={isOpen} />
      </div>
      <AdminSignUpCompSmall
        AdminData={data}
        setAdminData={setData}
        sendData={sendData}
      />
      <AdminSignUpCompLarge
        AdminData={data}
        setAdminData={setData}
        sendData={sendData}
      />
    </motion.div>
  );
}

export default AdminSignUpForm;
