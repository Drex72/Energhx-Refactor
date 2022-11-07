import "./Nav.css";

import { Link } from "react-router-dom";
import { useState } from "react";
import { navItems } from "../../Data/data";

const Nav = () => {
  const [selectedTab, setSelectedTab] = useState(navItems[0]);

  return (
    <nav className="nav hidden tablet:flex">
      <ul className="nav__list list-none row">
        {/* Don't forget the "to" attribute of link */}
        {navItems.map((item) => (
          <li
            className={item === selectedTab ? "text-[#2DAD00]" : "text-white"}
            key={item.pageTitle}
          >
            <Link to={item.link}>
              <span>{item.pageTitle}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
