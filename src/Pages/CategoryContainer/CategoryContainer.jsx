import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./categories.css";

import Header from "../../Components/Header/Header";
import { categories } from "../../Data/data";

import { motion } from "framer-motion";
import { HiLightBulb } from "react-icons/hi";
import Modal from "../../Components/Modal/Modal";

const CategoryContainer = () => {
  useEffect(() => {
    localStorage.clear()
  }, [])
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setModalIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  const [link, setLink] = useState("");

  const bulbStyle = {
    color: "#2DAD00",
    height: "30px",
    width: "50px",
    flexBasis: "18%",
  };
  return (
    <motion.div className={`bg-[#f3eded] ${isModalOpen ? 'h-[100vh] overflow-hidden' : 'min-h-screen'}`} >
      <div className="page-header bg-[#000000] text-[#fff]">
        <Header onOpen={handleIsOpen} isOpen={isOpen} />
      </div>
      <main onClick={() => setIsOpen(false)} className="category-container overflow-hidden py-[2em] min-h-[100vh] bg-[#112518] text-[#fff]">
        <section className="card--categories container pt-[4em]">
          <h1 className="category-heading uppercase pb-[1em] text-center text-[2rem] font-extrabold">
            Select your preferred choice
          </h1>

          <div className="card-container row">
            {categories.map((category) => (
              <article
                key={category.id}
                onClick={() => {
                  setModalIsOpen(true);
                  setLink(category.path);
                 
                  localStorage.removeItem('userData')
                  localStorage.removeItem('userData2')
                  localStorage.removeItem('userData3')
                }}
                
              >
                <div className="card card--1 cursor-pointer ">
                  <div className="icon-container">
                    <img
                      src={category.image__URL}
                      className="icon"
                      alt={category.image_desc}
                    />
                  </div>
                  <p className="card-description pt-[3em]">
                    {category.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {isModalOpen && <Modal link={link} setModalIsOpen={setModalIsOpen} />}
        <section className="eligibility-notice container pt-[3em]">
          <div className="w-[100%]">
            <h2 className="category-heading uppercase pb-[1em] text-center text-[1.5rem] font-extrabold">
              Sign up eligibility
            </h2>

            <div className="card-container w-[100%] row">
              <ul className="list m-0 p-0 list-none">
                <li className="flex gap-[.5em] mb-[15px]">
                  <HiLightBulb style={bulbStyle} />
                  <p className="eligibility__text font-normal basis-[80%]">
                    Not having an existing contract from any other retailer
                    and/or energy marketer for this property.
                  </p>
                </li>
                <li className="flex gap-[.5em] mb-[15px]">
                  <HiLightBulb style={bulbStyle} />
                  <p className="eligibility__text font-normal basis-[80%]">
                    Not having an existing contract from any other retailer
                    and/or energy marketer for this property.
                  </p>
                </li>
                <li className="flex gap-[.5em] mb-[15px]">
                  <HiLightBulb style={bulbStyle} />
                  <p className="eligibility__text font-normal basis-[80%]">
                    Not having an existing contract from any other retailer
                    and/or energy marketer for this property.
                  </p>
                </li>
                <li className="flex gap-[.5em] mb-[15px]">
                  <HiLightBulb style={bulbStyle} />
                  <p className="eligibility__text font-normal basis-[80%]">
                    Not having an existing contract from any other retailer
                    and/or energy marketer for this property.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </motion.div>
  );
};

export default CategoryContainer;
