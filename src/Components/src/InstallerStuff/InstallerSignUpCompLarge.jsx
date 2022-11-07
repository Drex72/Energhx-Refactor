/** @format */

import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { checkIfAllIsCompleted, checkIfCompleted } from "../../Forms/useFetch";

import { InstallerDropdown } from "../../Forms/InstallerSignUpForm";
import { CloseOutlined } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { Dropdown } from "../UserStuff/Form1";

function InstallerSignUpCompLarge({
  interests,
  selectedCountry,
  setSelectedCountry,
  province,
  countries,
  provinceLoading,
  enrollmentTypes,
}) {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState();
  const [message, setMessage] = useState("");
  const msgRef = useRef();
  const [interestItem, setInterestItem] = useState("");
  const [interestData, setInterestData] = useState(
    JSON.parse(localStorage.getItem("installerData"))?.interests ?? []
  );
  const [installerDataMessage, setInstallerDataMessage] = useState("");
  const [installerData, setInstallerData] = useState(
    JSON.parse(localStorage.getItem("installerData")) ?? {
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
      enrolment_type: "",
    }
  );
  const [genderCheckbox, setGenderCheckbox] = useState({
    male: false,
    female: false,
  });
  useEffect(() => {
    if (installerData.sex === "M") {
      setGenderCheckbox({ female: false, male: true });
    } else if (installerData.sex === "F") {
      setGenderCheckbox({ male: false, female: true });
    }
  }, []);
  useEffect(() => {
    if (interestData.includes(interestItem)) {
      setInstallerDataMessage("Interests already contains that item");
    } else if (interestData.length === 2) {
      setInstallerDataMessage("You can only select up to two Interests");
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
    let status = checkIfCompleted(installerData);
    if (!status?.status) {
      localStorage.setItem("installerData", JSON.stringify(installerData));
      console.log(installerData);
      navigate("/installer");
    } else {
      setMessage(status.dataNotCompleted);
    }
  };
  const handleDeleteFrominstallerData = (name) => {
    let filteredData = interestData?.filter((item) => item !== name);
    setInterestData(filteredData);
  };
  useEffect(() => {
    const state = checkIfCompleted(installerData);
    setDisabled(state.status);
  }, [installerData]);

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setMessage("");
      setInstallerDataMessage("");
    }, 5000);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return () => clearTimeout(timeoutId);
  }, [message, installerDataMessage]);
  return (
    <main className="text-white py-[4em]">
      <form
        onSubmit={handlePageMove}
        className=" container p-[3em] user-form-big">
        <div>
          <h2 className="category-heading uppercase pb-[.5em]  text-[1.5rem] font-extrabold">
            Sign Up For Energy installer
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
                  setInstallerData({
                    ...installerData,
                    firstname: event.target.value,
                  })
                }
                id="firstname"
                value={installerData.firstname}
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
                value={installerData.lastname}
                onChange={(event) =>
                  setInstallerData({
                    ...installerData,
                    lastname: event.target.value,
                  })
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
                value={installerData.othername}
                onChange={(event) =>
                  setInstallerData({
                    ...installerData,
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
                value={installerData.email}
                required
                onChange={(event) =>
                  setInstallerData({
                    ...installerData,
                    email: event.target.value,
                  })
                }
                className="form-small-input "
              />
            </div>
            {/* Password */}
            <div>
              <label htmlFor="email">Password</label>
              <input
                type="password"
                id="password"
                value={installerData.password}
                required
                minLength="8"
                maxLength="12"
                onChange={(event) =>
                  setInstallerData({
                    ...installerData,
                    password: event.target.value,
                  })
                }
                className="form-small-input "
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phonenumber">Phone (Mobile)</label>
              <input
                type="number"
                id="number"
                required
                value={installerData.phoneNumber}
                minLength="7"
                maxLength="17"
                onChange={(event) =>
                  setInstallerData({
                    ...installerData,
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
                value={installerData.alternateNumber}
                minLength="7"
                maxLength="17"
                onChange={(event) =>
                  setInstallerData({
                    ...installerData,
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
                value={installerData.accountNumber}
                minLength="7"
                maxLength="17"
                onChange={(event) =>
                  setInstallerData({
                    ...installerData,
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
                      setInstallerData({
                        ...installerData,
                        sex: e.target.value,
                      });
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
                      setInstallerData({
                        ...installerData,
                        sex: e.target.value,
                      });
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
                value={installerData.streetNumber}
                required
                id="streetnumber"
                onChange={(event) =>
                  setInstallerData({
                    ...installerData,
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
                value={installerData.streetName}
                onChange={(event) =>
                  setInstallerData({
                    ...installerData,
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
                value={installerData.city}
                onChange={(event) =>
                  setInstallerData({
                    ...installerData,
                    city: event.target.value,
                  })
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
                value={installerData.postalCode}
                onChange={(event) =>
                  setInstallerData({
                    ...installerData,
                    postalCode: event.target.value,
                  })
                }
                className="form-small-input "
              />
            </div>
            <Dropdown
              data={installerData}
              setData={setInstallerData}
              field="enrollment_types"
              text="EnrollmentTypes"
              itemList={enrollmentTypes}
              nameChange="enrolment_type"
              value={installerData.enrolment_type}
              labelText="Enrolment Type"
            />
            {/* Countries */}
            <Dropdown
              data={installerData}
              setData={setInstallerData}
              field="country"
              text="Country"
              itemList={countries}
              nameChange="country"
              customFunc={setSelectedCountry}
              value={installerData.country}
            />
            {provinceLoading ? (
              <div className="bg-[white] h-[60px] rounded mt-[2em] flex items-center justify-center ">
                <CircularProgress sx={{ color: "#2DAD00" }} />
              </div>
            ) : (
              <>
                {/* States */}
                <Dropdown
                  data={installerData}
                  setData={setInstallerData}
                  itemList={province}
                  field="Province"
                  text="Province / State"
                  labelText=" Province / State"
                  nameChange="province"
                  dependency={selectedCountry}
                  value={installerData.province}
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
                    onClick={() => handleDeleteFrominstallerData(utility)}>
                    <CloseOutlined />
                  </span>
                </div>
              ))}
            </div>
            <div className="w-[20%]">
              <InstallerDropdown
                data={installerData}
                setData={setInstallerData}
                itemList={interests}
                field="Interest"
                text="Interest"
                labelText="Interest"
                textColor="text-[#2DAD00]"
                // nameChange="interests"
                value={installerData.province}
                customFunc={(item) => {
                  setInterestItem(item);
                }}
              />
            </div>
          </div>
        </div>
        {installerDataMessage && (
          <h2 className="mb-[2em]  text-red-500 capitalize w-full ">
            {installerDataMessage}
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
              const all = checkIfAllIsCompleted(installerData);
              setInstallerData({
                ...installerData,
                interests: interestData.length !== 0 ? interestData : [],
              });
              const states = all && checkIfCompleted(installerData);
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

export default InstallerSignUpCompLarge;
