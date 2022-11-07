import "./sidebar.css";

import { GiHamburgerMenu } from "react-icons/gi";

import { motion } from "framer-motion";
import Home from "../UserHome";
import Country from "../../Country";
import UserType from "../../UserType";
import { useNavigate } from "react-router-dom";
import CategoryContainer from "../../CategoryContainer/CategoryContainer";

export const navItems = [
  { id: "0", pageTitle: "Dashboard", page: <Home /> },
  { id: "1", pageTitle: "Country", page: <Country /> },
  { id: "2", pageTitle: "User type", page: <UserType /> },
];

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const SideBar = ({ onOpen, isOpen, setContent, content }) => {
    const navigate = useNavigate();

    const logOut = () => {
      navigate("/");
    };

  return (
    <>
      <GiHamburgerMenu
        onClick={onOpen}
        className="block tablet:hidden absolute top-[2.2em] left-[4em]"
      />

      {isOpen ? (
        <motion.nav
          animate={{ y: [10, 40, 10] }}
          className="nav block tablet:hidden rounded-[10px] absolute top-[3em] left-[.4em]  bg-[#fff] text-[#002] p-[2em] z-[1]"
        >
          <ul className="sidebar__list list-none">
            {navItems.map((item, index ) => (
              <motion.li
                initial={{ opacity: 0.6 }}
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 1 },
                }}
                whileTap={{ scale: 0.9 }}
                whileInView={{ opacity: 1 }}
                className="list-item"
                key={item.id}
                onClick={() => setContent(item.page)}
              >
                <span className = {index === 3 ? `text-[red] font bold` : `cursor-pointer`}>{item.pageTitle}</span>
              </motion.li>
            ))}
            <li className="text-[red] font-bold cursor-pointer" onClick={logOut}>Logout</li>
          </ul>
        </motion.nav>
      ) : (
        " "
      )}
    </>
  );
};

export default SideBar;
