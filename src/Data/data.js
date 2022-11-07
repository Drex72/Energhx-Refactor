import Lamp from "../img/lamp.png";
import Intern from "../img/intern.png";
import Installer from "../img/installer.png";

import DashBoardUser from "../Components/src/assets/dashboard_user.svg";
import DashBoardIntern from "../Components/src/assets/dashboard_intern.svg";
import DashBoardInstaller from "../Components/src/assets/dashboard_installer.svg";


// I need a way to handle file upload state in conjunction with FormData.


export const categories = [
  {
    id: 0,
    description: "Energy user",
    image__URL: Lamp,
    image_desc: "energy user icon",
    path: "/energy-user",
    storage_object_step1: JSON.stringify({
      firstname: "",
      lastname: "",
      othername: "",
      sex: "",
      email: "",
      phoneNumber: "",
      streetName: "",
      streetNumber: "",
      city: "",
      postalCode: "",
      province: "",
      country: "",
    }),
    storage_object_step2: JSON.stringify({
      firstname: "",
      lastname: "",
      othername: "",
      email: "",
      password: "",
      phoneNumber: "",
      alternateNumber: "",
      sex: "",
      streetName: "",
      streetNumber: "",
      service: "Business",
      accountNumber: "",
      envelope: "",
      program: "",
      city: "",
      postalCode: "",
      province: "",
      country: "",
      commodity: "",
      utility: "",
    }),
  },
  {
    id: 1,
    description: "Energy intern",
    image__URL: Intern,
    image_desc: "energy intern icon",
    path: "/energy-intern",
    storage_object: JSON.stringify({
      firstname: "",
      lastname: "",
      othername: "",
      email: "",
      password: "",
      phoneNumber: "",
      alternateNumber: "",
      sex: "",
      streetName: "",
      streetNumber: "",
      service: "",
      accountNumber: "",
      envelope: "",
      program: "",
      city: "",
      postalCode: "",
      province: "",
      country: "",
      commodity: "",
      utility: "",
    }),
  },
  {
    id: 2,
    description: "Energy installer",
    image__URL: Installer,
    image_desc: "energy installer icon",
    path: "/energy-installer",
    storage_object: JSON.stringify({
      firstname: "",
      lastname: "",
      othername: "",
      email: "",
      password: "",
      phoneNumber: "",
      alternateNumber: "",
      sex: "",
      streetName: "",
      streetNumber: "",
      service: "",
      accountNumber: "",
      envelope: "",
      program: "",
      city: "",
      postalCode: "",
      province: "",
      country: "",
      commodity: "",
      utility: "",
    }),
  },
];

const imageStyles =
  "bg-hero1 bg-cover bg-center bg-fixed bg-no-repeat brightness-[78%]";

export const navItems = [
  { id: "0", pageTitle: "Home", link: "/" },
  { id: "1", pageTitle: "About us", link: "/categories" },
  { id: "2", pageTitle: "Internships", link: "/categories" },
  { id: "3", pageTitle: "Incentives", link: "/categories" },
  { id: "4", pageTitle: "Partners", link: "/categories" },
  { id: "5", pageTitle: "Services", link: "/categories" },
  { id: "6", pageTitle: "EnerghxPlus", link: "/categories" },
  { id: "7", pageTitle: "Contact us", link: "/categories" },
  { id: "8", pageTitle: "Admin Login", link: "/admin-login" },
  { id: "8", pageTitle: "User Login", link: "/user-sign-in" },
];

export const dashboardCategories = [
  {
    id: 0,
    description: "Energy user",
    tableValue: "Normal User",
    image__URL: DashBoardUser,
    image_desc: "energy user icon",
    storage_object: JSON.stringify({
      firstname: "",
      lastname: "",
      othername: "",
      email: "",
      password: "",
      phoneNumber: "",
      alternateNumber: "",
      sex: "",
      streetName: "",
      streetNumber: "",
      service: "",
      accountNumber: "",
      envelope: "",
      program: "",
      city: "",
      postalCode: "",
      province: "",
      country: "",
      commodity: "",
      utility: "",
    }),
  },
  {
    id: 1,
    description: "Energy intern",
    tableValue: "Intern",
    image__URL: DashBoardIntern,
    image_desc: "energy intern icon",
    storage_object: JSON.stringify({
      firstname: "",
      lastname: "",
      othername: "",
      email: "",
      password: "",
      phoneNumber: "",
      alternateNumber: "",
      sex: "",
      streetName: "",
      streetNumber: "",
      service: "",
      accountNumber: "",
      envelope: "",
      program: "",
      city: "",
      postalCode: "",
      province: "",
      country: "",
      commodity: "",
      utility: "",
    }),
  },
  {
    id: 2,
    description: "Energy installer",
    tableValue: "Installer",
    image__URL: DashBoardInstaller,
    image_desc: "energy installer icon",
    storage_object: JSON.stringify({
      firstname: "",
      lastname: "",
      othername: "",
      email: "",
      password: "",
      phoneNumber: "",
      alternateNumber: "",
      sex: "",
      streetName: "",
      streetNumber: "",
      service: "",
      accountNumber: "",
      envelope: "",
      program: "",
      city: "",
      postalCode: "",
      province: "",
      country: "",
      commodity: "",
      utility: "",
    }),
  },
];

export const adminContext = {
  storage_object: JSON.stringify({
    firstname: "",
    lastname: "",
    othername: "",
    email: "",
    password: "",
    phoneNumber: "",
  }),
};

export const adminLoginContext = {
  storage_object: JSON.stringify({
    email: "",
    password: "",
  }),
};

export const userLoginContext = {
  storage_object: JSON.stringify({
    email: "",
    password: "",
  }),
};

