import "./App.css";
import MultiStepProgressBar from "./ProgressBar";
import Form1 from "./Form1";
import { UtilityButtons } from "./FullButtons";
import Form2 from "./Form2";
import Form4 from "./Form4";

function App() {
  return (
      <div className="Form">
        <MultiStepProgressBar currentStep={2} />
        {/* <Form1 /> */}
        {/* <Form2 /> */}
        <Form4 />
        <UtilityButtons />
        
      </div>
  );
}

export default App;

