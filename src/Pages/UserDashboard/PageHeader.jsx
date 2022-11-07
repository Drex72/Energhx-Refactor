import React, { useContext, useEffect, useState } from "react";
import { RiSearchFill } from "react-icons/ri";
import { BsBell } from "react-icons/bs";
import {UserDashboardContext} from ".././UserDashboard/UserDashboard"



function PageHeader() {
  return (
    <UserContextProvider>
      <PageHeaderComponent />
    </UserContextProvider>
  );
}

function PageHeaderComponent() {
  const [toolTipIsOpen, setToolTipIsOpen] = useState(false);
  const {data, setData} = useContext(UserDashboardContext);

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
      <div className="border-2 border-black absolute right-[50%] translate-x-[50%] md:sticky md:translate-x-0 w-[75%] md:w-[50%] rounded-[20px] flex gap-[.5em] px-[2em] py-[.7em] items-center mx-[.3em]">
        <label htmlFor="search-box">
          <RiSearchFill style={iconStyle} />
        </label>
        <input
          type="text"
          id="search-box"
          className="border-none outline-none w-[100%] bg-transparent"
          placeholder="Search"
        />
      </div>
      <div className="md:flex md:items-center md:gap-[2em]">
        <div className="hidden md:block">
          <BsBell style={iconStyle} />
        </div>

        <div className="flex items-center gap-[1em]">
          <div
            onClick={toggleToolTip}
            className="absolute top-[1em] right-[3em] md:sticky border-2 rounded-full p-[1em] px-[1em] after:content-[border-b-2 border-black]"
          >
            {data?.firstname[0]}
          </div>
          {toolTipIsOpen && (
            <ul className="list-none block md:hidden absolute top-[4rem] right-[2rem] bg-[#fff] p-[2em] font-semibold z-[99]">
              <li className="py-[1em]">Log out</li>
              <li className="">Energy User</li>
            </ul>
          )}
          <div>
            <p className="hidden md:block capitalize">
              {data?.firstname} <span>{data?.lastname}</span>
            </p>
            <p className="font-bold md:text-[xl] hidden md:block">User</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default PageHeader;
