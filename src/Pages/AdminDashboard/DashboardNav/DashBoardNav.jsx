import "./Nav.css";

import { Link, useNavigate } from "react-router-dom";
import AddCommodity from "../AddCommodity";
import { useState } from "react";
import Home from "../Home";
import Country from "../../Country";
import UserType from "../../UserType";
import AddBuilding from "../AddBuilding";
import AddSubTypes from "../AddSubTypes";
import CategoryContainer from "../././../CategoryContainer/CategoryContainer"


export const navItems = [
  { id: "0", pageTitle: "Dashboard", page: <Home /> },
  { id: "1", pageTitle: "Country", page: <Country/> },
  { id: "2", pageTitle: "User Type", page: <UserType/> },
  {id: "3", pageTitle: "Commodity", page: <AddCommodity/>},
  {id: "4", pageTitle: "Building", page: <AddBuilding/>},
];

const DashBoardNav = ({ content, setContent }) => {
  const [selectedTab, setSelectedTab] = useState(navItems[0]);

     const navigate = useNavigate();

     const logOut = () => {
       navigate("/");
     };

  return (
    <nav className="nav hidden md:flex md:mt-[6em]">
      <ul className="nav__list list-none md:px-[2em] md:flex md:flex-col md:gap-[2em]">
        {/* Don't forget the "to" attribute of link */}
        {navItems.map((item, index) => (
          <li
            className={
              item === selectedTab ? "text-[#2DAD00]" : "text-[#A6A5A5]"
            }
            key={item.id}
            onClick={() => setContent(item.page)}
          >
            <span className="cursor-pointer">{item.pageTitle}</span>
          </li>
        ))}
        <li className="text-[red] font-bold cursor-pointer" onClick={logOut}>Logout</li>
      </ul>
    </nav>
  );
};

export default DashBoardNav;
