import React, { useContext, useState } from "react";
import { MdCancel } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { RiSearchFill } from "react-icons/ri";
import StatusMessage from "./StatusMessage";
import { AdminContext } from "./AdminSignUp";
import { useEffect } from "react";
import AddCountryCards from "../AddCountryCards";

const AddStatesAndCommodities = ({ countrySelected, setIsCountrySelected }) => {
  const BASE_URL = "https://energyhx-2.herokuapp.com/api/v1";
  const { adminToken } = useContext(AdminContext);
  const [state, setState] = useState("");
  const [states, setStates] = useState([]);
  const [commodities, setCommodities] = useState([]);
  const [addStates, setAddStates] = useState(false);
  const [danger, setDanger] = useState(false);
  const [message, setMessage] = useState("");
  const [commoditySelected, setCommoditySelected] = useState();
  const [isCommoditySelected, setIsCommoditySelected] = useState(false);
  const [utilities, setUtilities] = useState([]);
  const [utility, setUtility] = useState("");
  const [addUtility, setAddUtility] = useState(false);

  const addNewState = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${adminToken}`);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        name: state,
      }),
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${BASE_URL}/countries/${countrySelected.name}/states`,
        requestOptions
      );
      const responseJson = await response.json();
      setMessage("State Successfully Created");
      setDanger(false);
      setState("");
      setAddStates(false);
      window.location.reload();
    } catch (error) {
      setMessage(error.message);
      console.log(error);
      setDanger(true);
    }
  };
  const addNewUtility = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${adminToken}`);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        country: countrySelected.name,
        utility: [utility],
        commodity: commoditySelected.name,
      }),
      redirect: "follow",
    };

    try {
      const response = await fetch(`${BASE_URL}/utilities/`, requestOptions);
      const responseJson = await response.json();
      console.log(responseJson);
      setMessage("State Successfully Created");
      setDanger(false);
      setUtility("");
      setAddUtility(false);
      // window.location.reload()
    } catch (error) {
      setMessage(error.message);
      console.log(error);
      setDanger(true);
    }
  };
  const getAllStates = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/countries/${countrySelected.name}/states`
      );
      const responseJson = await response.json();
      setStates(responseJson.data?.States_Provinces);
    } catch (error) {
      console.error(error);
    }
  };
  const getAllCommodities = async () => {
    try {
      const response = await fetch(`${BASE_URL}/commodities`);
      const responseJson = await response.json();
      setCommodities(responseJson.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getUtilities = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/commodities/${commoditySelected?.name}/countries/${countrySelected.name}/utilities`
      );
      const responseJson = await response.json();
      setUtilities(responseJson.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllStates();
    getAllCommodities();
  }, []);
  useEffect(() => {
    getUtilities();
    return () => setUtilities([]);
  }, [commoditySelected, isCommoditySelected]);

  return (
    <div>
      <div>
        {/* Info for States Section */}
        <section className="pb-2">
          <button
            onClick={() => setIsCountrySelected(false)}
            className="text-white bg-green-400 px-5 py-3 rounded"
          >
            Go Back
          </button>
          <h1 className="font-bold text-2xl my-[.5em]">
            States for {countrySelected.name}
          </h1>
          <p>
            to add a new States , click on the add button to create more States
          </p>
        </section>
        {/* Status Messages */}
        <StatusMessage statusMessage={message} danger={danger} />
        {/* States Array */}
        <div className="flex flex-wrap gap-6 mb-6">
          {states?.map((building) => (
            <div
              key={building.id}
              className="flex items-center justify-between gap-[.4em] bg-[#fff] py-[.7em] px-[.7em] basis-[30%] max-w-[200px]"
            >
              <p className="basis-[40%]">{building.name}</p>
              <MdCancel />
            </div>
          ))}
        </div>

        {addStates ? (
          <div className="mt-[3em]">
            <div className="border-2 border-black w-[50%] min-w-[300px] max-w-[700px] w-full rounded-[30px] flex gap-[.5em] px-[2em] py-[.7em] items-center mx-[.3em] justify-between">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addNewState();
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
                  placeholder="Enter a State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </form>
              {state && <FaPlusCircle onClick={addNewState} />}
            </div>
          </div>
        ) : (
          <button
            className="text-[1rem] text-[#fff] py-[.8em] px-[1.5em] mt-[1em] md:mt-[0] bg-[#2DAD00] basis-[10%] self-[end] flex items-center gap-[.4em]"
            onClick={() => setAddStates(true)}
          >
            <FaPlusCircle />
            Add
          </button>
        )}
      </div>
      <div className="mt-6">
        {!isCommoditySelected ? (
          <>
            <section className="pb-2">
              <h1 className="font-bold text-2xl my-[.5em]">
                Commodities for {countrySelected.name}
              </h1>
            </section>
            {/* Commodities Messages */}
            <StatusMessage statusMessage={message} danger={danger} />
            <AddCountryCards
              countries={commodities}
              setCountrySelected={setCommoditySelected}
              setIsCountrySelected={setIsCommoditySelected}
            />
          </>
        ) : (
          <div>
            <section className="pb-2">
              <button
                onClick={() => {
                  setIsCommoditySelected(false);
                  setAddUtility(false);
                }}
                className="text-white bg-green-400 px-5 py-3 rounded"
              >
                Go Back to Commodities
              </button>
              <h1 className="font-bold text-2xl my-[.5em]">
                Utilities for {commoditySelected.name}
              </h1>
              <p>
                to add a new Utility , click on the add button to create more
                Utilities
              </p>
            </section>
            {/* Status Messages */}
            <StatusMessage statusMessage={message} danger={danger} />
            {/* States Array */}
            <div className="flex flex-wrap gap-6 mb-6">
              {utilities?.map((singeUtility) => (
                <div
                  key={singeUtility.id}
                  className="flex items-center justify-between gap-[.4em] bg-[#fff] py-[.7em] px-[.7em] basis-[30%] max-w-[200px]"
                >
                  <p className="basis-[40%]">{singeUtility.name}</p>
                  <MdCancel />
                </div>
              ))}
            </div>
            {addUtility ? (
              <div className="mt-[3em]">
                <div className="border-2 border-black w-[50%] min-w-[300px] max-w-[700px] w-full rounded-[30px] flex gap-[.5em] px-[2em] py-[.7em] items-center mx-[.3em] justify-between">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      addNewUtility();
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
                      placeholder="Enter an Utility"
                      value={utility}
                      onChange={(e) => setUtility(e.target.value)}
                      required
                    />
                  </form>
                  {state && <FaPlusCircle onClick={addNewUtility} />}
                </div>
              </div>
            ) : (
              <button
                className="text-[1rem] text-[#fff] py-[.8em] px-[1.5em] mt-[1em] md:mt-[0] bg-[#2DAD00] basis-[10%] self-[end] flex items-center gap-[.4em]"
                onClick={() => setAddUtility(true)}
              >
                <FaPlusCircle />
                Add
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddStatesAndCommodities;
