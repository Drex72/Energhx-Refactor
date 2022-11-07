import React, { useContext, useEffect, useState } from "react";
import { RiSearchFill } from "react-icons/ri";
import { BsBell } from "react-icons/bs";

import {UserDashboardContext, UserDashboardContextProvider} from ".././../Components/Forms/SignIn";


function UserPageHeader() {
  return (
    <UserDashboardContextProvider>
      <UserPageHeaderComponent />
    </UserDashboardContextProvider>
  );
}

function UserPageHeaderComponent() {
  const [toolTipIsOpen, setToolTipIsOpen] = useState(false);
  const { data, setData, userInfo } = useContext(UserDashboardContext);

  
  console.log(data);
  console.log(userInfo);


  console.log(data)
  // useEffect(() => console.log(adminInfo), []);
  const iconStyle = {
    width: "17px",
    height: "17px",
    color: "#929292",
  };

  const toggleToolTip = () => {
    setToolTipIsOpen(!toolTipIsOpen);
  };

  return (
    <header className="mb-[4em] mt-[1em] md:flex md:items-center md:justify-between w-[100%]">
       <div></div>
      <div className="md:flex md:items-center md:gap-[2em]">
        <div className="hidden md:block">
          <BsBell style={iconStyle} />
        </div>

        <div className="flex items-center gap-[1em]">
          <div
            onClick={toggleToolTip}
            className="absolute top-[1em] right-[3em] md:sticky border-2 rounded-full p-[1em] px-[1em] after:content-[border-b-2 border-black]"
          >
            {userInfo?.firstname[0]}
          </div>
          {toolTipIsOpen && (
            <ul className="list-none block md:hidden absolute top-[4rem] right-[2rem] bg-[#fff] p-[2em] font-semibold z-[99]">
              <li className="py-[1em]">Log out</li>
              <li className="">User</li>
            </ul>
          )}
          <div>
            <p className="hidden md:block capitalize">
              {userInfo?.firstname} <span>{userInfo?.lastname}</span>
            </p>
            <p className="font-bold md:text-[xl] hidden md:block">User</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default UserPageHeader;
