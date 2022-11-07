import { useState } from "react";
import style from "./Form.module.css";
import { useForm } from "../../.././hooks/useForm";
import BulbAccomplished from "../assets/Bulb-Accomplished.png";
import { sendData } from "../../Forms/useFetch";
import { useEffect } from "react";

const Form4 = ({moveForward,moveBackward, setLoading}) => {
  const [data, setData] = useState({})
  const [message, setMessage] = useState()
  const handleSubmitForm = async () => {
    setLoading(true)
    let datas = await sendData(data, moveForward, setLoading)

    setMessage(datas)
    
  }
  useEffect(() => {
    const formStep1 = JSON.parse(localStorage.getItem('userData'))
    const formStep2 = JSON.parse(localStorage.getItem('userData2'))
    const formStep3 = JSON.parse(localStorage.getItem('userData3'))
    const formData = {...formStep1, ...formStep2, ...formStep3}
    setData(formData)
    localStorage.setItem('userData', JSON.stringify(formData))
  }, [])
 
  return (
    <div>
      <div className={style.heading} style={{ marginBottom: "5em" }}>
        <h2 className={style.formOneHeading}>VERIFY & SUBMIT</h2>
      </div>
       {message && (
            <h2 className="mb-[2em]  text-red-500 capitalize w-full text-center">
              {message}
            </h2>
          )}
      <div className={style.verifyInputFields}>
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
          labelName="Middle Initial:"
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
          type="tel"
          name="homeTel"
          value={data?.phoneNumber}
          labelName="Home Tel:"
        />
        <InputField
          type="tel"
          name="altTel"
          value={data?.alternateNumber}
          labelName="Alt Tel:"
        />
      </div>
      <p className={style.formOneText} style={{ marginTop: "2em" }}>
        <img src={BulbAccomplished} alt="bulb" />
        <span
          className={`${style.formOneWelcome}`}
          style={{ color: "#2DAD00", fontSize: "1rem", marginLeft: ".5em" }}
        >
          To make your enrolment process as easy as possible, please have your
          electricity and/or natural gas bill with you
        </span>
      </p>
      <div className="flex  my-[1em]">
          <button
            onClick={() => moveBackward()}
            children="Previous"
            className="py-[1em] basis-[15%] px-[1.4em] border-[.2px] mr-[.7em] border-[#2DAD00] text-[#2DAD00]"
          />

          <button
            onClick={handleSubmitForm}
            className={`py-[1em]  basis-[50%] px-[1.4em] bg-[#2dad00] text-[#FFF]`}
            children="Submit"
          />
        </div>
    </div>
  );
};

export default Form4;

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
        className={style.form4Input}

      />
    </div>
  );
};
