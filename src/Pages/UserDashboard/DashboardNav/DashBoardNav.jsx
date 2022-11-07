import "./Nav.css";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Home from "../UserHome";

export const navItems = [{ id: "0", pageTitle: "Logout", page: <Home /> }];

const DashBoardNav = ({ content, setContent }) => {
  const [selectedTab, setSelectedTab] = useState(navItems[0]);

  const navigate =  useNavigate();


  const logOut = () => {
   navigate("/")    
  }

  return (
    <nav className="nav hidden md:flex md:mt-[6em]">
      <ul className="nav__list list-none md:px-[2em] md:flex md:flex-col md:gap-[2em]">
        {/* Don't forget the "to" attribute of link */}
        {navItems.map((item) => (
          <li
            className={
              item === selectedTab ? "text-[#2DAD00]" : "text-[#A6A5A5]"
            }
            key={item.id}
            onClick={logOut}
          >
            <span className="cursor-pointer text-[red] font-bold">{item.pageTitle}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DashBoardNav;
