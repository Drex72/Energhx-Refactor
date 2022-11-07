import React from "react";
import style from "./FullButton.module.css";
import { AiFillCaretRight } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";


export const UtilityButtons = ({ previous, next }) => {
  return (
    <div className={style.fullButton}>
      <button
        onClick={previous}
        className={` ${style.buttonMain} ${style.previousButton}`}
      >
        <div className={style.buttonInner}>
          <span>Previous</span>
          <AiFillCaretRight />
        </div>
      </button>
      <button
        className={` ${style.buttonMain} ${style.nextButton} ${style.utilityButtonMobile}`}
      >
        <div onClick={next} className={style.buttonInner}>
          <span>Continue</span>
        </div>
      </button>
      <button
        className={` ${style.buttonMain} ${style.nextButton} ${style.utilityButtonDesktop}`}
      >
        <div onClick={next} className={style.buttonInner}>
          <span>Continue Sign Up</span>
          <AiFillCaretRight />
        </div>
      </button>
    </div>
  );
};
export const UtilityInternButtons = ({ previous, next, path }) => {
  return (
    <div className={style.fullButton}>
      <Link to={path}>
        <button className={` ${style.buttonMain} ${style.previousButton}`}>
          <div className={style.buttonInner}>
            <span>Previous</span>
            <AiFillCaretRight />
          </div>
        </button>
      </Link>
      <button
        className={` ${style.buttonMain} ${style.nextButton} ${style.utilityButtonMobile}`}
      >
        <div onClick={next} className={style.buttonInner}>
          <span>Continue</span>
        </div>
      </button>
      <button
        className={` ${style.buttonMain} ${style.nextButton} ${style.utilityButtonDesktop}`}
      >
        <div onClick={next} className={style.buttonInner}>
          <span>Continue Sign Up</span>
          <AiFillCaretRight />
        </div>
      </button>
    </div>
  );
};

export const UtilityInstallerButtons = ({ previous, next, path }) => {
  return (
    <div className={style.fullButton}>
      <Link to={path}>
        <button className={` ${style.buttonMain} ${style.previousButton}`}>
          <div className={style.buttonInner}>
            <span>Previous</span>
            <AiFillCaretRight />
          </div>
        </button>
      </Link>
      <button
        className={` ${style.buttonMain} ${style.nextButton} ${style.utilityButtonMobile}`}
      >
        <div onClick={next} className={style.buttonInner}>
          <span>Continue</span>
        </div>
      </button>
      <button
        className={` ${style.buttonMain} ${style.nextButton} ${style.utilityButtonDesktop}`}
      >
        <div onClick={next} className={style.buttonInner}>
          <span>Continue Sign Up</span>
          <AiFillCaretRight />
        </div>
      </button>
    </div>
  );
};

export const UserThankYouButton = ({ customFunc, route }) => {
  const dashboardRoutedTo = useNavigate();

  const routeToDashboard = () => {
    console.log("Heya!");
    dashboardRoutedTo(`${route}`);
  }
  return (
    <div className={style.fullButton}>
      <button
        onClick={customFunc}
        className={` ${style.buttonMain} ${style.nextButton}`}
      >
        <div
          className={style.buttonInner}
          onClick={routeToDashboard('/energy-user')}
        >
          <span>Thank You</span>
          <AiFillCaretRight />
        </div>
      </button>
    </div>
  );
};

export const InternThankYouButton = ({ customFunc}) => {

  return (
    <div className={style.fullButton}>
      <button
        onClick={customFunc}
        className={` ${style.buttonMain} ${style.nextButton}`}
      >
        <div className={style.buttonInner}>
          <span>Thank You</span>
          <AiFillCaretRight />
        </div>
      </button>
    </div>
  );
};


export const InstallerThankYouButton = ({ customFunc}) => {
  return (
    <div className={style.fullButton}>
      <button
        onClick={customFunc}
        className={` ${style.buttonMain} ${style.nextButton}`}
      >
        <div className={style.buttonInner}>
          <span>Thank You</span>
          <AiFillCaretRight />
        </div>
      </button>
    </div>
  );
};




export const SubmitButtons = ({
  previous,
  next,
  isVerified,
  toggleIsVerified,
}) => {

  function handleVerification() {
    next();
    toggleIsVerified();
  }
  return (
    <div className={style.fullButton}>
      <button
        onClick={previous}
        className={` ${style.buttonMain} ${style.previousButton}`}
      >
        <div className={style.buttonInner}>
          <span>Previous</span>
          <AiFillCaretRight />
        </div>
      </button>
      <button
        onClick={handleVerification}
        className={`${style.buttonMain} ${style.nextButton}`}
      >
        <div className={style.buttonInner}>
          <span>Submit</span>
        </div>
      </button>
    </div>
  );
};
export const InProgressButton = () => {
  return (
    <div className={style.fullButton}>
      <button className={` ${style.buttonMain} ${style.previousButton}`}>
        <div className={style.buttonInner}>
          <span>Previous</span>
          <AiFillCaretRight />
        </div>
      </button>
      <button
        className={` ${style.buttonMain} ${style.nextButton} ${style.utilityButtonMobile}`}
      >
        <div className={style.buttonInner}>
          <span>Continue</span>
        </div>
      </button>
      <button
        className={` ${style.buttonMain} ${style.nextButton} ${style.utilityButtonDesktop}`}
      >
        <div className={style.buttonInner}>
          <span>Continue </span>
          <AiFillCaretRight />
        </div>
      </button>
    </div>
  );
};
