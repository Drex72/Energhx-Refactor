/** @format */

import { Dropdown } from "../UserStuff/Form1";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { checkIfAllIsCompleted, checkIfCompleted } from "../../Forms/useFetch";
import { CircularProgress } from "@mui/material";
import { useRef } from "react";
import { InstallerDropdown } from "../../Forms/InstallerSignUpForm";
import { VisibilityOff } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";

function InstallerSignUpCompSmall({
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
  const [passwordVisible, setPasswordVisible] = useState(false);

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
    <main className="text-white">
      <form
        onSubmit={handlePageMove}
        className="user-form p-[3em]  bg-[#112518]">
        <div>
          <h2 className="category-heading uppercase pb-[.5em]  text-[1.5rem] font-extrabold">
            Sign Up For Energy installer
          </h2>
        </div>
        <fieldset className="my-[2em]">
          <legend className="mb-[1em] text-2xl">Personal Information</legend>
          {message && (
            <h2
              ref={msgRef}
              className="mb-[2em]  text-red-500 capitalize w-full ">
              {message}
            </h2>
          )}
          <section className="my-[1.4em]">
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
              className="form-small-input"
            />
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
              className="form-small-input"
            />
            <label htmlFor="othername">Other Name</label>
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
              className="form-small-input"
            />
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
              className="form-small-input"
            />
            <label htmlFor="phonenumber">Phone (Mobile)</label>
            <input
              type="tel"
              id="phonenumber"
              minLength={7}
              maxLength={17}
              required
              value={installerData.phoneNumber}
              onChange={(event) =>
                setInstallerData({
                  ...installerData,
                  phoneNumber: event.target.value,
                })
              }
              className="form-small-input"
            />
            <div>
              <label htmlFor="phonenumber">Alternate (Mobile)</label>
              <input
                type="tel"
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
              <label htmlFor="email">Password</label>

              <div className="mt-4 bg-[white] flex items-center rounded-[10px] p-[1em] mt-[1em] mb-[1.5em] mx-0">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  value={installerData.password}
                  minLength={8}
                  maxLength={12}
                  required
                  onChange={(event) =>
                    setInstallerData({
                      ...installerData,
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
          </section>

          <div className="my-[1.4em]  flex flex-col gap-[1em]">
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
                  setInstallerData({ ...installerData, sex: e.target.value });
                }}
              />
              <label for="test1">Male</label>
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
                  setInstallerData({ ...installerData, sex: e.target.value });
                }}
              />
              <label for="test2">Female</label>
            </p>
          </div>
        </fieldset>

        <fieldset className="my-[2em]">
          <legend className="mb-[2em]">Section Information</legend>

          <section className="my-[1.4em]">
            <div className="flex gap-[2em]">
              <div className="w-full">
                <label htmlFor="firstname">Street Number</label>
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
                  className="form-small-input"
                />
              </div>
              <div className="w-full">
                <label htmlFor="firstname">Street name</label>
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
                  className="form-small-input"
                />
              </div>
            </div>
            <label htmlFor="cityname">City</label>
            <input
              type="text"
              id="cityname"
              required
              value={installerData.city}
              onChange={(event) =>
                setInstallerData({ ...installerData, city: event.target.value })
              }
              className="form-small-input"
            />
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
              className="form-small-input"
            />
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
            <section className="my-[1.4em]">
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
              <div className="mt-8">
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
              </div>
            </section>
          </section>
        </fieldset>

        <div>
          <label htmlFor="othername">Interests</label>
          <div className="w-[100%] flex flex-col justify-between p-[.5em] rounded-[10px] text-[black] outline-none  mb-[1.5em] mx-[0] min-h-[60px]  bg-[white] flex items-center gap-4 ">
            <div className="overflow-scroll min-h-[0px] flex gap-2 rounded-[10px]">
              {interestData?.map((utility) => (
                <div
                  key={utility}
                  className="py-[.5em] px-[1.4em] rounded-[10px] bg-[#2DAD00] border-[.2px] border-[#2DAD00]  text-[#FFF]">
                  {`${utility?.slice(0, 4)}...`}
                </div>
              ))}
            </div>
            <div className="w-[100%]">
              <InstallerDropdown
                data={installerData}
                setData={setInstallerData}
                itemList={interests}
                field="Interest"
                text="Interest"
                labelText="Interest"
                textColor="text-[#2DAD00]"
                nameChange="interests"
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

        <div className="flex justify-center my-[1em]">
          <button
            onClick={() => navigate("/")}
            children="Cancel"
            className="py-[1em] basis-[50%] px-[1.4em] border-[.2px] mr-[.7em] border-[#2DAD00] text-[#2DAD00]"
          />
          <button
            onClick={() => {
              setPasswordVisible(false);
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
            className={`py-[1em]  basis-[50%] px-[1.4em] bg-[#2ead0065]  text-[#FFF]`}
            children="Next"
          />
        </div>
      </form>
    </main>
  );
}

export default InstallerSignUpCompSmall;
