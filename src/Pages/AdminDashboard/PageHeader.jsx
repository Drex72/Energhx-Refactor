import React, { useContext, useEffect, useState } from "react";
import { RiSearchFill } from "react-icons/ri";
import { BsBell } from "react-icons/bs";
import { adminContext } from "../../Data/data";
import { AdminContext, AdminContextProvider } from "./AdminSignUp";


function PageHeader() {
  return (
    <AdminContextProvider>
      <PageHeaderComponent />
    </AdminContextProvider>
  );
}

function PageHeaderComponent() {
  const [toolTipIsOpen, setToolTipIsOpen] = useState(false);
  const { adminInfo } = useContext(AdminContext);
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
      <div className=" absolute right-[50%] translate-x-[50%] md:sticky md:translate-x-0 w-[75%] md:w-[50%] rounded-[20px] flex gap-[.5em] px-[2em] py-[.7em] items-center mx-[.3em]">
        
      </div>
      <div className="md:flex md:items-center md:gap-[2em]">
        <div className="hidden md:block cursor-pointer">
          <BsBell style={iconStyle} />
        </div>

        <div className="flex items-center gap-[1em]">
          <div
            onClick={toggleToolTip}
            className="absolute cursor-pointer top-[1em] right-[3em] md:sticky border-2 rounded-full p-[1em] px-[1em] after:content-[border-b-2 border-black]"
          >
            {adminInfo.firstname[0]}
          </div>
          {toolTipIsOpen && (
            <ul className="list-none block md:hidden absolute top-[4rem] right-[2rem] bg-[#fff] p-[2em] font-semibold z-[99]">
              <li className="py-[1em]">Log out</li>
              <li className="">Admin</li>
            </ul>
          )}
          <div>
            <p className="hidden md:block capitalize">
              {adminInfo?.firstname} <span>{adminInfo?.lastname}</span>
            </p>
            <p className="font-bold md:text-[xl] hidden md:block">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default PageHeader;
