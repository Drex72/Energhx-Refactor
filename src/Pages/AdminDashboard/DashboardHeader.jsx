import DashBoardNav from "./DashboardNav/DashBoardNav";
import DashBoardSideBar from "../UserDashboard/DashBoardSideBar/DashBoardSideBar";
import Energhx from ".././../Components/src/assets/energhx_logo.svg"

import { Link } from "react-router-dom";

const DashboardHeader = ({ onOpen, isOpen, content, setContent }) => {
  return (
    <header className="header bg-transparent py-[2em] md:bg-[#FCFCFC] md:basis-[20%]">
      <div className="container">
        <div className="">
          <p className="logo absolute top-[.8em] right-[50%] translate-x-[50%] md:sticky md:translate-x-0  md:text-center text-black md:text-white">
            <Link to="/">
              <img
                src={Energhx}
                alt="energhx logo"
                className="w-[100px] h-[50px]"
              />{" "}
            </Link>
          </p>
        </div>
        <DashBoardNav setContent={setContent} content={content} />
        <DashBoardSideBar
          setContent={setContent}
          content={content}
          onOpen={onOpen}
          isOpen={isOpen}
        />
      </div>
    </header>
  );
};

export default DashboardHeader;
