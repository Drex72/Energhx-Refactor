import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import "@tremor/react/dist/esm/tremor.css";


import CategoryContainer from "./Pages/CategoryContainer/CategoryContainer";
import UserSignUpForm from "./Components/Forms/UserSignUpForm";
import InternSignUpForm from "./Components/Forms/InternSignUpForm";
import InstallerSignUpForm from "./Components/Forms/InstallerSignUpForm";
import MultiStepper from "./Components/MultiSteppers/MultiStepper";
import InternMultiStepper from "./Components/MultiSteppers/InternMultiStepper";
import InstallerMultiStepper from "./Components/MultiSteppers/InstallerMultiStepper";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import UserDashboard from "./Pages/UserDashboard/UserDashboard";
import AdminLoginForm from "./Pages/AdminDashboard/AdminLogin";

import SignIn from "./Components/Forms/SignIn";
import AdminSignUpForm from "./Pages/AdminDashboard/AdminSignUp";
import AdminLogin from "./Pages/AdminDashboard/AdminLogin";
import PrivateRoute from "./Components/PrivateRouter/PrivateRoute";


const App = () => {
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes>
        <Route index element={<CategoryContainer />} />
        <Route path="/energy-user" element={<UserSignUpForm/>} />
        <Route path="/energy-intern" element={<InternSignUpForm/>} />
        <Route path="/user" element={<MultiStepper />} />
        <Route path="/intern" element={<InternMultiStepper />} />
        <Route path = "/installer" element={<InstallerMultiStepper/>}/>
        <Route path="/user-sign-in" element={<SignIn />} />
        <Route path="admin-login" element={<AdminLogin/>}/>
        <Route path="/admin-signup" element={<AdminSignUpForm/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
        </Route>
        <Route path="/energy-installer" element={<InstallerSignUpForm />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="admin-login" element={<AdminLoginForm/>} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
