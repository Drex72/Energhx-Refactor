import React, { useState, useEffect, useContext } from "react";
import { Card, Title, Text, Tab, TabList, ColGrid, Block } from "@tremor/react";

import TableView from "./TableView";
import PageHeader from "./PageHeader";
import KpiCardGrid from "./KpiCardGrid";

import { loginToken } from "./AdminLogin";
import { AdminContext } from "./AdminSignUp";
import AdminModal from "./AdminModal";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const { myHeaders } = useContext(AdminContext);
  const [allUserCategories, setAllUserCategories] = useState([]);

  const usersHeader = new Headers();
  usersHeader.append("Authorization", `Bearer ${loginToken}`);

  const getDashboard = async () => {
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
    return () => setData([])
  }, []);
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState([]);
  

  return (
    <>
      <PageHeader />
      <main>
        <Title>Overview</Title>
        {
          <>
            <KpiCardGrid />
            <TableView
              setModalIsOpen={setModalIsOpen}
              statusMessage={statusMessage}
              setStatusMessage={setStatusMessage}
              users={users}
              setData={setData}
            />
            {isModalOpen && data?.length !== 0 && (
              <>
                <AdminModal userData={data} setModalIsOpen={setModalIsOpen} />
              </>
            )}
          </>
        }
      </main>
    </>
  );
};

export default Home;
