import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { AiFillCaretRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../Forms/Loader";
import {
  checkIfCompleted,
  getAllCommodities,
  getBuildingsAndSubtypes,
} from "../../Forms/useFetch";
import BulbAccomplished from "../assets/Bulb-Accomplished.png";
import style from "./Form.module.css";

const Form1 = ({ moveForward, moveBackward }) => {
  const [selectedEnvelope, setSelectedEnvelope] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState([]);
  const [subEnvelopes, setSubEnvelopes] = useState([]);
  const [envelopes, setEnvelopes] = useState([]);
  const [message, setMessage] = useState("");
  const [commodities, setCommodities] = useState([]);
  const [data, setData] = useState(JSON.parse(localStorage.getItem('userData2')) ?? {
    envelope: "",
    envelope_sub: "",
    occupantNumber: "",
    commodity: [],
  });
  useEffect(() => {
    const getBuilding = async () => {
      setLoading(true);
      const envelope = await getBuildingsAndSubtypes(setLoading);
      const commodity = await getAllCommodities(setLoading);
      setCommodities(commodity);
      setEnvelopes(envelope);
    };
    getBuilding();
    let value = localStorage.getItem("userData");
    !value && navigate("/energy-user");
  }, []);

  useEffect(() => {
    const selectedBuildingsObject = envelopes.filter(
      (building) => building.name === data.envelope
    );
    setSubEnvelopes(selectedBuildingsObject[0]?.envelope_sub_types);
  }, [data.envelope]);

  /**
   * Validates the Form to make sure everything is filled before moving onto the next page
   * @param {*} e
   */
  const handlePageMove = () => {
    // e.preventDefault();
    const statusAll = checkIfCompleted(data);
    if (!statusAll.status) {
      localStorage.setItem("userData2", JSON.stringify(data));
      moveForward();
    } else {
      setMessage(statusAll.dataNotCompleted, "is not Filled");
    }
  };
  useEffect(() => {
    const state = checkIfCompleted(data);
    setDisabled(state.status);
  }, [data]);
  useEffect(() => {
    setTimeout(() => setMessage(""), 3000);
  }, [message]);

  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={`form-container  ${style.formContainer}`}>
          <div>
            <div className={style.heading}>
              <h2 className={style.formOneHeading}>UTILITY SELECTION</h2>
              <p className={style.formOneWelcome}>
                Welcome to our secure service activation centre!{" "}
                <span className={style.breakSentence}>
                  <br />
                </span>
                Congratulations for choosing to monitor your energy consumption
                with EnerghxPlus.
              </p>
            </div>
            <p className={style.formOneText}>
              <img src={BulbAccomplished} alt="bulb" />
              <span
                className={`${style.formOneWelcome}`}
                style={{ color: "#2DAD00" }}
              >
                To make your enrolment process as easy as possible, please have
                your electricity and/or natural gas bill with you
              </span>
            </p>
            {message && (
              <h2 className="mb-[2em]  text-red-500 capitalize w-full text-center">
                {message} is not filled
              </h2>
            )}
            <fieldset>
              <section className="mb-[1.4rem]">
                <div className="mb-[1rem] md:flex md:flex-row items-start w-full md:w-[65%] justify-between gap-[2em]">
                  <div className="mb-6">
                    <p className="text-white text-[1rem] font-bold">
                      Choose Your Commodity Type
                    </p>
                    {loading ? (
                      <div className=" h-[60px] rounded mt-[2em] flex items-center justify-center ">
                        <CircularProgress sx={{ color: "#2DAD00" }} />
                      </div>
                    ) : (
                      <>
                        {commodities?.map((commodity, idx) => {
                          return (
                            <div
                              key={commodity.id}
                              className="block my-[1rem] w-[65%] md:w-full flex justify-between items-center"
                            >
                              <label
                                htmlFor="natural gas"
                                className="text-white px-[1rem]"
                              >
                                {commodity.name}
                              </label>
                              <input
                                type="checkbox"
                                id="natural gas"
                                required
                                checked={data.commodity.includes(commodity.name)}
                                value={commodity.name}
                                className={`accent-[#2DAD00] ${style.checkInputField}`}
                                onChange={(e) => {
                                  
                                  e.target.checked
                                    ? setData({
                                        ...data,
                                        commodity: [
                                          ...data.commodity,
                                          e.target.value,
                                        ],
                                      })
                                    : setData({
                                        ...data,
                                        commodity: data.commodity.filter(
                                          (item) => item !== commodity.name
                                        ),
                                      });
                                }}
                              />
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                  <div>
                    <label htmlFor="Occupants" className="text-[#2DAD00]">
                      Number Of Occupants
                    </label>
                    <input
                      type="number"
                      id="suite"
                      required
                      value={data.occupantNumber}
                      onChange={(event) =>
                        setData({ ...data, occupantNumber: event.target.value })
                      }
                      className="form-small-input"
                    />
                  </div>
                </div>
                <div className="md:flex md:w-[65%] justify-between items-start gap-[1em] mt-8">
                  <Dropdown
                    data={data}
                    field="envelope"
                    setData={setData}
                    text="Choose Your Building Envelope"
                    nameChange="envelope"
                    textColor="text-[#2DAD00]"
                    itemList={envelopes}
                    value={data.envelope}
                    customFunc={setSelectedEnvelope}
                  />
                  {loading ? (
                    <div className="bg-[white] h-[60px] rounded mt-[2em] flex items-center justify-center ">
                      <CircularProgress sx={{ color: "#2DAD00" }} />
                    </div>
                  ) : (
                    <>
                      <Dropdown
                        data={data}
                        setData={setData}
                        itemList={subEnvelopes}
                        field="envelope_sub"
                        text="Building Subtype"
                        labelText="Choose Your Building Subtype"
                        textColor="text-[#2DAD00]"
                        nameChange="envelope_sub"
                        value={data.envelope_sub}
                        dependency={selectedEnvelope}
                      />
                    </>
                  )}
                </div>
              </section>
            </fieldset>
          </div>

          <div className="flex  my-[1em]">
            <button
              onClick={() => {
                moveBackward();
                navigate("/energy-user");
              }}
              children="Previous"
              className="py-[1em] basis-[50%] md:basis-[15%] px-[1.4em] border-[.2px] mr-[.7em] border-[#2DAD00] text-[#2DAD00]"
            />

            <button
              onClick={handlePageMove}
              className={`py-[1em]  basis-[50%] px-[1.4em] bg-[#2ead0065]  text-[#FFF]`}
              children="Next"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Form1;
const data = {};

export const Dropdown = ({
  text,
  textColor,
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
      [nameChange]: selectedElement?.name,
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
  return (
    <div className={`${margin ? "md:m-0 mt-7" : ""}`}>
      <span className={`${textColor} mb-8 text-[1rem] `}>
        {labelText ? labelText : text}
      </span>
      <div className={style.dropdown}>
        <div className={style.dropdownHeader} onClick={toggleDropdown}>
          {displayValue}
          <AiFillCaretRight
            className={`${style.icon} ${isOpen && style.open}`}
          />
        </div>
        <div className={`${style.dropdownBody} ${isOpen && style.open}`}>
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
