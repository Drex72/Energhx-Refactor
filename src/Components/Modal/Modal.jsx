import React from "react";
import styles from "./modal.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { HiLightBulb } from "react-icons/hi";

const Modal = ({ setModalIsOpen, link }) => {
  const bulbStyle = {
    color: "#2DAD00",
    height: "30px",
    width: "50px",
    flexBasis: "5%",
  };
  const navigate = useNavigate()
  return (
    <>
      <div
        className={`${styles.centered} ${styles.darkBG}`}
        onClick={() => setModalIsOpen(false)}
      />
      <div
        className={`bg-[#FFFFFF] p-[.5em] max-w-[700px] min-w-[350px] m-[0 auto] max-h-[900px] rounded-[10px] ${styles.centered}`}
      >
        <div>
          <div>
            <h1 className={`text-center font-bold text-xl text-black`}>
              Sign Up Eligibility
            </h1>
          </div>
          <div>
            <ul className="p-[0] m-[0] list-none">
              <li className="text-black  px-[1em] text-start gap-[.5em] text-[.95rem] flex my-[1em]">
                <HiLightBulb style={bulbStyle} />
                <p className="basis-[90%]">
                  Not having an existing contract from any other retailer and/or
                  energy marketer for this property.
                </p>
              </li>
              <li className="text-black  px-[1em] text-start gap-[.5em] text-[.95rem] flex my-[1em]">
                <HiLightBulb style={bulbStyle} />
                <p className="basis-[90%]">
                  You do have an existing contract with other retailer and/or
                  energy marketer and request Energhx to consider your
                  application for Demand Side Monitroing Plan.
                </p>
              </li>
              <li className="text-black  px-[1em] text-start gap-[.5em] text-[.95rem] flex my-[1em]">
                <HiLightBulb style={bulbStyle} />
                <p className="basis-[90%]">
                  Your plan with other retailer and/or energy marketer has
                  recently expired.
                </p>
              </li>
              <li className="text-black  px-[1em] text-start gap-[.5em] text-[.95rem] flex my-[1em]">
                <HiLightBulb style={bulbStyle} />
                <p className="basis-[90%]">
                  You have previously cancelled your contract with Energhx.
                </p>
              </li>
            </ul>
          </div>
          <div>
            <div className={`${styles.actionsContainer} mb-[2em]`}>
              <button
                className="p-[.5em] text-[#2DAD00] border-2 border-[#2DAD00]"
                onClick={() => setModalIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="p-[.5em]  text-white bg-[#2DAD00]"
                onClick={() => {
                  setModalIsOpen(false)
                  navigate(link)
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
