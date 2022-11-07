import React, { useContext, useState } from "react";
import { MdCancel } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { RiSearchFill } from "react-icons/ri";
import StatusMessage from "./StatusMessage";
import { AdminContext } from "./AdminSignUp";

const SelectedBuilding = ({ selectedBuilding, setIsBuildingSelected }) => {
  const BASE_URL = "https://energyhx-2.herokuapp.com/api/v1/buildings/subtypes";
  const { adminToken } = useContext(AdminContext);
  const subBuildings = selectedBuilding.envelope_sub_types;
  const [addSubBuilding, setAddSubBuilding] = useState(false);
  const [subBuilding, setSubBuilding] = useState("");
  const [danger, setDanger] = useState(false);
  const [message, setMessage] = useState("");

  const addSubBuildings = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${adminToken}`);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        building: selectedBuilding.name,
        subType: subBuilding,
      }),
      redirect: "follow",
    };
    try {
      const response = await fetch(BASE_URL, requestOptions);
      const responseJson = await response.json();
      setMessage("Sub Building Successfully Created");
      setDanger(false);
      setSubBuilding("");
      setAddSubBuilding(false);
      window.location.reload()
    } catch (error) {
      setMessage(error.message);
      console.log(error);
      setDanger(true);
    }
  };

  return (
    <div>
      <section className="pb-10">
        <button onClick={() => setIsBuildingSelected(false)} className="text-white bg-green-400 px-5 py-3 rounded">Go Back</button>
        <h1 className="font-bold text-2xl my-[.5em]">
          Sub Buildings for {selectedBuilding.name}
        </h1>
        <p>
          To add new Sub Building, click on the add button to create more Sub
          Buildings
        </p>
      </section>
      <StatusMessage statusMessage={message} danger={danger} />
      <div className="flex flex-wrap gap-6 mb-8">
        {subBuildings?.map((building) => (
          <div
            key={building.id}
            className="flex items-center justify-between gap-[.4em] bg-[#fff] py-[1em] px-[1em] basis-[30%] max-w-[200px]"
          >
            <p className="basis-[40%]">{building.name}</p>
            <MdCancel />
          </div>
        ))}
      </div>

      {addSubBuilding ? (
        <div className="mt-[3em]">
          <div className="border-2 border-black w-[50%] min-w-[300px] max-w-[700px] w-full rounded-[30px] flex gap-[.5em] px-[2em] py-[.7em] items-center mx-[.3em] justify-between">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addSubBuildings();
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
                placeholder="Enter a Sub Building"
                value={subBuilding}
                onChange={(e) => setSubBuilding(e.target.value)}
                required
              />
            </form>
            {subBuilding && <FaPlusCircle onClick={addSubBuildings} />}
          </div>
        </div>
      ) : (
        <button
          className="text-[1rem] text-[#fff] p-[1.4em] mt-[1em] md:mt-[0] bg-[#2DAD00] basis-[10%] self-[end] flex items-center gap-[.4em]"
          onClick={() => setAddSubBuilding(true)}
        >
          <FaPlusCircle />
          Add
        </button>
      )}
    </div>
  );
};

export default SelectedBuilding;
