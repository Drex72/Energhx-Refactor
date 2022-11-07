import React from "react";
// import styles from "./modal.module.css";
import styles from "../../Components/Modal/modal.module.css";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { HiLightBulb } from "react-icons/hi";

// const BASE_URL = "https://energyhx-2.herokuapp.com/api/v1";
const FILES_BASE_URL = "https://energhx-2.herokuapp.com/api/v1/admins/files";

const AdminModal = ({ userData, setModalIsOpen }) => {
  const bulbStyle = {
    color: "#2DAD00",
    height: "30px",
    width: "50px",
    flexBasis: "5%",
  };
  console.log(userData);
  const countryValueThatExists =
    userData.UserToCountry.length > 0 ? "UserToCountry" : "country";
  return (
    <>
      <div
        className={`${styles.centered} ${styles.darkBG}`}
        onClick={() => setModalIsOpen(false)}
      />
      <div
        className={`bg-[#FFFFFF] p-[.5em] max-w-[800px] min-w-[350px] m-[0 auto] max-h-[900px] rounded-[10px] ${styles.centered}`}
      >
        <div>
          <div>
            <h1 className={`${styles.heading} font-bold text-2xl text-black`}>
              {userData?.firstname} {userData?.lastname}
            </h1>
          </div>
          <div>
            <li className="text-black  px-[1.4em] text-start gap-[.5em]  flex my-[2em]">
              <pre className="text-[#2DAD00]">Type Of User:</pre>
              {userData?.User_Types?.map((userType) => {
                console.log(userType);
                return (
                  <p className="basis-[90%]">{userType?.type_of_user?.name}</p>
                );
              })}
            </li>
            <ul className="p-[0] m-[0] list-none">
              <li className="text-black  px-[1.4em] text-start gap-[.5em] flex my-[2em]">
                <pre className="text-[#2DAD00]">Email:</pre>
                <p className="basis-[90%]">{userData?.email}</p>
              </li>
              <li className="text-black  px-[1.4em] text-start gap-[.5em] flex my-[2em]">
                <pre className="text-[#2DAD00]">Country:</pre>
                <p className="basis-[90%]">
                  {userData?.UserToCountry?.length !== 0
                    ? userData?.UserToCountry[0]?.country.name
                    : userData?.country[0]?.name}
                </p>
              </li>
              <ul className="m-[0] p-[0] list-none flex gap-[.4rem] flex-wrap">
                <li className="text-black px-[1.4em] text-start gap-[.5em]  flex my-[2em]">
                  <pre className="text-[#2DAD00] text-[.8rem] basis-[10%]">
                    Publications:
                  </pre>
                  {userData?.Publications?.map((publication, index) => {
                    console.log(publication);
                    return (
                      <a
                        className="basis-[90%]"
                        href={`${FILES_BASE_URL}${publication.link}`}
                      >
                        {publication[index]?.details}
                      </a>
                    );
                  })}
                </li>
                <li className="text-black px-[1.4em] text-start gap-[.5em]  flex my-[2em]">
                  <pre className="text-[#2DAD00] text-[.8rem] basis-[10%]">
                    Qualifications:
                  </pre>
                  {userData?.qaulifications?.map((qualification) => {
                    console.log(qualification);
                    return (
                      <a
                        className="basis-[90%]"
                        href={`${FILES_BASE_URL}${qualification.link}`}
                      >
                        {qualification?.name}
                      </a>
                    );
                  })}
                </li>
                <li className="text-black px-[1.4em] text-start gap-[.5em]  flex my-[2em]">
                  {userData.passport !== null ? (
                    <div>
                      <pre className="text-[#2DAD00] text-[.8rem]">
                        Passport:
                      </pre>
                      <a
                        className="inline"
                        target="_blank"
                        href={`${FILES_BASE_URL}${userData.passport}`}
                      >
                        Passport
                      </a>
                    </div>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
              <ul className="m-[0] p-[0] list-none flex gap-[.4rem] flex-wrap">
                <li className="text-black  px-[1.4em] text-start gap-[.5em]  flex my-[1em]">
                  <pre className="text-[#2DAD00]">Commodity:</pre>
                  {userData?.User_Commodity?.map((commodity) => {
                    console.log(commodity);
                    return (
                      <p className="basis-[90%]">
                        {commodity?.commodity?.name}
                      </p>
                    );
                  })}
                </li>
                <li className="text-black px-[1.4em] text-start flex items-center gap-[.6rem]  my-[1em]">
                  <pre className="text-[#2DAD00] text-[.8rem] basis-[10%]">
                    Street Name:
                  </pre>
                  <p>{userData.streetName}</p>
                </li>
                <li className="text-black px-[1.4em] text-start gap-[.5em]  flex my-[1em]">
                  <pre className="text-[#2DAD00] text-[.8rem] basis-[10%]">
                    User Envelope Details:
                  </pre>
                  {userData?.User_Envelope_Details?.map((detail) => {
                    console.log(detail);
                    return (
                      <p className="basis-[90%]">{detail?.envelope?.name}</p>
                    );
                  })}
                </li>
                <li className="text-black px-[1.4em] text-start gap-[.5em]  flex my-[1em]">
                  <pre className="text-[#2DAD00] text-[.8rem] basis-[10%]">
                    User Envelope Subtype:
                  </pre>
                  {userData?.User_Envelope_Details?.map((detail) => {
                    console.log(detail);
                    return (
                      <p className="basis-[90%]">{detail?.subtype?.name}</p>
                    );
                  })}
                </li>
              </ul>
            </ul>
          </div>
          <div>
            <div className={`${styles.actionsContainer}`}>
              <button
                className="p-[.9em] text-[#2DAD00] border-2 border-[#2DAD00]"
                onClick={() => setModalIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminModal;
