/** @format */

import { createContext, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import InternSignUpCompSmall from "../src/InternStuff/InternSignUpCompSmall";
import Header from "../Header/Header";
import InternSignUpCompLarge from "../src/InternStuff/InternSignUpCompLarge";
import { AiFillCaretRight } from "react-icons/ai";
import style from "../../Components/src/UserStuff/Form.module.css";
import { getAllCountries, getAllInterests, getAllStates } from "./useFetch";
import { useRef } from "react";
import { Loader } from "./Loader";

export const InternContext = createContext();

export function InternContextProvider({ children }) {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("state")) ?? null
  );

  useEffect(() => {
    console.log(data);
    localStorage.setItem("state", JSON.stringify(data));
  }, [data]);

  return (
    <InternContext.Provider value={{ data, setData }}>
      {children}
    </InternContext.Provider>
  );
}

export default function InternSignUpFormHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [interests, setInterests] = useState([]);
  const [isMobile, setIsMobile] = useState("");
  const [countries, setCountries] = useState([]);
  const [province, setprovince] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [provinceLoading, setProvinceLoading] = useState(false);
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
  const getInterests = async () => {
    const response = await getAllInterests(setLoading);
    setInterests(response);
  };
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    getInterests();
  }, []);
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
            <InternSignUpCompSmall
              province={province}
              countries={countries}
              setSelectedCountry={setSelectedCountry}
              selectedCountry={selectedCountry}
              provinceLoading={provinceLoading}
              interests={interests}
            />
          ) : (
            <InternSignUpCompLarge
              province={province}
              countries={countries}
              setSelectedCountry={setSelectedCountry}
              selectedCountry={selectedCountry}
              provinceLoading={provinceLoading}
              interests={interests}
            />
          )}
        </>
      )}
    </motion.div>
  );
}

export const InternDropdown = ({
  text,
  data,
  field,
  setData,
  itemList,
  nameChange,
  customFunc,
  dependency,
  value,
  labelText,
  margin,
}) => {
  useEffect(() => {
    if (window.innerWidth < 800) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [window.innerWidth]);
  const [isMobile, setIsMobile] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [displayValue, setDisplayValue] = useState("");

  const toggleDropdown = () => {
    setOpen(!isOpen);
    
  };
  useEffect(() => {
    setSelectedItem("");
    setDisplayValue(labelText ?? `Choose your ${text}`);
    setData({ ...data, [nameChange]: "" });
  }, [dependency]);

  const handleItemClick = (selectedElement) => {
    setSelectedItem(selectedElement);
    setDisplayValue(selectedElement.name);
    setData({
      ...data,
    });
  };
  const labelRenderer = () => {
    if (selectedItem?.name) {
      setDisplayValue(selectedItem?.name);
    } else if (value !== "") {
      setDisplayValue(value);
      setData({
        ...data,
        [nameChange]: value,
      });
    } else {
      setDisplayValue(`Choose ${field}`);
    }
  };
  useEffect(() => {
    labelRenderer();
  }, []);
  const [dropDownHeight, setDropDownHeight] = useState();
  const divRef = useRef();
  useEffect(() => {
    setDropDownHeight(parseInt(divRef.current.clientHeight));
  }, [isOpen]);
  return (
    <div className={`${margin ? "md:m-0 mt-7" : ""}`}>
      <div className="rounded-[5px] py-[.5em] px-[.5em] bg-[#2DAD00] relative border-[.2px] border-[#112518]  ">
        <div
          className="flex items-center justify-between px-[1em] text-[#fff] cursor-pointer  "
          onClick={toggleDropdown}>
          Add
          <AiFillCaretRight
            className={`${style.icon} text-[white] ${isOpen && style.open}`}
          />
        </div>
        <div
          ref={divRef}
          style={{ top: `-${dropDownHeight}px` }}
          className={`${
            style.dropdownBody
          } absolute bg-[white] max-h-[500px] max-w-[400px] w-[250px] ${
            !isMobile && "left-[-50%]"
          } rounded-[10px] overflow-y-scroll text-[black] text-[.9rem]   ${
            isOpen && style.open
          }`}>
          {itemList?.length === 0 || !itemList ? (
            <div
              className={style.dropdownItem}
              children={`No ${text} found`}
              onClick={toggleDropdown}
            />
          ) : (
            itemList?.map((item, index) => (
              <div
                key={index}
                className={style.dropdownItem}
                onClick={() => {
                  handleItemClick(item);
                  toggleDropdown();
                  customFunc && customFunc(item.name);
                }}
                children={item.name}
                id={item.id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
