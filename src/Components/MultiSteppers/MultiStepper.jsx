import { useEffect, useState } from "react";

import Form1 from ".././src/UserStuff/Form1";
import Form4 from ".././src/UserStuff/Form4";
import { UserThankYouButton } from "../src/GeneralStuff/FullButtons";

import MultiStepProgressBar from ".././src/GeneralStuff/ProgressBar";
import UtilityInfo from "../src/UserStuff/UtilityInfo/UtilityInfo";
import style from "./MultiStepper.module.css";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const completedImg =
  "https://s3-alpha-sig.figma.com/img/0253/ee48/5385f98e8e57394e6f5df06e53e9ed23?Expires=1667779200&Signature=dmyO7phfwVYKjWc9iZ2oty7GoldA1sS~-wSw8Z0uQmMjYY4HvCpws5HNQ-KdXZ2aTm5T7btEWKp-nabxz27O~Q1Z-iMQa7W1ZNkVHxHLcaCTxWorHkEhgvWJpIlzKqDLowYo8wEZDGytGIO0QRdsXnmr0ad3QsbCI0I6fsuijzyvJVWVEx~hBKUuubhwHjqy8sAcNqFSJC4fuw8UDMCsSjIKsUM~-nBxxdy0OOEyOEv1BVJGVRUuLbASc6gPgdS~yhHlM58x08vu4brwspDhRRJj-L7qadwY~GNUFCuWNTLcoi6aVBwQOszSkxIb4n38jdP9pSq3G4R9770r~ud6iw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA";

export default function MultiStepperHelper() {
  const [selectedStep, setSelectedStep] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const moveStepForward = () => {
    setSelectedStep((i) => {
      if (i >= 3) return i;
      return i + 1;
    });
  };
  const moveStepBackward = () => {
    setSelectedStep((i) => {
      if (i === 0) return i;
      return i - 1;
    });
  };
  useEffect(() => {
    selectedStep === 3 && setTimeout(() => navigate("/"), 3000);
  }, [selectedStep]);
  const RenderedStep = () => {
    switch (selectedStep) {
      case 0:
        return (
          <Form1
            moveForward={moveStepForward}
            moveBackward={moveStepBackward}
          />
        );
      case 1:
        return (
          <UtilityInfo
            moveForward={moveStepForward}
            moveBackward={moveStepBackward}
          />
        );
      case 2:
        return (
          <Form4
            moveForward={moveStepForward}
            moveBackward={moveStepBackward}
          />
        );
    }
  };

  return (
    <div className={`multi-step ${style.multi}`}>
      {selectedStep === 3 ? (
        <div className="flex flex-col gap-[3em] items-center justify-center">
          <img src={completedImg} alt="completed" />
          <UserThankYouButton />
        </div>
      ) : (
        <>
          <MultiStepProgressBar currentStep={selectedStep + 1} />
          <RenderedStep />
        </>
      )}
    </div>
  );
}
