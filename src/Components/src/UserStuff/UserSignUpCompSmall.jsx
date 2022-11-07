/** @format */

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Dropdown } from "./Form1";
import { useState, useEffect } from "react";
import { checkIfAllIsCompleted, checkIfCompleted } from "../../Forms/useFetch";
import { CircularProgress } from "@mui/material";
import { useRef } from "react";
import { VisibilityOff } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
function UserSignUpCompSmall({
  selectedCountry,
  setSelectedCountry,
  province,
  provinceLoading,
  countries,
}) {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState();
  const [message, setMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const msgRef = useRef();
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) ?? {
      firstname: "",
      lastname: "",
      othername: "",
      sex: "",
      email: "",
      phoneNumber: "",
      streetName: "",
      streetNumber: "",
      city: "",
      postalCode: "",
      province: "",
      country: "",
      password: "",
    }
  );
  const [genderCheckbox, setGenderCheckbox] = useState({
    male: false,
    female: false,
  });
  useEffect(() => {
    if (userData.sex === "M") {
      setGenderCheckbox({ female: false, male: true });
    } else if (userData.sex === "F") {
      setGenderCheckbox({ male: false, female: true });
    }
  }, []);

  /**
   * Validates the Form to make sure everything is filled before moving onto the next page
   * @param {*} e
   */
  const handlePageMove = (e) => {
    e.preventDefault();
    const statusAll = checkIfCompleted(userData);

    if (!statusAll.status) {
      localStorage.setItem("userData", JSON.stringify(userData));
      navigate("/user");
    } else {
      setMessage(statusAll?.dataNotCompleted);
    }
  };
  useEffect(() => {
    const state = checkIfCompleted(userData);
    setDisabled(state.status);
  }, [userData]);

  useEffect(() => {
    let timeoutId = setTimeout(() => setMessage(""), 5000);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return () => clearTimeout(timeoutId);
  }, [message]);
  return (
    <main className="text-white">
      <form
        onSubmit={handlePageMove}
        className="user-form p-[3em]  bg-[#112518]">
        <div>
          <h2 className="category-heading uppercase pb-[.5em]  text-[1.5rem] font-extrabold">
            Sign Up For User
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
                setUserData({ ...userData, firstname: event.target.value })
              }
              id="firstname"
              value={userData.firstname}
              className="form-small-input"
            />
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              required
              value={userData.lastname}
              onChange={(event) =>
                setUserData({ ...userData, lastname: event.target.value })
              }
              className="form-small-input"
            />
            <label htmlFor="othername">Other Name</label>
            <input
              type="text"
              id="othername"
              required
              value={userData.othername}
              onChange={(event) =>
                setUserData({ ...userData, othername: event.target.value })
              }
              className="form-small-input"
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={userData.email}
              required
              onChange={(event) =>
                setUserData({ ...userData, email: event.target.value })
              }
              className="form-small-input"
            />
            <label htmlFor="phonenumber">Phone (Mobile)</label>
            <input
              type="number"
              id="phonenumber"
              minLength={7}
              maxLength={17}
              required
              value={userData.phoneNumber}
              onChange={(event) =>
                setUserData({ ...userData, phoneNumber: event.target.value })
              }
              className="form-small-input"
            />
            <div>
              <label htmlFor="email">Password</label>

              <div className="mt-4 bg-[white] flex items-center rounded-[10px] p-[1em] mt-[1em] mb-[1.5em] mx-0">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  value={userData.password}
                  minLength={8}
                  maxLength={12}
                  required
                  onChange={(event) =>
                    setUserData({
                      ...userData,
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
                  setUserData({ ...userData, sex: e.target.value });
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
                  setUserData({ ...userData, sex: e.target.value });
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
                  value={userData.streetNumber}
                  required
                  id="streetnumber"
                  onChange={(event) =>
                    setUserData({
                      ...userData,
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
                  value={userData.streetName}
                  onChange={(event) =>
                    setUserData({ ...userData, streetName: event.target.value })
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
              value={userData.city}
              onChange={(event) =>
                setUserData({ ...userData, city: event.target.value })
              }
              className="form-small-input"
            />
            <label htmlFor="othername">Postal Code</label>
            <input
              type="number"
              id="postal"
              required
              value={userData.postalCode}
              onChange={(event) =>
                setUserData({ ...userData, postalCode: event.target.value })
              }
              className="form-small-input"
            />
          </section>

          <section className="my-[1.4em]">
            {/* Countries */}
            <Dropdown
              data={userData}
              setData={setUserData}
              field="country"
              text="Country"
              textColor="text-[#2DAD00]"
              itemList={countries}
              nameChange="country"
              customFunc={setSelectedCountry}
              value={userData.country}
            />
            <div className="mt-6">
              {provinceLoading ? (
                <div className="bg-[white] h-[60px] rounded mt-[2em] flex items-center justify-center ">
                  <CircularProgress sx={{ color: "#2DAD00" }} />
                </div>
              ) : (
                <>
                  {/* States */}
                  <Dropdown
                    data={userData}
                    setData={setUserData}
                    field="Province"
                    text="Province / State"
                    textColor="text-[#2DAD00]"
                    labelText="Province / State"
                    itemList={province}
                    nameChange="province"
                    dependency={selectedCountry}
                    value={userData.province}
                  />
                </>
              )}
            </div>
          </section>
        </fieldset>

        <div className="flex justify-center my-[1em]">
          <button
            onClick={() => navigate("/")}
            children="Cancel"
            className="py-[1em] basis-[50%] px-[1.4em] border-[.2px] mr-[.7em] border-[#2DAD00] text-[#2DAD00]"
          />
          <button
            onClick={() => {
              const all = checkIfAllIsCompleted(userData);
              const states = all && checkIfCompleted(userData);
              console.log(states, all);
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

export default UserSignUpCompSmall;
