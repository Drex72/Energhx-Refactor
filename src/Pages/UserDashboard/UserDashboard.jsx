import { useState } from "react";
import DashboardBody from "../DashboardBody";

import DashboardHeader from "./UserDashboardHeader";
import UserHome from "./UserHome";

export default function UserDashboard(){
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  const [rendered, setRendered] = useState(<UserHome />);
  return (
    <div className="md:flex md:gap-[6em] relative min-h-screen bg-[#F1F1F1]">
      <DashboardHeader
        content={rendered}
        setContent={setRendered}
        onOpen={handleIsOpen}
        isOpen={isOpen}
      />
      <DashboardBody content={rendered} />
    </div>
  );
}
