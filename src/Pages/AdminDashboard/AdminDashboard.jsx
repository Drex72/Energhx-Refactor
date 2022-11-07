import { useState, useContext } from "react";
import DashboardBody from "../DashboardBody";
import { AdminContext, AdminContextProvider } from "./AdminSignUp";
import CircularProgress from "@mui/material/CircularProgress";
import DashboardHeader from "./DashboardHeader";
import Home from "./Home";


export default function AdminDashboard() {
  return (
    <AdminContextProvider>
      <AdminDashboardContent />
    </AdminContextProvider>
  );
}

function AdminDashboardContent() {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const [rendered, setRendered] = useState(<Home />);
  const { loading } = useContext(AdminContext);

  return (
    <div className="md:flex md:gap-[6em] relative min-h-screen bg-[#F1F1F1]">
      <DashboardHeader
        content={rendered}
        setContent={setRendered}
        onOpen={handleIsOpen}
        isOpen={isOpen}
      />
      {loading ? (
        <div className="flex items-center justify-center h-[100vh] w-[100vh]">
          <CircularProgress />
        </div>
      ) : <DashboardBody content={rendered} />}
    </div>
  );
}
