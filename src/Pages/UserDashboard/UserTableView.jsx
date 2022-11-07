import React, { useContext, useEffect, useState } from "react";
import { RiSearchFill } from "react-icons/ri";
import { BsBell } from "react-icons/bs";

import {
  UserDashboardContext,
  UserDashboardContextProvider,
} from ".././../Components/Forms/SignIn";


const BASE_URL = "https://energyhx-2.herokuapp.com/api/v1";
export default function TableView() {
  return (
    <UserDashboardContextProvider>
      <TableViewHelper />
    </UserDashboardContextProvider>
  );
}




function TableViewHelper() {

    const [toolTipIsOpen, setToolTipIsOpen] = useState(false);
    const {userInfo } = useContext(UserDashboardContext);

    
    console.log(userInfo);

  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedNames, setSelectedNames] = useState([]);

  const isSalesPersonSelected = (salesPeople) =>
    (salesPeople.status === selectedStatus || selectedStatus === "all") &&
    (selectedNames.includes(salesPeople.name) || selectedNames.length === 0);

  return (
    <>
      <div
        className={`bg-[#FFFFFF] p-[.5em] max-w-[800px] min-w-[350px] m-[0 auto] max-h-[900px] rounded-[10px] px-[1em] py-[1.5em]`}
      >
        <div>
          <div>
            <h1 className={`font-bold text-2xl text-black text-center`}>
              {userInfo?.firstname} {userInfo?.lastname}
            </h1>
          </div>
          <div>
            <li className="text-black  px-[1.4em] text-start gap-[.5em]  flex my-[2em]">
              <pre className="text-[#2DAD00]">Type Of User:</pre>
              {userInfo?.User_Types?.map((userType) => {
                console.log(userType);
                return (
                  <p className="basis-[90%]">{userType?.type_of_user?.name}</p>
                );
              })}
            </li>
            <ul className="p-[0] m-[0] list-none">
              <li className="text-black  px-[1.4em] text-start gap-[.5em] flex my-[2em]">
                <pre className="text-[#2DAD00]">Email:</pre>
                <p className="basis-[90%]">{userInfo?.email}</p>
              </li>
              <li className="text-black  px-[1.4em] text-start gap-[.5em] flex my-[2em]">
                <pre className="text-[#2DAD00]">Country:</pre>
                <p className="basis-[90%]">
                  {userInfo?.UserToCountry?.length !== 0
                    ? userInfo?.UserToCountry[0]?.country.name
                    : userInfo?.country[0]?.name}
                </p>
              </li>
              <ul className="m-[0] p-[0] list-none flex gap-[.4rem] flex-wrap">
                <li className="text-black px-[1.4em] text-start gap-[.5em]  flex my-[2em]">
                  <pre className="text-[#2DAD00] text-[.8rem] basis-[10%]">
                    Publications:
                  </pre>
                  {userInfo?.Publications?.map((publication, index) => {
                    console.log(publication);
                    return (
                      <a
                        className="basis-[90%]"
                        href={`${BASE_URL}${publication.link}`}
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
                  {userInfo?.qaulifications?.map((qualification) => {
                    console.log(qualification);
                    return (
                      <a
                        className="basis-[90%]"
                        href={`${BASE_URL}${qualification.link}`}
                      >
                        {qualification?.name}
                      </a>
                    );
                  })}
                </li>
                <li className="text-black px-[1.4em] text-start gap-[.5em]  flex my-[2em]">
                  {userInfo.passport !== null ? (
                    <div>
                      <pre className="text-[#2DAD00] text-[.8rem]">
                        Passport:
                      </pre>
                      <a
                        className="inline"
                        target="_blank"
                        href={`${BASE_URL}${userInfo.passport}`}
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
                  {userInfo?.User_Commodity?.map((commodity) => {
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
                  <p>{userInfo?.streetName}</p>
                </li>
                <li className="text-black px-[1.4em] text-start gap-[.5em]  flex my-[1em]">
                  <pre className="text-[#2DAD00] text-[.8rem] basis-[10%]">
                    User Envelope Details:
                  </pre>
                  {userInfo?.User_Envelope_Details?.map((detail) => {
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
                  {userInfo?.User_Envelope_Details?.map((detail) => {
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
          </div>
        </div>
      </div>
    </>
  );
}
