import "./Header.css";

import Nav from "../Nav/Nav";
import SideBar from "../SideBar/SideBar";

import {Link} from "react-router-dom"

const Header = ({onOpen, isOpen}) => {

  return (
    <header className="header bg-transparent py-[2em]">
      <div className="container row tablet:justify-between">
        <Link to="/">
          <p className="logo">ENERGHX</p>
        </Link>
        <Nav />
        <SideBar onOpen={onOpen} isOpen={isOpen} />
      </div>
    </header>
  );
}

export default Header;
