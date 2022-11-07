import React, { useEffect, useState } from "react";
import "./ProgressBar.css";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import Bulb from "../assets/Bulb.png"
import BulbAccomplished from "../assets/Bulb-Accomplished.png";

const MultiStepProgressBar = (props) => {
  const { steps, currentStep } = props;
  var stepPercentage = 0;

  if (props.currentStep === 1) {
    stepPercentage = 0;
  } else if (props.currentStep === 2) {
    stepPercentage = 35;
  } else if (props.currentStep === 3) {
    stepPercentage = 70;
  } else if (props.currentStep === 4) {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }
  const [image, setImage] = useState(Bulb);

  return (
    <div className="progressBarContainer">
      <ProgressBar
        filledBackground="green"
        width="100%"
        percent={stepPercentage}
      >
        <Step>
          {({ accomplished, index }) => (
            <div className="progressContainer" style={{display:'flex', alignItems:'center'}}>
              {accomplished ? (
                <img src={BulbAccomplished} alt="bulb"  />
              ) : (
                <img src={Bulb} alt="bulb" />
              )}
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <div className="progressContainer">
              {accomplished ? (
                <img src={BulbAccomplished} alt="bulb"  />
              ) : (
                <img src={Bulb} alt="bulb" />
              )}
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <div className="progressContainer">
              {accomplished ? (
                <img src={BulbAccomplished} alt="bulb"  />
              ) : (
                <img src={Bulb} alt="bulb" />
              )}
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <div className="progressContainer">
              {accomplished ? (
                <img src={BulbAccomplished} alt="bulb"  />
              ) : (
                <img src={Bulb} alt="bulb" />
              )}
            </div>
          )}
        </Step>
      </ProgressBar>
    </div>
  );
};

export default MultiStepProgressBar;
