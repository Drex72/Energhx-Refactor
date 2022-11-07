/** @format */

import { createContext, useContext, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import UserSignUpCompSmall from "../src/UserStuff/UserSignUpCompSmall";
import Header from "../Header/Header";
import UserSignUpCompLarge from "../src/UserStuff/UserSignUpCompLarge";
import { checkIfCompleted, getAllCountries, getAllStates } from "./useFetch";
import { Loader } from "./Loader";
import "./userSignup.css";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [moveForward, setMoveForward] = useState();
  useEffect(() => {
    console.log(data);
    localStorage.setItem("state", JSON.stringify(data));
  }, [data]);
  return (
    <UserContext.Provider
      value={{ data, setData, moveForward, setMoveForward }}>
      {children}
    </UserContext.Provider>
  );
}

export default function UserSignUpFormHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [province, setprovince] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [provinceLoading, setProvinceLoading] = useState(false);
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const getVal = async () => {
      setLoading(true);
      const resp = await getAllCountries(setLoading);
      setCountries(resp);
    };
    getVal();
  }, []);
  useEffect(() => {
    const getprovince = async () => {
      setProvinceLoading(true);
      const resp = await getAllStates(selectedCountry, setProvinceLoading);
      setprovince(resp);
    };

    selectedCountry && getprovince();
  }, [selectedCountry]);
  const [isMobile, setIsMobile] = useState("");
  useEffect(() => {
    if (window.innerWidth < 800) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [window.innerWidth]);

  return (
    <motion.div className="bg-[#f3eded] min-h-screen">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="page-header bg-[#000000] text-[#fff]">
            <Header onOpen={handleIsOpen} isOpen={isOpen} />
          </div>
          {isMobile ? (
            <UserSignUpCompSmall
              province={province}
              countries={countries}
              setSelectedCountry={setSelectedCountry}
              selectedCountry={selectedCountry}
              provinceLoading={provinceLoading}
            />
          ) : (
            <UserSignUpCompLarge
              province={province}
              countries={countries}
              setSelectedCountry={setSelectedCountry}
              selectedCountry={selectedCountry}
              provinceLoading={provinceLoading}
            />
          )}
        </>
      )}
    </motion.div>
  );
}
