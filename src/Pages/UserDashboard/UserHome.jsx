import React, { useState } from "react";
import { Card, Title, Text, Tab, TabList, ColGrid, Block } from "@tremor/react";
import { useContext, useEffect} from "react";



import UserTableView from "./UserTableView";
import UserPageHeader from "./UserPageHeader";
import UserKpiCardGrid from "./UserKpiCardGrid";


const UserHome = () => {
 const [users, setUsers] = useState([]);
 const [statusMessage, setStatusMessage] = useState("");
 const [allUserCategories, setAllUserCategories] = useState([]);

  const getDashboard = async () => {
   var myHeaders = new Headers()
   var requestOptions = {
     method: "GET",
     headers: myHeaders,
     redirect: "follow",
   };
   try {
     const response = await fetch(
       "https://energyhx-2.herokuapp.com/api/v1/admins/unverified_users",
       requestOptions
     );
     const responseJson = await response.json();
     console.log(responseJson);
     setUsers(responseJson.data);
   } catch (error) {
     console.log(error);
   }
 };

 useEffect(() => {
   getDashboard();
   setTimeout(() => setStatusMessage(""), 5000);
   return () => setData([]);
 }, []);
 const [isModalOpen, setModalIsOpen] = useState(false);
 const [data, setData] = useState([]);
  
  
  return (
    <>
      <UserPageHeader />
      <main>
        <UserTableView
          setModalIsOpen={setModalIsOpen}
          statusMessage={statusMessage}
          setStatusMessage={setStatusMessage}
          users={users}
          setData={setData}
        />
      </main>
    </>
  );
};

export default UserHome;
