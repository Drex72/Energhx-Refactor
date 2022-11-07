import React, { useContext } from "react";
import { MdCancel } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import PageHeader from "./PageHeader";
import { RiSearchFill } from "react-icons/ri";
import { useState } from "react";
import AddBuildingCards from "../AddBuildingCards";
import { useEffect } from "react";
import SelectedBuilding from "./SelectedBuilding";
import StatusMessage from "./StatusMessage";
import { AdminContext } from "./AdminSignUp";

const AddBuilding = () => {
  const [buildingSelected, setBuildingSelected] = useState("");
  const [isBuildingSelected, setIsBuildingSelected] = useState(false);
  const [allBuildings, setAllBuildings] = useState([]);
  const [building, setBuilding] = useState("");
  const [addBuilding, setAddBuilding] = useState(false);
  const [danger, setDanger] = useState(false);
  const [message, setMessage] = useState("");
  const { adminToken } = useContext(AdminContext);
  const BASE_URL = "https://energyhx-2.herokuapp.com/api/v1/buildings"

  const getAllBuildings = async () => {
    try {
      const response = await fetch(
        BASE_URL
      );
      const responseJson = await response.json();
      setAllBuildings(responseJson.data);
    } catch (error) {
      console.group(error);
    }
  };
  const createNewBuilding = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${adminToken}`);
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        name: building
      }),
      redirect: "follow",
    };

    try {
      const response = await fetch(BASE_URL, requestOptions);
      const responseJson = await response.json();
      setMessage("Building Successfully Created");
      setDanger(false);
      setBuilding("");
      setAddBuilding(false);
      console.log(responseJson, response);
    } catch (error) {
      setMessage(error.message);
      console.log(error);
      setDanger(true);
    }
  };
  useEffect(() => {
    getAllBuildings();
  }, [message]);

  return (
    <div>
      <PageHeader />
      {isBuildingSelected ? (
        <SelectedBuilding selectedBuilding={buildingSelected} setIsBuildingSelected={setIsBuildingSelected} />
      ) : (
        <>
          <section className="pb-10">
            <h1 className="font-bold text-2xl my-[.5em]">Building Evelopes</h1>
            <p>
              To add new buildings evelope, click on the add button to create
              more building envelopes or to add a sub type for a building, click
              on the building
            </p>
          </section>
          <StatusMessage statusMessage={message} danger={danger} />

          <AddBuildingCards
            buildings={allBuildings}
            setBuildingSelected={setBuildingSelected}
            setIsBuildingSelected={setIsBuildingSelected}
          />

          {addBuilding ? (
            <div className="mt-[3em]">
              <div className="border-2 border-black w-[50%] min-w-[300px] max-w-[700px] w-full rounded-[30px] flex gap-[.5em] px-[2em] py-[.7em] items-center mx-[.3em] justify-between">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    createNewBuilding();
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
                    placeholder="Enter a Building"
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                    required
                  />
                </form>
                {building && <FaPlusCircle onClick={createNewBuilding} />}
              </div>
            </div>
          ) : (
            <button
              className="text-[1rem] text-[#fff] p-[1.4em] mt-[1em] md:mt-[0] bg-[#2DAD00] basis-[10%] self-[end] flex items-center gap-[.4em]"
              onClick={() => setAddBuilding(true)}
            >
              <FaPlusCircle />
              Add
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default AddBuilding;
