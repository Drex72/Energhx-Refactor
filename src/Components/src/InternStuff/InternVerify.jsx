/** @format */

import { useState } from "react";
import style from "../UserStuff/Form.module.css";
import { useForm } from "../../../hooks/useForm";
import BulbAccomplished from "../assets/Bulb-Accomplished.png";
import { convertDataUrlToFile, createIntern } from "../../Forms/useFetch";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const InternVerify = ({ moveForward, moveBackward }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("internData"));
  const [qualifications_docs, setQualification_Docs] = useState([]);
  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: false,
  });
  useEffect(() => {
    getAllDocs();
    !localStorage.getItem("internData3") && navigate("/intern");
    getDate();
  }, []);
  const [currentDate, setCurrentDate] = useState();
  const getDate = () => {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    var dateObj = new Date();
    let month = monthNames[dateObj.getMonth()];
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let weekDayName = weekday[dateObj.getDay()];
    let newdate = weekDayName + " " + month + ", " + day + ", " + year;
    setCurrentDate(newdate);
  };

  // useEffect(() => {
  //   window.scrollTo(0, 0)
  //   const timeoutId = setTimeout(() => {
  //     setMessage('')
  //   }, 5000)
  //   return () => clearTimeout(timeoutId)
  // }, [message])
  const [loading, setLoading] = useState(false)

  const getAllDocs = () => {
    const elem = JSON.parse(
      localStorage.getItem("internData2")
    )?.qualifications_docs;
    const arr2 = [];
    elem?.map((data) => {
      let file = convertDataUrlToFile(data);
      arr2.push(file);
    });
    setQualification_Docs(arr2);
  };
  const handleSubmitData = async () => {
    if (checkboxes.checkbox1 && checkboxes.checkbox2) {
      const data1 = JSON.parse(localStorage.getItem("internData"));
      const data2 = JSON.parse(localStorage.getItem("internData2"));
      const data3 = JSON.parse(localStorage.getItem("internData3"));
      const passport = convertDataUrlToFile(data2?.passport);
      const data4 = {
        ...data1,
        passport: passport,
        ...data3,
        qualification_types: data2?.qualification_types,
        qualifications: data2?.qualifications,
        qualifications_docs: qualifications_docs,
      };
      setLoading(true);
      let datas = await createIntern(data4, moveForward);
      setLoading(false);
      setMessage(datas)
    } else {
      setMessage("Make sure all Checkboxes are Ticked");
    }
  };
  return (
    <div>
      <div className={style.heading} style={{ marginBottom: "5em" }}>
        <h2 className={style.formOneHeading}>VERIFY & SUBMIT</h2>
      </div>

      <div className="personal-intern-form">
        <InputField
          type="text"
          name="firstName"
          value={data?.firstname}
          labelName="First Name:"
        />
        <InputField
          type="text"
          name="middleInitial"
          value={data?.othername}
          labelName="Other Name"
        />
        <InputField
          type="text"
          name="lastName"
          value={data?.lastname}
          labelName="Last Name:"
        />
        <InputField
          type="email"
          name="email"
          value={data?.email}
          labelName="Email:"
        />
        <InputField
          type="text"
          name="homeTel"
          value={data?.phoneNumber}
          labelName="Home Number:"
        />
        <InputField
          type="text"
          name="altTel"
          value={data?.alternateNumber}
          labelName="Alternate Number:"
        />
      </div>
      <div className="flex flex-col gap-[1em] mt-6">
        <div class="form-group">
          <input
            type="checkbox"
            value={checkboxes.checkbox1}
            onChange={(e) =>
              setCheckboxes({ ...checkboxes, checkbox1: e.target.checked })
            }
            required
            id="html"
          />
          <label for="html">
            <span
              className={`${style.formOneWelcome}`}
              style={{ fontSize: "1rem", marginLeft: ".5em" }}>
              By clicking the "Submit" button, you will be electronically
              signing this Application effective {currentDate} . If Energhx
              approves your Application, the Agreement between the parties will
              take effect as of that date.
            </span>
          </label>
        </div>
        <div class="form-group">
          <input
            type="checkbox"
            value={checkboxes.checkbox2}
            onChange={(e) =>
              setCheckboxes({ ...checkboxes, checkbox2: e.target.checked })
            }
            required
            id="css"
          />
          <label for="css">
            <span
              className={`${style.formOneWelcome}`}
              style={{ fontSize: "1rem", marginLeft: ".5em" }}>
              I agree to the Research Ethics Policy documents. See link
            </span>
          </label>
        </div>
      </div>
      {message && (
        <h2 className="mb-[2em]  text-red-500 capitalize w-full text-center">
          {message}
        </h2>
      )}
      <p className={style.formOneText} style={{ marginTop: "2em" }}>
        <img src={BulbAccomplished} alt="bulb" />
        <span
          className={`${style.formOneWelcome}`}
          style={{ color: "#2DAD00", fontSize: "1rem", marginLeft: ".5em" }}>
          By clicking the "Submit" button, you will be electronically signing
          this Application effective {currentDate} . If Energhx approves your
          Application, the Agreement between the parties will take effect as of
          that date.
        </span>
      </p>
      <div className="flex  mt-[2em]">
        <button
          onClick={() => {
            moveBackward();
          }}
          children="Previous"
          className="py-[1em] basis-[50%] md:basis-[15%] px-[1.4em] border-[.2px] mr-[.7em] border-[#2DAD00] text-[#2DAD00]"
        />

        <button
          onClick={handleSubmitData}
          className="py-[1em]  basis-[18%] px-[1.4em] bg-[#2ead0065] border-[.2px] border-[#2DAD00]  text-[#FFF]"
          children={loading ? <CircularProgress sx={{color:'#2DAD00'}} /> : "Submit"}
        />
      </div>
    </div>
  );
};

export default InternVerify;

const InputField = (props) => {
  const { type, name, value, handleChange, labelName, placeholder } = props;
  return (
    <div style={{ marginTop: "2em" }}>
      <label className={style.form4Label} htmlFor={name}>
        {labelName}
      </label>
      <div
        type={type}
        name={name}
        children={value}
        className="outline-none py-[1em] px-[1.5em] rounded-[5px] w-full text-[1.1em] bg-[#3A3A3A] text-[white] overflow-x-scroll border-2 border-[#2dad00] md:w-[240px] text-center"
      />
    </div>
  );
};
