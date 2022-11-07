import React, { useEffect, useState } from "react";
import UtilityInfoCompSmall from "./UtilityInfoCompSmall";
import UtilityInfoCompBig from "./UtilityInfoCompBig";
import { getAllUtilities } from "../../../Forms/useFetch";
import { Loader } from "../../../Forms/Loader";
import "./utility.css";

function UtilityInfo({ moveForward, moveBackward }) {
  const [utilityObject, setUtilityObject] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let value = localStorage.getItem("userData2");
    !value && moveBackward();
  }, []);
  useEffect(() => {
    const commoditiesSelected = JSON.parse(localStorage.getItem("userData2"));
    const countrySelected = JSON.parse(localStorage.getItem("userData"));
    getAllUtility(commoditiesSelected?.commodity, countrySelected?.country);
  }, []);
  const getAllUtility = (commodities, country) => {
    setLoading(true);
    const utility = [];
    commodities?.map(async (item) => {
      const response = await getAllUtilities(item, country, setLoading);
      utility.push({ name: item, data: response });
      setUtilityObject(utility);
    });
  };
  const [isMobile, setIsMobile] = useState("");
  useEffect(() => {
    if(window.innerWidth < 800){
      setIsMobile(true)
    }else{
      setIsMobile(false)
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {isMobile ? (
            <UtilityInfoCompSmall
              moveForward={moveForward}
              moveBackward={moveBackward}
              utilityObject={utilityObject}
            />
          ) : (
            <UtilityInfoCompBig
              moveForward={moveForward}
              moveBackward={moveBackward}
              utilityObject={utilityObject}
            />
          )}
        </>
      )}
    </>
  );
}

export default UtilityInfo;
