import React from "react";
import style from "./Form.module.css";

const Form2 = ({ data, setData }) => {
  return (
    <div className="mb-[15em] px-[2em]">
      <div className={`${style.heading}`}>
        <h2 className={`text-3xl ${style.formOneHeading}`}>
          SELECTED COMMODITY
        </h2>
        
      </div>
      <h4 className={`mb-2em text-xl pb-[1em] text-white`}>Program</h4>
      <div className={`flex flex-col justify-between}`}>
        <div className={`basis-[30%] ${style.checkField}`}>
          <input
            type="radio"
            id="female"
            name="sex"
            value="natural gas"
            required
            onChange={(event) =>
              setData({ ...data, program: event.target.value })
            }
          />
          <label className={style.checkLabelField} htmlFor="natural-gas">
            Natural Gas
          </label>
        </div>
        <div className={`basis-[30%] ${style.checkField}`}>
          <input
            required
            id="electricity"
            name="program"
            type="radio"
            value="electricity"
            className={`accent-[#2DAD00] ${style.checkInputField}`}
            onChange={(event) => {
              setData({ ...data, program: event.target.value });
            }}
          />
          <label className={style.checkLabelField} htmlFor="electricity">
            Electricity
          </label>
        </div>
      </div>
    </div>
  );
};

export default Form2;
