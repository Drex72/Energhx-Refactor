/** @format */

import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { checkIfAllIsCompleted, checkIfCompleted } from "../../Forms/useFetch";

import { InternDropdown } from "../../Forms/InternSignUpForm";
import { CloseOutlined, VisibilityOff } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { Dropdown } from "../UserStuff/Form1";
import VisibilityIcon from "@mui/icons-material/Visibility";


function InternSignUpCompLarge({
  interests,
  selectedCountry,
  setSelectedCountry,
  province,
  countries,
  provinceLoading,
}) {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState();
    const [passwordVisible, setPasswordVisible] = useState(false);

  const [message, setMessage] = useState("");
  const msgRef = useRef();
  const [interestItem, setInterestItem] = useState("");
  const [interestData, setInterestData] = useState(
    JSON.parse(localStorage.getItem("internData"))?.interests ?? []
  );
  const [internDataMessage, setInternDataMessage] = useState("");
  const [internData, setInternData] = useState(
    JSON.parse(localStorage.getItem("internData")) ?? {
      firstname: "",
      lastname: "",
      othername: "",
      email: "",
      streetName: "",
      streetNumber: "",
      accountNumber: "",
      sex: "",
      phoneNumber: "",
      city: "",
      postalCode: "",
      interests: [],
      password: "",
      country: "",
      province: "",
      alternateNumber: "",
    }
  );
  const [genderCheckbox, setGenderCheckbox] = useState({
    male: false,
    female: false,
  });
  useEffect(() => {
    if (internData.sex === "M") {
      setGenderCheckbox({ female: false, male: true });
    } else if (internData.sex === "F") {
      setGenderCheckbox({ male: false, female: true });
    }
  }, []);
  useEffect(() => {
    if (interestData.includes(interestItem)) {
      setInternDataMessage("Interests already contains that item");
    } else if (interestData.length === 2) {
      setInternDataMessage("You can only select up to two Interests");
    } else if (interestItem == "") {
    } else {
      setInterestData([...interestData, interestItem]);
    }
  }, [interestItem]);

  /**
   * Validates the Form to make sure everything is filled before moving onto the next page
   * @param {*} e
   */
  const handlePageMove = (e) => {
    e.preventDefault();
    const status = checkIfCompleted(internData);

    if (!status?.status) {
      localStorage.setItem("internData", JSON.stringify(internData));
      navigate("/intern");
    } else {
      setMessage(status?.dataNotCompleted);
    }
  };
  const handleDeleteFromInternData = (name) => {
    let filteredData = interestData?.filter((item) => item !== name);
    setInterestData(filteredData);
  };
  useEffect(() => {
    const state = checkIfCompleted(internData);
    setDisabled(state.status);
  }, [internData]);

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setMessage("");
      setInternDataMessage("");
    }, 5000);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return () => clearTimeout(timeoutId);
  }, [message, internDataMessage]);
  return (
    <main className="text-white py-[4em]">
      <form
        onSubmit={handlePageMove}
        className=" container p-[3em] user-form-big">
        <div>
          <h2 className="category-heading uppercase pb-[.5em]  text-[1.5rem] font-extrabold">
            Sign Up For Energy Intern
          </h2>
        </div>
        <fieldset className="my-[2em] ">
          {/* Heading */}
          <legend className="mb-[2em]">Personal Information</legend>
          {message && (
            <h2 ref={msgRef} className="mb-[2em]  text-red-500 w-full ">
              {message}
            </h2>
          )}

          {/* USER FORM */}
          <section className="personal-user-form">
            {/* First Name */}
            <div>
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                required
                onChange={(event) =>
                  setInternData({
                    ...internData,
                    firstname: event.target.value,
                  })
                }
                id="firstname"
                value={internData.firstname}
                className={`form-small-input `}
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                name="lastname"
                required
                value={internData.lastname}
                onChange={(event) =>
                  setInternData({ ...internData, lastname: event.target.value })
                }
                className="form-small-input "
              />
            </div>

            {/* Other Name */}
            <div>
              <label htmlFor="othername">Other Name (s)</label>
              <input
                type="text"
                id="othername"
                required
                value={internData.othername}
                onChange={(event) =>
                  setInternData({
                    ...internData,
                    othername: event.target.value,
                  })
                }
                className="form-small-input "
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={internData.email}
                required
                onChange={(event) =>
                  setInternData({ ...internData, email: event.target.value })
                }
                className="form-small-input "
              />
            </div>
            {/* Password */}
            <div>
              <label htmlFor="email">Password</label>

              <div className="mt-4 bg-[white] flex items-center rounded-[10px] p-[1em] mt-[1em] mb-[1.5em] mx-0">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  value={internData.password}
                  minLength={8}
                  maxLength={12}
                  required
                  onChange={(event) =>
                    setInternData({
                      ...internData,
                      password: event.target.value,
                    })
                  }
                  className=" w-full outline-none text-[black] bg-[transparent]"
                />
                {passwordVisible ? (
                  <VisibilityIcon
                    className="text-[black]"
                    onClick={() => setPasswordVisible(false)}
                  />
                ) : (
                  <VisibilityOff
                    className="text-[black]"
                    onClick={() => setPasswordVisible(true)}
                  />
                )}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phonenumber">Phone (Mobile)</label>
              <input
                type="number"
                id="number"
                required
                value={internData.phoneNumber}
                minLength="7"
                maxLength="17"
                onChange={(event) =>
                  setInternData({
                    ...internData,
                    phoneNumber: event.target.value,
                  })
                }
                className="form-small-input "
              />
            </div>
            <div>
              <label htmlFor="phonenumber">Alternate (Mobile)</label>
              <input
                type="number"
                id="number"
                required
                value={internData.alternateNumber}
                minLength="7"
                maxLength="17"
                onChange={(event) =>
                  setInternData({
                    ...internData,
                    alternateNumber: event.target.value,
                  })
                }
                className="form-small-input "
              />
            </div>
            <div>
              <label htmlFor="account">Account Number</label>
              <input
                type="number"
                id="account"
                required
                value={internData.accountNumber}
                minLength="7"
                maxLength="17"
                onChange={(event) =>
                  setInternData({
                    ...internData,
                    accountNumber: event.target.value,
                  })
                }
                className="form-small-input "
              />
            </div>

            {/* SEX */}
            <div className="flex flex-col justify-between h-full pb-[1em]">
              <label htmlFor="account">Gender</label>
              <div className="my-[1.4em]  flex items-center w-full gap-[1em]">
                <p>
                  <input
                    type="radio"
                    value="M"
                    checked={genderCheckbox.male}
                    id="test1"
                    name="radio-group"
                    onClick={(e) => {
                      setGenderCheckbox({ female: false, male: true });
                    }}
                    onChange={(e) => {
                      setInternData({ ...internData, sex: e.target.value });
                    }}
                  />
                  <label htmlFor="test1">Male</label>
                </p>
                <p>
                  <input
                    type="radio"
                    value="F"
                    id="test2"
                    checked={genderCheckbox.female}
                    name="radio-group"
                    onClick={(e) => {
                      setGenderCheckbox({ male: false, female: true });
                    }}
                    onChange={(e) => {
                      setInternData({ ...internData, sex: e.target.value });
                    }}
                  />
                  <label htmlFor="test2">Female</label>
                </p>
              </div>
            </div>
          </section>
        </fieldset>

        <fieldset className="my-[2em]">
          <legend className="mb-[2em]">Section Information</legend>

          <section className="personal-user-form">
            {/* Street Number */}
            <div>
              <label htmlFor="streetnumber">Street Number</label>
              <input
                type="number"
                value={internData.streetNumber}
                required
                id="streetnumber"
                onChange={(event) =>
                  setInternData({
                    ...internData,
                    streetNumber: event.target.value,
                  })
                }
                className="form-small-input "
              />
            </div>

            {/* Street Name */}
            <div>
              <label htmlFor="streetname">Street Name</label>
              <input
                type="text"
                id="streetname"
                required
                value={internData.streetName}
                onChange={(event) =>
                  setInternData({
                    ...internData,
                    streetName: event.target.value,
                  })
                }
                className="form-small-input "
              />
            </div>

            {/* City */}
            <div>
              <label htmlFor="cityname">City</label>
              <input
                type="text"
                id="cityname"
                required
                value={internData.city}
                onChange={(event) =>
                  setInternData({ ...internData, city: event.target.value })
                }
                className="form-small-input "
              />
            </div>

            {/* Postal */}
            <div>
              <label htmlFor="othername">Postal Code</label>
              <input
                type="number"
                id="postal"
                required
                value={internData.postalCode}
                onChange={(event) =>
                  setInternData({
                    ...internData,
                    postalCode: event.target.value,
                  })
                }
                className="form-small-input "
              />
            </div>
            {/* Countries */}
            <Dropdown
              data={internData}
              setData={setInternData}
              field="country"
              text="Country"
              itemList={countries}
              nameChange="country"
              customFunc={setSelectedCountry}
              value={internData.country}
            />
            {provinceLoading ? (
              <div className="bg-[white] h-[60px] rounded mt-[2em] flex items-center justify-center ">
                <CircularProgress sx={{ color: "#2DAD00" }} />
              </div>
            ) : (
              <>
                {/* States */}
                <Dropdown
                  data={internData}
                  setData={setInternData}
                  itemList={province}
                  field="Province"
                  text="Province / State"
                  labelText=" Province / State"
                  nameChange="province"
                  dependency={selectedCountry}
                  value={internData.province}
                />
              </>
            )}

            {/* Interests */}
          </section>
        </fieldset>
        <div>
          <label htmlFor="othername">Interests</label>
          <div className="w-[100%] flex justify-between p-[.5em] rounded-[10px] text-[black] outline-none mt-[1em] mb-[1.5em] mx-[0] h-[60px]  bg-[white] flex items-center gap-4 ">
            <div className="overflow-x-scroll w-[100%] overflow-y-hidden flex gap-2 rounded-[10px]">
              {interestData?.map((utility) => (
                <div
                  key={utility}
                  className="py-[.5em] flex items-center justify-between px-[1.4em] rounded-[10px] bg-[#2DAD00] border-[.2px] border-[#2DAD00]  text-[#FFF]">
                  {`${utility?.slice(0, 4)}...`}
                  <span
                    className="cursor-pointer"
                    onClick={() => handleDeleteFromInternData(utility)}>
                    <CloseOutlined />
                  </span>
                </div>
              ))}
            </div>
            <div className="w-[20%]">
              <InternDropdown
                data={internData}
                setData={setInternData}
                itemList={interests}
                field="Interest"
                text="Interest"
                labelText="Interest"
                textColor="text-[#2DAD00]"
                // nameChange="interests"
                value={internData.province}
                customFunc={(item) => {
                  setInterestItem(item);
                }}
              />
            </div>
          </div>
        </div>
        {internDataMessage && (
          <h2 className="mb-[2em]  text-red-500 capitalize w-full ">
            {internDataMessage}
          </h2>
        )}

        {/* Buttons */}
        <div className="flex  my-[1em]">
          <button
            onClick={() => navigate("/")}
            children="Cancel"
            className="py-[1em] basis-[15%] px-[1.4em] border-[.2px] mr-[.7em] border-[#2DAD00] text-[#2DAD00]"
          />

          <button
            onClick={() => {
                            setPasswordVisible(false);

              const all = checkIfAllIsCompleted(internData);
              setInternData({
                ...internData,
                interests: interestData.length !== 0 ? interestData : [],
              });
              const states = all && checkIfCompleted(internData);
              setMessage(
                all
                  ? states && states?.dataNotCompleted
                  : "All Fields are Empty"
              );
              disabled && handlePageMove();
            }}
            className={`py-[1em]  basis-[18%] px-[1.4em] bg-[#2ead0065] border-[.2px] border-[#2DAD00]  text-[#FFF]`}
            children="Next"
          />
        </div>
      </form>
    </main>
  );
}

export default InternSignUpCompLarge;
