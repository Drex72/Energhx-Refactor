import React, { useContext, useState } from "react";
import { useEffect } from "react";
import PageHeader from "./PageHeader";
import { MdCancel } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { RiSearchFill } from "react-icons/ri";
import { AdminContext } from "./AdminSignUp";
import StatusMessage from "./StatusMessage";

const AddCommodity = () => {
  const BASE_URL = "https://energyhx-2.herokuapp.com/api/v1/commodities";
  const [commodities, setCommodities] = useState([]);
  const [addCommodity, setAddCommodity] = useState(false);
  const [singleCommodity, setSingleCommodity] = useState("");
  const [danger, setDanger] = useState(false);
  const [message, setMessage] = useState("");

  const { adminToken } = useContext(AdminContext);
  const getCommodities = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(BASE_URL, requestOptions)
      .then((response) => response.json())
      .then((result) => setCommodities(result.data))
      .catch((error) => console.log("error", error));
  };
  const addCommodityToDatabase = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${adminToken}`);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        name: singleCommodity,
      }),
      redirect: "follow",
    };
    try {
      const response = await fetch(BASE_URL, requestOptions);
      const responseJson = await response.json();
      setMessage("Commodity Successfully Created");
      setDanger(false);
      setSingleCommodity("");
      setAddCommodity(false);
      console.log(responseJson, response);
    } catch (error) {
      setMessage(error.message);
      console.log(error);
      setDanger(true);
    }
  };
  useEffect(() => {
    getCommodities();
  });
  return (
    <div>
      <section className="pb-10">
        <PageHeader />
        <h1 className="font-bold text-2xl my-[.5em]">Commodities</h1>
        <p>
          To add new commodity, click on the add button to create more
          commodities
        </p>
      </section>
      <div className="flex flex-wrap gap-6 mb-8">
        {commodities?.map((commodity) => (
          <div
            key={commodity.id}
            className="flex items-center justify-between gap-[.4em] bg-[#fff] py-[1em] px-[1em] basis-[30%] max-w-[200px]"
          >
            <p className="basis-[40%]">{commodity.name}</p>
            <MdCancel />
          </div>
        ))}
      </div>
      <StatusMessage statusMessage={message} danger={danger} />

      {addCommodity ? (
        <div className="mt-[3em]">
          <div className="border-2 border-black w-[50%] min-w-[300px] max-w-[700px] w-full rounded-[30px] flex gap-[.5em] px-[2em] py-[.7em] items-center mx-[.3em] justify-between">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addCommodityToDatabase();
              }}
              className="flex gap-[1.4em] items-center w-full"
            >
              <label htmlFor="search-box">
                <RiSearchFill />
              </label>
              <input
                type="text"
                id="search-box"
                className="border-none outline-none w-[100%] bg-transparent flex-2"
                placeholder="Enter a Commodity"
                value={singleCommodity}
                onChange={(e) => setSingleCommodity(e.target.value)}
                required
              />
            </form>
            {singleCommodity && (
              <FaPlusCircle onClick={addCommodityToDatabase} />
            )}
          </div>
        </div>
      ) : (
        <button
          className="text-[1rem] text-[#fff] p-[1.4em] mt-[1em] md:mt-[0] bg-[#2DAD00] basis-[10%] self-[end] flex items-center gap-[.4em]"
          onClick={() => setAddCommodity(true)}
        >
          <FaPlusCircle />
          Add
        </button>
      )}
    </div>
  );
};

export default AddCommodity;
