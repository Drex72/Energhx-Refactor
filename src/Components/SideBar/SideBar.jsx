import "./sidebar.css";

import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { navItems } from "../.././Data/data"

import {motion} from "framer-motion"


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


const SideBar = ({ onOpen, isOpen }) => {
  
  return (
    <>
      <GiHamburgerMenu
        onClick={onOpen}
        className="block tablet:hidden absolute top-[2.2em] right-[4em]"
      />

      {isOpen ? (
        <motion.nav
          animate={{ y: [10, 40, 10] }}
          className="nav block tablet:hidden rounded-[10px] absolute top-[3em] right-[.1em]  bg-[#fff] text-[#002] p-[2em]"
        >
          <ul className="sidebar__list list-none">
            {/* Don't forget the "to" attribute of link */}
            {navItems.map((item) => (
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
              >
                <Link to={item.link}>
                  <span>{item.pageTitle}</span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.nav>
      ) : (
        " "
      )}
    </>
  );
};

export default SideBar;
